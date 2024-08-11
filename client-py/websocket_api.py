# Generated by the protocol buffer compiler.  DO NOT EDIT!
# sources: portfolio.proto, side.proto, order.proto, trade.proto, market.proto, market-settled.proto, order-cancelled.proto, order-created.proto, payment.proto, payments.proto, request-failed.proto, out.proto, user.proto, users.proto, server-message.proto, make-payment.proto, create-market.proto, settle-market.proto, create-order.proto, client-message.proto
# plugin: python-betterproto
from dataclasses import dataclass
from typing import List

import betterproto


class Side(betterproto.Enum):
    UNKNOWN = 0
    BID = 1
    OFFER = 2


@dataclass
class Portfolio(betterproto.Message):
    total_balance: str = betterproto.string_field(1)
    available_balance: str = betterproto.string_field(2)
    market_exposures: List["PortfolioMarketExposure"] = betterproto.message_field(3)


@dataclass
class PortfolioMarketExposure(betterproto.Message):
    market_id: int = betterproto.int64_field(1)
    position: str = betterproto.string_field(2)
    total_bid_size: str = betterproto.string_field(3)
    total_offer_size: str = betterproto.string_field(4)
    total_bid_value: str = betterproto.string_field(5)
    total_offer_value: str = betterproto.string_field(6)


@dataclass
class Order(betterproto.Message):
    id: int = betterproto.int64_field(1)
    market_id: int = betterproto.int64_field(2)
    owner_id: str = betterproto.string_field(3)
    transaction_id: int = betterproto.int64_field(4)
    price: str = betterproto.string_field(5)
    size: str = betterproto.string_field(6)
    side: "Side" = betterproto.enum_field(7)


@dataclass
class Trade(betterproto.Message):
    id: int = betterproto.int64_field(1)
    market_id: int = betterproto.int64_field(2)
    transaction_id: int = betterproto.int64_field(3)
    price: str = betterproto.string_field(4)
    size: str = betterproto.string_field(5)
    buyer_id: str = betterproto.string_field(6)
    seller_id: str = betterproto.string_field(7)


@dataclass
class Market(betterproto.Message):
    id: int = betterproto.int64_field(1)
    name: str = betterproto.string_field(2)
    description: str = betterproto.string_field(3)
    owner_id: str = betterproto.string_field(4)
    transaction_id: int = betterproto.int64_field(5)
    min_settlement: str = betterproto.string_field(6)
    max_settlement: str = betterproto.string_field(7)
    open: "MarketOpen" = betterproto.message_field(8, group="status")
    closed: "MarketClosed" = betterproto.message_field(9, group="status")
    orders: List["Order"] = betterproto.message_field(10)
    trades: List["Trade"] = betterproto.message_field(11)


@dataclass
class MarketOpen(betterproto.Message):
    pass


@dataclass
class MarketClosed(betterproto.Message):
    settle_price: str = betterproto.string_field(1)


@dataclass
class MarketSettled(betterproto.Message):
    id: int = betterproto.int64_field(1)
    settle_price: str = betterproto.string_field(2)


@dataclass
class OrderCancelled(betterproto.Message):
    id: int = betterproto.int64_field(1)
    market_id: int = betterproto.int64_field(2)


@dataclass
class OrderCreated(betterproto.Message):
    market_id: int = betterproto.int64_field(1)
    user_id: str = betterproto.string_field(2)
    order: "Order" = betterproto.message_field(3, group="_order")
    fills: List["OrderCreatedOrderFill"] = betterproto.message_field(4)
    trades: List["Trade"] = betterproto.message_field(5)


@dataclass
class OrderCreatedOrderFill(betterproto.Message):
    id: int = betterproto.int64_field(1)
    market_id: int = betterproto.int64_field(2)
    owner_id: str = betterproto.string_field(3)
    size_filled: str = betterproto.string_field(4)
    size_remaining: str = betterproto.string_field(5)
    price: str = betterproto.string_field(6)
    side: "Side" = betterproto.enum_field(7)


@dataclass
class Payment(betterproto.Message):
    id: int = betterproto.int64_field(1)
    payer_id: str = betterproto.string_field(2)
    recipient_id: str = betterproto.string_field(3)
    transaction_id: int = betterproto.int64_field(4)
    amount: str = betterproto.string_field(5)
    note: str = betterproto.string_field(6)


@dataclass
class Payments(betterproto.Message):
    payments: List["Payment"] = betterproto.message_field(1)


@dataclass
class RequestFailed(betterproto.Message):
    request_details: "RequestFailedRequestDetails" = betterproto.message_field(1)
    error_details: "RequestFailedErrorDetails" = betterproto.message_field(2)


@dataclass
class RequestFailedRequestDetails(betterproto.Message):
    kind: str = betterproto.string_field(1)


@dataclass
class RequestFailedErrorDetails(betterproto.Message):
    message: str = betterproto.string_field(1)


@dataclass
class Out(betterproto.Message):
    market_id: int = betterproto.int64_field(1)


@dataclass
class User(betterproto.Message):
    id: str = betterproto.string_field(1)
    name: str = betterproto.string_field(2)
    is_bot: bool = betterproto.bool_field(3)


@dataclass
class Users(betterproto.Message):
    users: List["User"] = betterproto.message_field(1)


@dataclass
class ServerMessage(betterproto.Message):
    portfolio: "Portfolio" = betterproto.message_field(1, group="message")
    market_data: "Market" = betterproto.message_field(2, group="message")
    market_created: "Market" = betterproto.message_field(3, group="message")
    market_settled: "MarketSettled" = betterproto.message_field(4, group="message")
    order_created: "OrderCreated" = betterproto.message_field(5, group="message")
    order_cancelled: "OrderCancelled" = betterproto.message_field(6, group="message")
    payments: "Payments" = betterproto.message_field(7, group="message")
    payment_created: "Payment" = betterproto.message_field(8, group="message")
    out: "Out" = betterproto.message_field(9, group="message")
    authenticated: "Authenticated" = betterproto.message_field(10, group="message")
    request_failed: "RequestFailed" = betterproto.message_field(11, group="message")
    user_created: "User" = betterproto.message_field(12, group="message")
    users: "Users" = betterproto.message_field(13, group="message")
    acting_as: "ActingAs" = betterproto.message_field(14, group="message")
    ownership_received: "Ownership" = betterproto.message_field(15, group="message")
    ownerships: "Ownerships" = betterproto.message_field(16, group="message")
    ownership_given: "OwnershipGiven" = betterproto.message_field(17, group="message")


@dataclass
class Authenticated(betterproto.Message):
    pass


@dataclass
class ActingAs(betterproto.Message):
    user_id: str = betterproto.string_field(1)


@dataclass
class Ownership(betterproto.Message):
    of_bot_id: str = betterproto.string_field(1)


@dataclass
class Ownerships(betterproto.Message):
    ownerships: List["Ownership"] = betterproto.message_field(1)


@dataclass
class OwnershipGiven(betterproto.Message):
    pass


@dataclass
class MakePayment(betterproto.Message):
    recipient_id: str = betterproto.string_field(1)
    amount: str = betterproto.string_field(2)
    note: str = betterproto.string_field(3)


@dataclass
class CreateMarket(betterproto.Message):
    name: str = betterproto.string_field(1)
    description: str = betterproto.string_field(2)
    min_settlement: str = betterproto.string_field(3)
    max_settlement: str = betterproto.string_field(4)


@dataclass
class SettleMarket(betterproto.Message):
    market_id: int = betterproto.int64_field(1)
    settle_price: str = betterproto.string_field(2)


@dataclass
class CreateOrder(betterproto.Message):
    market_id: int = betterproto.int64_field(2)
    price: str = betterproto.string_field(5)
    size: str = betterproto.string_field(6)
    side: "Side" = betterproto.enum_field(7)


@dataclass
class ClientMessage(betterproto.Message):
    create_market: "CreateMarket" = betterproto.message_field(1, group="message")
    settle_market: "SettleMarket" = betterproto.message_field(2, group="message")
    create_order: "CreateOrder" = betterproto.message_field(3, group="message")
    cancel_order: "CancelOrder" = betterproto.message_field(4, group="message")
    out: "Out" = betterproto.message_field(5, group="message")
    make_payment: "MakePayment" = betterproto.message_field(6, group="message")
    authenticate: "Authenticate" = betterproto.message_field(7, group="message")
    act_as: "ActAs" = betterproto.message_field(8, group="message")
    create_bot: "CreateBot" = betterproto.message_field(9, group="message")
    give_ownership: "GiveOwnership" = betterproto.message_field(10, group="message")


@dataclass
class CancelOrder(betterproto.Message):
    id: int = betterproto.int64_field(1)


@dataclass
class Authenticate(betterproto.Message):
    jwt: str = betterproto.string_field(1)
    id_jwt: str = betterproto.string_field(2)


@dataclass
class ActAs(betterproto.Message):
    user_id: str = betterproto.string_field(1)


@dataclass
class CreateBot(betterproto.Message):
    name: str = betterproto.string_field(1)


@dataclass
class GiveOwnership(betterproto.Message):
    of_bot_id: str = betterproto.string_field(1)
    to_user_id: str = betterproto.string_field(2)