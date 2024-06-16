import { z } from "zod";

export default z
  .union([
    z
      .object({
        kind: z.literal("portfolio-state"),
        data: z.object({
          totalBalance: z.string(),
          availableBalance: z.string(),
          markets: z
            .record(
              z.object({
                exposure: z.string().optional(),
                orders: z.number().gte(0).optional(),
              }),
            )
            .describe("A map of market IDs to exposure details"),
        }),
      })
      .describe("Portfolio state"),
    z.object({
      kind: z.literal("markets-state"),
      data: z
        .record(
          z
            .object({
              id: z.string(),
              name: z.string(),
              description: z.string(),
              ownerId: z.string(),
              status: z.union([
                z.object({ open: z.literal(true) }),
                z.object({ open: z.literal(false), settlePrice: z.string() }),
              ]),
              minSettlement: z.number().multipleOf(0.001),
              maxSettlement: z.number().multipleOf(0.001),
            })
            .describe("Market definition"),
        )
        .describe("A map of market IDs to markets"),
    }),
    z
      .object({
        kind: z.literal("market-state"),
        data: z
          .object({
            tradeHistory: z
              .array(
                z
                  .object({
                    marketId: z.string(),
                    timestamp: z.string().datetime({ offset: true }),
                    price: z.number().multipleOf(0.001),
                    size: z.number().multipleOf(0.001),
                    buyer: z.string(),
                    seller: z.string(),
                  })
                  .describe("Trade"),
              )
              .describe("A list of trades that have occurred in this market"),
            openOrders: z
              .record(
                z
                  .object({
                    id: z.string(),
                    marketId: z.string(),
                    ownerId: z.string(),
                    createdAt: z.string().datetime({ offset: true }),
                    price: z.number().multipleOf(0.001),
                    size: z.number().multipleOf(0.001),
                    side: z.enum(["bid", "offer"]),
                  })
                  .describe("Order"),
              )
              .describe("A map of order IDs to orders"),
          })
          .and(
            z
              .object({
                id: z.string(),
                name: z.string(),
                description: z.string(),
                ownerId: z.string(),
                status: z.union([
                  z.object({ open: z.literal(true) }),
                  z.object({ open: z.literal(false), settlePrice: z.string() }),
                ]),
                minSettlement: z.number().multipleOf(0.001),
                maxSettlement: z.number().multipleOf(0.001),
              })
              .describe("Market definition"),
          ),
      })
      .describe("The state of a market"),
    z
      .object({
        kind: z.literal("market-created"),
        data: z
          .object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            ownerId: z.string(),
            status: z.union([
              z.object({ open: z.literal(true) }),
              z.object({ open: z.literal(false), settlePrice: z.string() }),
            ]),
            minSettlement: z.number().multipleOf(0.001),
            maxSettlement: z.number().multipleOf(0.001),
          })
          .describe("Market definition"),
      })
      .describe("Market created event"),
    z
      .object({
        kind: z.literal("market-settled"),
        data: z.object({
          id: z.string(),
          status: z.object({ open: z.literal(false), settlePrice: z.string() }),
        }),
      })
      .describe("Market settled event"),
    z
      .object({
        kind: z.literal("order-created"),
        data: z
          .object({
            id: z.string(),
            marketId: z.string(),
            ownerId: z.string(),
            createdAt: z.string().datetime({ offset: true }),
            price: z.number().multipleOf(0.001),
            size: z.number().multipleOf(0.001),
            side: z.enum(["bid", "offer"]),
          })
          .describe("Order"),
      })
      .describe("Order created event"),
    z
      .object({
        kind: z.literal("order-cancelled"),
        data: z.object({ id: z.string(), marketId: z.string() }),
      })
      .describe("Order cancelled event"),
    z
      .object({
        kind: z.literal("order-filled"),
        data: z
          .object({ id: z.string(), marketId: z.string() })
          .and(
            z.union([
              z.object({ fullyFilled: z.literal(true) }),
              z.object({
                fullyFilled: z.literal(false),
                sizeFilled: z.number().multipleOf(0.001),
                sizeRemaining: z.number().multipleOf(0.001),
              }),
            ]),
          ),
      })
      .describe("Order filled event"),
    z
      .object({
        kind: z.literal("trade-occured").optional(),
        data: z
          .object({
            marketId: z.string(),
            timestamp: z.string().datetime({ offset: true }),
            price: z.number().multipleOf(0.001),
            size: z.number().multipleOf(0.001),
            buyer: z.string(),
            seller: z.string(),
          })
          .describe("Trade")
          .optional(),
      })
      .describe("Trade occured event"),
    z
      .object({
        kind: z.literal("request-failed"),
        data: z.object({ requestKind: z.string(), errorMessage: z.string() }),
      })
      .describe("Request failed event"),
  ])
  .describe("A message from the server");
