use std::{env, fmt::Display, str::FromStr};

use futures::TryStreamExt;
use futures_core::stream::BoxStream;
use rust_decimal::Decimal;
use rust_decimal_macros::dec;
use sqlx::{
    sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions, SqliteSynchronous},
    types::{time::OffsetDateTime, Text},
    Connection, FromRow, Sqlite, SqliteConnection, SqlitePool, Transaction,
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
                let approx_wal_pages = remaining_pages + released_connections * 8;
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

    pub async fn get_portfolio<'a>(&'a self, user_id: &'a str) -> SqlxResult<Portfolio> {
        get_portfolio(&mut self.pool.begin().await?, user_id).await
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
    ) -> SqlxResult<MakePaymentStatus> {
        if amount.is_sign_negative() {
            return Ok(MakePaymentStatus::InvalidAmount);
        }

        let mut transaction = self.begin_immediate().await?;

        let payer_portfolio = get_portfolio(&mut transaction, payer_id).await?;

        if payer_portfolio.available_balance < amount {
            return Ok(MakePaymentStatus::InsufficientFunds);
        }

        let Text(recipient_balance) = sqlx::query_scalar!(
            r#"SELECT balance as "balance: Text<Decimal>" FROM user WHERE id = ?"#,
            recipient_id
        )
        .fetch_one(transaction.as_mut())
        .await?;

        let payer_new_balance = Text(payer_portfolio.total_balance - amount);
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
        Ok(MakePaymentStatus::Success(payment))
    }

    pub async fn create_market(
        &self,
        name: &str,
        description: &str,
        owner_id: &str,
        min_settlement: Decimal,
        max_settlement: Decimal,
    ) -> SqlxResult<CreateMarketStatus> {
        if min_settlement >= max_settlement || min_settlement.is_sign_negative() {
            return Ok(CreateMarketStatus::InvalidSettlements);
        }
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
        Ok(CreateMarketStatus::Success(market))
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

        let user_positions = sqlx::query!(
            r#"DELETE FROM exposure_cache WHERE market_id = ? RETURNING user_id, position as "position: Text<Decimal>""#,
            id
        )
        .fetch_all(transaction.as_mut()).await?;

        for user_position in user_positions {
            let Text(current_balance) = sqlx::query_scalar!(
                r#"SELECT balance as "balance: Text<Decimal>" FROM user WHERE id = ?"#,
                user_position.user_id
            )
            .fetch_one(transaction.as_mut())
            .await?;

            let new_balance = Text(current_balance + user_position.position.0 * settled_price.0);
            sqlx::query!(
                r#"UPDATE user SET balance = ? WHERE id = ?"#,
                new_balance,
                user_position.user_id
            )
            .execute(transaction.as_mut())
            .await?;
        }

        transaction.commit().await?;
        Ok(SettleMarketStatus::Success(market))
    }

    pub async fn create_order(
        &self,
        market_id: i64,
        owner_id: &str,
        price: Decimal,
        size: Decimal,
        side: Side,
    ) -> SqlxResult<CreateOrderStatus> {
        let mut transaction = self.begin_immediate().await?;
        let market = sqlx::query!(
            r#"SELECT min_settlement as "min_settlement: Text<Decimal>", max_settlement as "max_settlement: Text<Decimal>", settled_price IS NOT NULL as "settled: bool" FROM market WHERE id = ?"#,
            market_id
        )
        .fetch_one(transaction.as_mut())
        .await?;
        if market.settled {
            return Ok(CreateOrderStatus::MarketSettled);
        }
        if price < market.min_settlement.0 || price > market.max_settlement.0 {
            return Ok(CreateOrderStatus::InvalidPrice);
        }

        let side = Text(side);

        // Overfetch to avoid floating point issues
        let condition_price = match side.0 {
            Side::Bid => Text(price + dec!(0.000001)),
            Side::Offer => Text(price - dec!(0.000001)),
        };

        // check for potential fills
        let mut potential_fills = match side.0 {
            Side::Bid => {
                sqlx::query_as!(
                    Order,
                    r#"SELECT id as "id!", market_id, owner_id, created_at, size as "size: _", price as "price: _", side as "side: Text<Side>" FROM "order" WHERE market_id = ? AND side != ? AND CAST(price AS REAL) <= ? ORDER BY CAST(price AS REAL), created_at"#,
                    market_id,
                    side,
                    condition_price
                ).fetch(transaction.as_mut())
            }
            Side::Offer => {
                sqlx::query_as!(
                    Order,
                    r#"SELECT id as "id!", market_id, owner_id, created_at, size as "size: _", price as "price: _", side as "side: Text<Side>" FROM "order" WHERE market_id = ? AND side != ? AND CAST(price AS REAL) >= ? ORDER BY CAST(price AS REAL) DESC, created_at"#,
                    market_id,
                    side,
                    condition_price
                ).fetch(transaction.as_mut())
            }
        };

        let mut size_remaining = size;
        let mut order_fills = Vec::new();

        while let Some(other) = potential_fills.try_next().await? {
            if matches!(side.0, Side::Bid) && other.price.0 > price
                || matches!(side.0, Side::Offer) && other.price.0 < price
            {
                continue;
            }
            let size_filled = size_remaining.min(other.size.0);
            size_remaining -= size_filled;
            order_fills.push(OrderFill {
                id: other.id,
                market_id: other.market_id,
                owner_id: other.owner_id,
                size_filled,
                size_remaining: other.size.0 - size_filled,
                price: other.price.0,
                side: other.side.0,
            });
            if size_remaining.is_zero() {
                break;
            }
        }
        drop(potential_fills);

        let order = if size_remaining > Decimal::ZERO {
            let size_remaining = Text(size_remaining);
            let price = Text(price);
            Some(
                sqlx::query_as!(
                    Order,
                    r#"INSERT INTO "order" (market_id, owner_id, size, price, side) VALUES (?, ?, ?, ?, ?) RETURNING id, market_id, owner_id, created_at, size as "size: _", price as "price: _", side as "side: _""#,
                    market_id,
                    owner_id,
                    size_remaining,
                    price,
                    side
                )
                .fetch_one(transaction.as_mut())
                .await?
            )
        } else {
            None
        };
        update_exposure_cache(
            &mut transaction,
            true,
            &OrderFill {
                id: 0,
                owner_id: owner_id.to_string(),
                market_id,
                size_remaining,
                size_filled: size - size_remaining,
                price,
                side: side.0,
            },
        )
        .await?;
        let mut trades = Vec::new();
        for fill in &order_fills {
            let size = Text(fill.size_filled);
            let price = Text(fill.price);
            let (buyer_id, seller_id) = match side.0 {
                Side::Bid => (owner_id, fill.owner_id.as_str()),
                Side::Offer => (fill.owner_id.as_str(), owner_id),
            };
            let trade = sqlx::query_as!(
                Trade,
                r#"INSERT INTO trade (market_id, buyer_id, seller_id, size, price) VALUES (?, ?, ?, ?, ?) RETURNING id, market_id, buyer_id, seller_id, size as "size: _", price as "price: _", created_at"#,
                market_id,
                buyer_id,
                seller_id,
                size,
                price
            )
            .fetch_one(transaction.as_mut())
            .await?;
            trades.push(trade);
            if fill.size_remaining.is_zero() {
                sqlx::query!(r#"DELETE FROM "order" WHERE id = ?"#, fill.id)
                    .execute(transaction.as_mut())
                    .await?;
            } else {
                let size = Text(fill.size_remaining);
                sqlx::query!(r#"UPDATE "order" SET size = ? WHERE id = ?"#, size, fill.id)
                    .execute(transaction.as_mut())
                    .await?;
            }
            update_exposure_cache(&mut transaction, false, &fill).await?;
        }

        let portfolio = get_portfolio(&mut transaction, owner_id).await?;
        if portfolio.available_balance.is_sign_negative() {
            return Ok(CreateOrderStatus::InsufficientFunds);
        }

        transaction.commit().await?;

        Ok(CreateOrderStatus::Success {
            order,
            fills: order_fills,
            trades,
        })
    }

    pub async fn cancel_order(&self, id: i64, owner_id: &str) -> SqlxResult<CancelOrderStatus> {
        let mut transaction = self.pool.begin().await?;

        let order =
            sqlx::query_as!(Order, r#"DELETE FROM "order" WHERE id = ? RETURNING id, market_id, owner_id, created_at, size as "size: _", price as "price: _", side as "side: _""#, id)
                .fetch_one(transaction.as_mut())
                .await?;

        if order.owner_id != owner_id {
            return Ok(CancelOrderStatus::NotOwner);
        }

        let current_exposure = sqlx::query!(
            r#"SELECT total_bid_size as "total_bid_size: Text<Decimal>", total_offer_size as "total_offer_size: Text<Decimal>", total_bid_value as "total_bid_value: Text<Decimal>", total_offer_value as "total_offer_value: Text<Decimal>" FROM exposure_cache WHERE user_id = ? AND market_id = ?"#,
            owner_id,
            order.market_id,
        )
        .fetch_one(transaction.as_mut())
        .await?;

        match order.side.0 {
            Side::Bid => {
                let total_bid_size = Text(current_exposure.total_bid_size.0 - order.size.0);
                let total_bid_value =
                    Text(current_exposure.total_bid_value.0 - order.size.0 * order.price.0);
                sqlx::query!(
                    r#"UPDATE exposure_cache SET total_bid_size = ?, total_bid_value = ? WHERE user_id = ? AND market_id = ?"#,
                    total_bid_size,
                    total_bid_value,
                    owner_id,
                    order.market_id,
                )
                .execute(transaction.as_mut())
                .await?;
            }
            Side::Offer => {
                let total_offer_size = Text(current_exposure.total_offer_size.0 - order.size.0);
                let total_offer_value =
                    Text(current_exposure.total_offer_value.0 - order.size.0 * order.price.0);
                sqlx::query!(
                    r#"UPDATE exposure_cache SET total_offer_size = ?, total_offer_value = ? WHERE user_id = ? AND market_id = ?"#,
                    total_offer_size,
                    total_offer_value,
                    owner_id,
                    order.market_id,
                )
                .execute(transaction.as_mut())
                .await?;
            }
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

async fn get_portfolio(
    transaction: &mut Transaction<'_, Sqlite>,
    user_id: &str,
) -> SqlxResult<Portfolio> {
    let total_balance = sqlx::query_scalar!(
        r#"SELECT balance as "balance: Text<Decimal>" FROM user WHERE id = ?"#,
        user_id
    )
    .fetch_one(transaction.as_mut())
    .await?;

    let market_exposures = sqlx::query_as!(
        MarketExposure,
        r#"SELECT market_id, position as "position: _", total_bid_size as "total_bid_size: _", total_offer_size as "total_offer_size: _", total_bid_value as "total_bid_value: _", total_offer_value as "total_offer_value: _", min_settlement as "min_settlement: _", max_settlement as "max_settlement: _" FROM exposure_cache JOIN market on (market_id = market.id) WHERE user_id = ?"#,
        user_id
    )
    .fetch_all(transaction.as_mut())
    .await?;

    let available_balance = total_balance.0
        + market_exposures
            .iter()
            .map(MarketExposure::worst_case_outcome)
            .sum::<Decimal>();

    Ok(Portfolio {
        total_balance: total_balance.0,
        available_balance,
        market_exposures,
    })
}

async fn update_exposure_cache<'a>(
    transaction: &mut Transaction<'a, Sqlite>,
    is_new: bool,
    OrderFill {
        id: _,
        owner_id,
        market_id,
        size_filled,
        size_remaining,
        price,
        side,
    }: &OrderFill,
) -> SqlxResult<()> {
    let current_market_exposure = sqlx::query!(
        r#"INSERT INTO exposure_cache (user_id, market_id, position, total_bid_size, total_offer_size, total_bid_value, total_offer_value) VALUES (?, ?, '0', '0', '0', '0', '0') ON CONFLICT DO NOTHING RETURNING position as "position: Text<Decimal>", total_bid_size as "total_bid_size: Text<Decimal>", total_offer_size as "total_offer_size: Text<Decimal>", total_bid_value as "total_bid_value: Text<Decimal>", total_offer_value as "total_offer_value: Text<Decimal>""#,
        owner_id,
        market_id,
    )
    .fetch_one(transaction.as_mut())
    .await?;
    let size_change = if is_new {
        *size_remaining
    } else {
        -size_filled
    };
    Ok(match side {
        Side::Bid => {
            let total_bid_size = Text(current_market_exposure.total_bid_size.0 + size_change);
            let total_bid_value =
                Text(current_market_exposure.total_bid_value.0 + size_change * price);
            let position = Text(current_market_exposure.position.0 + size_filled);
            sqlx::query!(
                r#"UPDATE exposure_cache SET total_bid_size = ?, total_bid_value = ?, position = ? WHERE user_id = ? AND market_id = ?"#,
                total_bid_size,
                total_bid_value,
                position,
                owner_id,
                market_id,
            )
            .execute(transaction.as_mut())
            .await?;
        }
        Side::Offer => {
            let total_offer_size = Text(current_market_exposure.total_offer_size.0 + size_change);
            let total_offer_value =
                Text(current_market_exposure.total_offer_value.0 + size_change * price);
            let position = Text(current_market_exposure.position.0 - size_filled);
            sqlx::query!(
                r#"UPDATE exposure_cache SET total_offer_size = ?, total_offer_value = ?, position = ? WHERE user_id = ? AND market_id = ?"#,
                total_offer_size,
                total_offer_value,
                position,
                owner_id,
                market_id,
            )
            .execute(transaction.as_mut())
            .await?;
        }
    })
}

impl MarketExposure {
    pub fn worst_case_outcome(&self) -> Decimal {
        let resolves_min_case = self.min_settlement.0 * (self.position.0 + self.total_bid_size.0)
            - self.total_bid_value.0;
        let resolves_max_case = self.max_settlement.0 * (self.position.0 - self.total_offer_size.0)
            + self.total_offer_value.0;
        resolves_min_case.min(resolves_max_case)
    }
}

pub enum CreateOrderStatus {
    MarketSettled,
    InvalidPrice,
    InsufficientFunds,
    Success {
        order: Option<Order>,
        fills: Vec<OrderFill>,
        trades: Vec<Trade>,
    },
}

pub struct OrderFill {
    id: i64,
    market_id: i64,
    owner_id: String,
    size_filled: Decimal,
    size_remaining: Decimal,
    price: Decimal,
    side: Side,
}

pub enum CreateMarketStatus {
    Success(Market),
    InvalidSettlements,
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

pub enum MakePaymentStatus {
    Success(Payment),
    InsufficientFunds,
    InvalidAmount,
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
    pub position: Text<Decimal>,
    pub total_bid_size: Text<Decimal>,
    pub total_offer_size: Text<Decimal>,
    pub total_bid_value: Text<Decimal>,
    pub total_offer_value: Text<Decimal>,
    pub min_settlement: Text<Decimal>,
    pub max_settlement: Text<Decimal>,
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

#[derive(Debug, Clone, Copy)]
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
