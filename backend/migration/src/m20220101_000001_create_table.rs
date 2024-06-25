use sea_orm::{EnumIter, Iterable};
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(User::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(User::Id).string().primary_key().not_null())
                    .col(
                        ColumnDef::new(User::BalanceMillionths)
                            .big_unsigned()
                            .not_null(),
                    )
                    .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(Market::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Market::Id)
                            .blob(BlobSize::Blob(Some(16)))
                            .primary_key()
                            .not_null(),
                    )
                    .col(ColumnDef::new(Market::Name).string().not_null())
                    .col(ColumnDef::new(Market::Description).string().not_null())
                    .col(ColumnDef::new(Market::OwnerId).string().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk_market_owner_id")
                            .from(Market::Table, Market::OwnerId)
                            .to(User::Table, User::Id)
                            .on_delete(ForeignKeyAction::NoAction),
                    )
                    .col(
                        ColumnDef::new(Market::CreatedAt)
                            .timestamp()
                            .default(Expr::current_timestamp())
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Market::MinSettlementThousandths)
                            .big_unsigned()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Market::MaxSettlementThousandths)
                            .big_unsigned()
                            .not_null(),
                    )
                    .col(ColumnDef::new(Market::SettledPriceThousandths).big_unsigned())
                    .to_owned(),
            )
            .await?;
        manager
            .create_table(
                Table::create()
                    .table(Order::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Order::Id)
                            .blob(BlobSize::Blob(Some(16)))
                            .primary_key()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Order::MarketId)
                            .blob(BlobSize::Blob(Some(16)))
                            .not_null(),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk_order_market_id")
                            .from(Order::Table, Order::MarketId)
                            .to(Market::Table, Market::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    )
                    .col(ColumnDef::new(Order::OwnerId).string().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk_order_owner_id")
                            .from(Order::Table, Order::OwnerId)
                            .to(User::Table, User::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    )
                    .col(
                        ColumnDef::new(Order::CreatedAt)
                            .timestamp()
                            .default(Expr::current_timestamp())
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Order::PriceThousandths)
                            .big_unsigned()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Order::SizeThousandths)
                            .big_unsigned()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Order::Side)
                            .enumeration(Alias::new("side"), Side::iter())
                            .not_null(),
                    )
                    .to_owned(),
            )
            .await?;
        manager
            .create_index(
                Index::create()
                    .name("idx_order_market_id_side_price")
                    .table(Order::Table)
                    .col(Order::MarketId)
                    .col(Order::Side)
                    .col(Order::PriceThousandths)
                    .to_owned(),
            )
            .await?;
        manager
            .create_table(
                Table::create()
                    .table(Trade::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Trade::Id)
                            .blob(BlobSize::Blob(Some(16)))
                            .primary_key()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Trade::MarketId)
                            .blob(BlobSize::Blob(Some(16)))
                            .not_null(),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk_trade_market_id")
                            .from(Trade::Table, Trade::MarketId)
                            .to(Market::Table, Market::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    )
                    .col(ColumnDef::new(Trade::BuyerId).string().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk_trade_buyer_id")
                            .from(Trade::Table, Trade::BuyerId)
                            .to(User::Table, User::Id)
                            .on_delete(ForeignKeyAction::NoAction),
                    )
                    .col(ColumnDef::new(Trade::SellerId).string().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk_trade_seller_id")
                            .from(Trade::Table, Trade::SellerId)
                            .to(User::Table, User::Id)
                            .on_delete(ForeignKeyAction::NoAction),
                    )
                    .col(
                        ColumnDef::new(Trade::CreatedAt)
                            .timestamp()
                            .default(Expr::current_timestamp())
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Trade::PriceThousandths)
                            .big_unsigned()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Trade::SizeThousandths)
                            .big_unsigned()
                            .not_null(),
                    )
                    .to_owned(),
            )
            .await?;
        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(User::Table).to_owned())
            .await?;
        manager
            .drop_table(Table::drop().table(Market::Table).to_owned())
            .await?;
        manager
            .drop_table(Table::drop().table(Order::Table).to_owned())
            .await?;
        manager
            .drop_table(Table::drop().table(Trade::Table).to_owned())
            .await?;
        Ok(())
    }
}

#[derive(DeriveIden)]
enum User {
    Table,
    Id,
    BalanceMillionths,
}

#[derive(DeriveIden)]
enum Market {
    Table,
    Id,
    Name,
    Description,
    OwnerId,
    CreatedAt,
    MinSettlementThousandths,
    MaxSettlementThousandths,
    SettledPriceThousandths,
}

#[derive(DeriveIden)]
enum Order {
    Table,
    Id,
    MarketId,
    OwnerId,
    CreatedAt,
    PriceThousandths,
    SizeThousandths,
    Side,
}

#[derive(DeriveIden, EnumIter)]
enum Side {
    Bid,
    Offer,
}

#[derive(DeriveIden)]
enum Trade {
    Table,
    Id,
    MarketId,
    BuyerId,
    SellerId,
    CreatedAt,
    PriceThousandths,
    SizeThousandths,
}
