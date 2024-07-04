CREATE TABLE IF NOT EXISTS "user" (
  "id" text NOT NULL PRIMARY KEY,
  "balance" text NOT NULL
);
CREATE TABLE IF NOT EXISTS "market" (
  "id" INTEGER PRIMARY KEY,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "owner_id" text NOT NULL,
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "min_settlement" text NOT NULL,
  "max_settlement" text NOT NULL,
  "settled_price" text,
  FOREIGN KEY ("owner_id") REFERENCES "user" ("id")
);
CREATE INDEX "idx_market_owner_id" ON "market" ("owner_id");
CREATE TABLE IF NOT EXISTS "order" (
  "id" INTEGER PRIMARY KEY,
  "market_id" INTEGER NOT NULL,
  "owner_id" text NOT NULL,
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "price" text NOT NULL,
  "size" text NOT NULL,
  "side" text NOT NULL,
  FOREIGN KEY ("market_id") REFERENCES "market" ("id"),
  FOREIGN KEY ("owner_id") REFERENCES "user" ("id")
);
CREATE INDEX "idx_order_market_id" ON "order" ("market_id");
CREATE INDEX "idx_order_owner_id" ON "order" ("owner_id");
CREATE INDEX "idx_order_market_id_side_price" ON "order" ("market_id", "side", "price");
CREATE TABLE IF NOT EXISTS "trade" (
  "id" INTEGER PRIMARY KEY,
  "market_id" INTEGER NOT NULL,
  "buyer_id" text NOT NULL,
  "seller_id" text NOT NULL,
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "price" text NOT NULL,
  "size" text NOT NULL,
  FOREIGN KEY ("market_id") REFERENCES "market" ("id"),
  FOREIGN KEY ("buyer_id") REFERENCES "user" ("id"),
  FOREIGN KEY ("seller_id") REFERENCES "user" ("id")
);
CREATE INDEX "idx_trade_market_id" ON "trade" ("market_id");
CREATE INDEX "idx_trade_buyer_id" ON "trade" ("buyer_id");
CREATE INDEX "idx_trade_seller_id" ON "trade" ("seller_id");