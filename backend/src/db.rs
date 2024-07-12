use std::{env, fmt::Display, str::FromStr};

use futures::TryStreamExt;
use futures_core::stream::BoxStream;
use fxhash::FxHashMap;
use itertools::{EitherOrBoth, Itertools};
use rust_decimal::Decimal;
use sqlx::{
    sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions, SqliteSynchronous},
    types::{time::OffsetDateTime, Text},
    Connection, FromRow, Sqlite, SqliteConnection, SqlitePool,
};
use tokio::sync::broadcast::error::RecvError;

// should hopefully keep the WAL size nice and small and avoid blocking writers
const CHECKPOINT_PAGE_LIMIT: i64 = 512;

#[derive(Clone)]
pub struct DB {
    pool: SqlitePool,
}

type SqlxResult<T> = Result<T, sqlx::Error>;

impl DB {
    pub async fn init() -> anyhow::Result<Self> {
        let connection_options = SqliteConnectOptions::from_str(&env::var("DATABASE_URL")?)?
            .create_if_missing(true)
            .journal_mode(SqliteJournalMode::Wal)
            .synchronous(SqliteSynchronous::Normal)
            // This should work with the default idle timeout and max lifetime
            .optimize_on_close(true, None)
            .pragma("optimize", "0x10002")
            // already checkpointing in the background
            .pragma("wal_autocheckpoint", "0");

        let mut management_conn = SqliteConnection::connect_with(&connection_options).await?;

        sqlx::migrate!().run(&mut management_conn).await?;

        sqlx::query!(
            "INSERT INTO acquire_write_lock (id, lock) VALUES (1, TRUE) ON CONFLICT DO NOTHING"
        )
        .execute(&mut management_conn)
        .await?;

        let (release_tx, mut release_rx) = tokio::sync::broadcast::channel(1);

        let pool = SqlitePoolOptions::new()
            .min_connections(8)
            .max_connections(64)
            .after_release(move |_, _| {
                let release_tx = release_tx.clone();
                Box::pin(async move {
                    if let Err(e) = release_tx.send(()) {
                        tracing::error!("release_tx.send failed: {:?}", e);
                    };
                    Ok(true)
                })
            })
            .connect_with(connection_options)
            .await?;

        // checkpointing task
        tokio::spawn(async move {
            let mut released_connections = 0;
            let mut remaining_pages = 0;
            loop {
                match release_rx.recv().await {
                    Ok(()) => {
                        released_connections += 1;
                    }
                    Err(RecvError::Lagged(n)) => {
                        released_connections += n as i64;
                    }
                    Err(RecvError::Closed) => {
                        break;
                    }
                };
                let approx_wal_pages = remaining_pages + released_connections * 4;
                if approx_wal_pages < CHECKPOINT_PAGE_LIMIT {
                    continue;
                }
                match sqlx::query_as::<_, WalCheckPointRow>("PRAGMA wal_checkpoint(PASSIVE)")
                    .fetch_one(&mut management_conn)
                    .await
                {
                    Err(e) => {
                        tracing::error!("wal_checkpoint failed: {:?}", e);
                    }
                    Ok(row) => {
                        released_connections = 0;
                        remaining_pages = row.log - row.checkpointed;
                        tracing::info!(
                            "wal_checkpoint: busy={} log={} checkpointed={}",
                            row.busy,
                            row.log,
                            row.checkpointed
                        );
                    }
                }
            }
        });

        Ok(Self { pool })
    }

    pub async fn ensure_user_created(&self, id: &str, initial_balance: Decimal) -> SqlxResult<()> {
        let balance = Text(initial_balance);
        sqlx::query!(
            "INSERT INTO user (id, balance) VALUES (?, ?) ON CONFLICT DO NOTHING",
            id,
            balance
        )
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn get_portfolio(&self, user_id: &str) -> SqlxResult<Portfolio> {
        let mut transaction = self.pool.begin().await?;
        let total_balance = sqlx::query_scalar!(
            r#"SELECT balance as "balance: Text<Decimal>" FROM user WHERE id = ?"#,
            user_id
        )
        .fetch_one(transaction.as_mut())
        .await?;

        let orders = sqlx::query!(
            r#"SELECT market_id, count(*) as count FROM "order" WHERE owner_id = ? GROUP BY market_id ORDER BY market_id"#,
            user_id
        )
        .fetch_all(transaction.as_mut())
        .await?;

        let trades = sqlx::query!(
            r#"SELECT market_id, buyer_id, seller_id, size as "size: Text<Decimal>" FROM trade JOIN market ON (market.id = market_id) WHERE (buyer_id = ? or seller_id = ?) AND market.settled_price IS NULL ORDER BY market_id"#,
            user_id, user_id
        )
        .fetch_all(transaction.as_mut())
        .await?;

        let trades_chunked = &trades.into_iter().chunk_by(|trade| trade.market_id);
        let trades_agged = trades_chunked.into_iter().map(|(market_id, trades)| {
            (
                market_id,
                trades
                    .map(|trade| {
                        if trade.buyer_id == user_id {
                            trade.size.0
                        } else {
                            debug_assert_eq!(trade.seller_id, user_id);
                            -trade.size.0
                        }
                    })
                    .sum::<Decimal>(),
            )
        });

        let market_exposures = orders
            .into_iter()
            .merge_join_by(trades_agged, |order, (market_id, _)| {
                order.market_id.cmp(market_id)
            })
            .map(|either_or_both| match either_or_both {
                EitherOrBoth::Both(order, (market_id, position)) => MarketExposure {
                    market_id,
                    position,
                    orders: order.count as u32,
                },
                EitherOrBoth::Left(order) => MarketExposure {
                    market_id: order.market_id,
                    position: Decimal::ZERO,
                    orders: order.count as u32,
                },
                EitherOrBoth::Right((market_id, position)) => MarketExposure {
                    market_id,
                    position,
                    orders: 0,
                },
            })
            .collect();

        Ok(Portfolio {
            total_balance: total_balance.0,
            // TODO: actually calculate this
            available_balance: total_balance.0,
            market_exposures,
        })
    }

    pub fn get_markets(&self) -> BoxStream<SqlxResult<Market>> {
        sqlx::query_as!(Market, r#"SELECT id, name, description, owner_id, created_at, min_settlement as "min_settlement: _", max_settlement as "max_settlement: _", settled_price as "settled_price: _" FROM market"#)
            .fetch(&self.pool)
    }

    pub fn get_market_orders(&self, market_id: i64) -> BoxStream<SqlxResult<Order>> {
        // Can't use the macro due to https://github.com/launchbadge/sqlx/issues/1151
        // sqlx::query_as!(Order, r#"SELECT id as "id!", market_id, owner_id, created_at, size as "size: _", price as "price: _", side as "side: _" FROM "order" WHERE market_id = ?"#, market_id)
        //     .fetch(&self.pool);
        sqlx::query_as::<_, Order>(r#"SELECT id, market_id, owner_id, created_at, size, price, side FROM "order" WHERE market_id = ?"#)
        .bind(market_id)
        .fetch(&self.pool)
    }

    pub fn get_market_trades(&self, market_id: i64) -> BoxStream<SqlxResult<Trade>> {
        // Can't use the macro due to https://github.com/launchbadge/sqlx/issues/1151
        // sqlx::query_as!(Trade, r#"SELECT id as "id!", market_id, buyer_id, seller_id, size as "size: _", price as "price: _", created_at FROM trade WHERE market_id = ?"#, market_id)
        //     .fetch(&self.pool)
        sqlx::query_as::<_, Trade>(r#"SELECT id, market_id, buyer_id, seller_id, size, price, created_at FROM trade WHERE market_id = ?"#)
        .bind(market_id)
        .fetch(&self.pool)
    }

    pub async fn make_payment(
        &self,
        payer_id: &str,
        recipient_id: &str,
        amount: Decimal,
        note: &str,
    ) -> SqlxResult<PaymentStatus> {
        let mut transaction = self.begin_immediate().await?;

        let Text(payer_balance) = sqlx::query_scalar!(
            r#"SELECT balance as "balance: Text<Decimal>" FROM user WHERE id = ?"#,
            payer_id
        )
        .fetch_one(transaction.as_mut())
        .await?;

        // TODO: replace this with available balance check
        if payer_balance < amount {
            sqlx::query!("ROLLBACK")
                .execute(transaction.as_mut())
                .await?;
            return Ok(PaymentStatus::InsufficientFunds);
        }

        let Text(recipient_balance) = sqlx::query_scalar!(
            r#"SELECT balance as "balance: Text<Decimal>" FROM user WHERE id = ?"#,
            recipient_id
        )
        .fetch_one(transaction.as_mut())
        .await?;

        let payer_new_balance = Text(payer_balance - amount);
        let recipient_new_balance = Text(recipient_balance + amount);

        sqlx::query!(
            r#"UPDATE user SET balance = ? WHERE id = ?"#,
            payer_new_balance,
            payer_id
        )
        .execute(transaction.as_mut())
        .await?;

        sqlx::query!(
            r#"UPDATE user SET balance = ? WHERE id = ?"#,
            recipient_new_balance,
            recipient_id
        )
        .execute(transaction.as_mut())
        .await?;

        let amount = Text(amount);

        let payment = sqlx::query_as!(
            Payment,
            r#"INSERT INTO payment (payer_id, recipient_id, amount, note) VALUES (?, ?, ?, ?) RETURNING id, payer_id, recipient_id, amount as "amount: _", note, created_at"#,
            payer_id,
            recipient_id,
            amount,
            note
        )
        .fetch_one(transaction.as_mut())
        .await?;

        transaction.commit().await?;
        Ok(PaymentStatus::Success(payment))
    }

    pub async fn create_market(
        &self,
        name: &str,
        description: &str,
        owner_id: &str,
        min_settlement: Decimal,
        max_settlement: Decimal,
    ) -> SqlxResult<Market> {
        let min_settlement = Text(min_settlement);
        let max_settlement = Text(max_settlement);
        let market = sqlx::query_as!(
            Market,
            r#"INSERT INTO market (name, description, owner_id, min_settlement, max_settlement) VALUES (?, ?, ?, ?, ?) RETURNING id, name, description, owner_id, created_at, min_settlement as "min_settlement: _", max_settlement as "max_settlement: _", settled_price as "settled_price: _""#,
            name,
            description,
            owner_id,
            min_settlement,
            max_settlement
        )
        .fetch_one(&self.pool)
        .await?;
        Ok(market)
    }

    pub async fn settle_market(
        &self,
        id: i64,
        settled_price: Decimal,
        owner_id: &str,
    ) -> SqlxResult<SettleMarketStatus> {
        let mut transaction = self.begin_immediate().await?;

        let mut market = sqlx::query_as!(
            Market,
            r#"SELECT id, name, description, owner_id, created_at, min_settlement as "min_settlement: _", max_settlement as "max_settlement: _", settled_price as "settled_price: _" FROM market WHERE id = ? AND owner_id = ?"#,
            id,
            owner_id
        )
        .fetch_one(transaction.as_mut())
        .await?;

        if market.settled_price.is_some() {
            return Ok(SettleMarketStatus::AlreadySettled);
        }

        if market.owner_id != owner_id {
            return Ok(SettleMarketStatus::NotOwner);
        }

        if market.min_settlement.0 > settled_price || market.max_settlement.0 < settled_price {
            return Ok(SettleMarketStatus::InvalidSettlementPrice);
        }

        let settled_price = Text(settled_price);
        sqlx::query!(
            r#"UPDATE market SET settled_price = ? WHERE id = ?"#,
            settled_price,
            id,
        )
        .execute(transaction.as_mut())
        .await?;

        market.settled_price = Some(settled_price);

        sqlx::query!(r#"DELETE FROM "order" WHERE market_id = ?"#, id)
            .execute(transaction.as_mut())
            .await?;

        let mut trades = sqlx::query!(
            r#"SELECT buyer_id, seller_id, size as "size: Text<Decimal>" FROM trade WHERE market_id = ?"#,
            id
        )
        .fetch(transaction.as_mut());

        let mut positions = FxHashMap::<String, Decimal>::default();
        while let Some(trade) = trades.try_next().await? {
            *positions.entry(trade.buyer_id).or_default() += trade.size.0;
            *positions.entry(trade.seller_id).or_default() -= trade.size.0;
        }

        drop(trades);

        for (user_id, position) in positions {
            let Text(current_balance) = sqlx::query_scalar!(
                r#"SELECT balance as "balance: Text<Decimal>" FROM user WHERE id = ?"#,
                user_id
            )
            .fetch_one(transaction.as_mut())
            .await?;

            let new_balance = Text(current_balance + position * settled_price.0);
            sqlx::query!(
                r#"UPDATE user SET balance = ? WHERE id = ?"#,
                new_balance,
                user_id
            )
            .execute(transaction.as_mut())
            .await?;
        }

        transaction.commit().await?;
        Ok(SettleMarketStatus::Success(market))
    }

    pub async fn create_order(
        &self,
        _market_id: i64,
        _owner_id: &str,
        _price: Decimal,
        _size: Decimal,
        _side: Side,
    ) -> SqlxResult<()> {
        todo!()
    }

    pub async fn cancel_order(&self, id: i64, owner_id: &str) -> SqlxResult<CancelOrderStatus> {
        let mut transaction = self.pool.begin().await?;

        let real_owner_id =
            sqlx::query_scalar!(r#"DELETE FROM "order" WHERE id = ? RETURNING owner_id"#, id)
                .fetch_one(transaction.as_mut())
                .await?;

        if real_owner_id != owner_id {
            return Ok(CancelOrderStatus::NotOwner);
        }

        transaction.commit().await?;

        Ok(CancelOrderStatus::Success)
    }

    async fn begin_immediate(&self) -> SqlxResult<sqlx::Transaction<Sqlite>> {
        let mut transaction = self.pool.begin().await?;

        // ensure the transaction is started as a write transaction
        sqlx::query!("UPDATE acquire_write_lock SET lock = TRUE WHERE id = 1")
            .execute(transaction.as_mut())
            .await?;

        Ok(transaction)
    }
}

pub enum CancelOrderStatus {
    Success,
    NotOwner,
}

pub enum SettleMarketStatus {
    Success(Market),
    AlreadySettled,
    NotOwner,
    InvalidSettlementPrice,
}

pub enum PaymentStatus {
    Success(Payment),
    InsufficientFunds,
}

pub struct Payment {
    pub id: i64,
    pub payer_id: String,
    pub recipient_id: String,
    pub amount: Text<Decimal>,
    pub note: String,
    pub created_at: OffsetDateTime,
}

pub struct Portfolio {
    pub total_balance: Decimal,
    pub available_balance: Decimal,
    pub market_exposures: Vec<MarketExposure>,
}

pub struct MarketExposure {
    pub market_id: i64,
    pub position: Decimal,
    pub orders: u32,
}

#[derive(FromRow)]
pub struct Trade {
    pub id: i64,
    pub market_id: i64,
    pub buyer_id: String,
    pub seller_id: String,
    pub price: Text<Decimal>,
    pub size: Text<Decimal>,
    pub created_at: OffsetDateTime,
}

#[derive(FromRow)]
pub struct Order {
    pub id: i64,
    pub market_id: i64,
    pub owner_id: String,
    pub created_at: OffsetDateTime,
    pub size: Text<Decimal>,
    pub price: Text<Decimal>,
    pub side: Text<Side>,
}

pub enum Side {
    Bid,
    Offer,
}

impl FromStr for Side {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> anyhow::Result<Self> {
        match s {
            "bid" => Ok(Side::Bid),
            "offer" => Ok(Side::Offer),
            _ => Err(anyhow::anyhow!("invalid side {s}")),
        }
    }
}

impl Display for Side {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Side::Bid => write!(f, "bid"),
            Side::Offer => write!(f, "offer"),
        }
    }
}

pub struct Market {
    pub id: i64,
    pub name: String,
    pub description: String,
    pub owner_id: String,
    pub created_at: OffsetDateTime,
    pub min_settlement: Text<Decimal>,
    pub max_settlement: Text<Decimal>,
    pub settled_price: Option<Text<Decimal>>,
}

#[derive(FromRow)]
struct WalCheckPointRow {
    busy: i64,
    log: i64,
    checkpointed: i64,
}
