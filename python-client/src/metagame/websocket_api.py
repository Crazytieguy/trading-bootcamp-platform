# Generated by the protocol buffer compiler.  DO NOT EDIT!
# sources: portfolio.proto, redeemable.proto, market.proto, market-settled.proto, orders-cancelled.proto, side.proto, order.proto, trade.proto, order-created.proto, transfer.proto, request-failed.proto, out.proto, account.proto, redeem.proto, orders.proto, trades.proto, server-message.proto, make-transfer.proto, create-market.proto, settle-market.proto, create-order.proto, client-message.proto
# plugin: python-betterproto
from dataclasses import dataclass
from datetime import datetime
from typing import List

import betterproto


class Side(betterproto.Enum):
    UNKNOWN = 0
    BID = 1
    OFFER = 2


@dataclass
class Portfolio(betterproto.Message):
    account_id: int = betterproto.int64_field(1)
    total_balance: float = betterproto.double_field(2)
    available_balance: float = betterproto.double_field(3)
    market_exposures: List["PortfolioMarketExposure"] = betterproto.message_field(4)
    owner_credits: List["PortfolioOwnerCredit"] = betterproto.message_field(5)


@dataclass
class PortfolioMarketExposure(betterproto.Message):
    market_id: int = betterproto.int64_field(1)
    position: float = betterproto.double_field(2)
    total_bid_size: float = betterproto.double_field(3)
    total_offer_size: float = betterproto.double_field(4)
    total_bid_value: float = betterproto.double_field(5)
    total_offer_value: float = betterproto.double_field(6)


@dataclass
class PortfolioOwnerCredit(betterproto.Message):
    owner_id: int = betterproto.int64_field(1)
    credit: float = betterproto.double_field(2)


@dataclass
class Redeemable(betterproto.Message):
    constituent_id: int = betterproto.int64_field(1)
    multiplier: int = betterproto.sint64_field(2)


@dataclass
class Market(betterproto.Message):
    id: int = betterproto.int64_field(1)
    name: str = betterproto.string_field(2)
    description: str = betterproto.string_field(3)
    owner_id: int = betterproto.int64_field(10)
    transaction_id: int = betterproto.int64_field(12)
    transaction_timestamp: datetime = betterproto.message_field(13)
    min_settlement: float = betterproto.double_field(6)
    max_settlement: float = betterproto.double_field(7)
    redeemable_for: List["Redeemable"] = betterproto.message_field(4)
    redeem_fee: float = betterproto.double_field(11)
    open: "MarketOpen" = betterproto.message_field(8, group="status")
    closed: "MarketClosed" = betterproto.message_field(9, group="status")


@dataclass
class MarketOpen(betterproto.Message):
    pass


@dataclass
class MarketClosed(betterproto.Message):
    settle_price: float = betterproto.double_field(1)
    transaction_id: int = betterproto.int64_field(2)
    transaction_timestamp: datetime = betterproto.message_field(3)


@dataclass
class MarketSettled(betterproto.Message):
    id: int = betterproto.int64_field(1)
    settle_price: float = betterproto.double_field(2)
    transaction_id: int = betterproto.int64_field(4)
    transaction_timestamp: datetime = betterproto.message_field(5)


@dataclass
class OrdersCancelled(betterproto.Message):
    order_ids: List[int] = betterproto.int64_field(1)
    market_id: int = betterproto.int64_field(2)
    transaction_id: int = betterproto.int64_field(4)
    transaction_timestamp: datetime = betterproto.message_field(5)


@dataclass
class Order(betterproto.Message):
    id: int = betterproto.int64_field(1)
    market_id: int = betterproto.int64_field(2)
    owner_id: int = betterproto.int64_field(9)
    transaction_id: int = betterproto.int64_field(4)
    transaction_timestamp: datetime = betterproto.message_field(10)
    price: float = betterproto.double_field(5)
    size: float = betterproto.double_field(6)
    side: "Side" = betterproto.enum_field(7)
    sizes: List["Size"] = betterproto.message_field(8)


@dataclass
class Size(betterproto.Message):
    transaction_id: int = betterproto.int64_field(1)
    transaction_timestamp: datetime = betterproto.message_field(3)
    size: float = betterproto.double_field(2)


@dataclass
class Trade(betterproto.Message):
    id: int = betterproto.int64_field(1)
    market_id: int = betterproto.int64_field(2)
    transaction_id: int = betterproto.int64_field(3)
    transaction_timestamp: datetime = betterproto.message_field(10)
    price: float = betterproto.double_field(4)
    size: float = betterproto.double_field(5)
    buyer_id: int = betterproto.int64_field(8)
    seller_id: int = betterproto.int64_field(9)


@dataclass
class OrderCreated(betterproto.Message):
    market_id: int = betterproto.int64_field(1)
    account_id: int = betterproto.int64_field(2)
    order: "Order" = betterproto.message_field(3, group="_order")
    fills: List["OrderCreatedOrderFill"] = betterproto.message_field(4)
    trades: List["Trade"] = betterproto.message_field(5)
    transaction_id: int = betterproto.int64_field(7)
    transaction_timestamp: datetime = betterproto.message_field(8)


@dataclass
class OrderCreatedOrderFill(betterproto.Message):
    id: int = betterproto.int64_field(1)
    market_id: int = betterproto.int64_field(2)
    owner_id: int = betterproto.int64_field(8)
    size_filled: float = betterproto.double_field(4)
    size_remaining: float = betterproto.double_field(5)
    price: float = betterproto.double_field(6)
    side: "Side" = betterproto.enum_field(7)


@dataclass
class Transfer(betterproto.Message):
    id: int = betterproto.int64_field(1)
    initiator_id: int = betterproto.int64_field(2)
    from_account_id: int = betterproto.int64_field(3)
    to_account_id: int = betterproto.int64_field(4)
    transaction_id: int = betterproto.int64_field(8)
    transaction_timestamp: datetime = betterproto.message_field(9)
    amount: float = betterproto.double_field(6)
    note: str = betterproto.string_field(7)


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
class Account(betterproto.Message):
    id: int = betterproto.int64_field(1)
    name: str = betterproto.string_field(2)
    is_user: bool = betterproto.bool_field(3)


@dataclass
class Redeem(betterproto.Message):
    fund_id: int = betterproto.int64_field(1)
    amount: float = betterproto.double_field(2)


@dataclass
class Redeemed(betterproto.Message):
    transaction_id: int = betterproto.int64_field(5)
    transaction_timestamp: datetime = betterproto.message_field(6)
    account_id: int = betterproto.int64_field(2)
    fund_id: int = betterproto.int64_field(3)
    amount: float = betterproto.double_field(4)


@dataclass
class Orders(betterproto.Message):
    market_id: int = betterproto.int64_field(1)
    orders: List["Order"] = betterproto.message_field(2)
    has_full_history: bool = betterproto.bool_field(3)


@dataclass
class Trades(betterproto.Message):
    market_id: int = betterproto.int64_field(1)
    trades: List["Trade"] = betterproto.message_field(2)
    has_full_history: bool = betterproto.bool_field(3)


@dataclass
class ServerMessage(betterproto.Message):
    request_id: str = betterproto.string_field(19)
    portfolio_updated: "Portfolio" = betterproto.message_field(1, group="message")
    portfolios: "Portfolios" = betterproto.message_field(2, group="message")
    market: "Market" = betterproto.message_field(3, group="message")
    market_settled: "MarketSettled" = betterproto.message_field(4, group="message")
    order_created: "OrderCreated" = betterproto.message_field(5, group="message")
    orders_cancelled: "OrdersCancelled" = betterproto.message_field(6, group="message")
    transfers: "Transfers" = betterproto.message_field(7, group="message")
    transfer_created: "Transfer" = betterproto.message_field(8, group="message")
    out: "Out" = betterproto.message_field(9, group="message")
    authenticated: "Authenticated" = betterproto.message_field(10, group="message")
    request_failed: "RequestFailed" = betterproto.message_field(11, group="message")
    account_created: "Account" = betterproto.message_field(12, group="message")
    accounts: "Accounts" = betterproto.message_field(13, group="message")
    acting_as: "ActingAs" = betterproto.message_field(14, group="message")
    ownership_given: "OwnershipGiven" = betterproto.message_field(17, group="message")
    redeemed: "Redeemed" = betterproto.message_field(18, group="message")
    orders: "Orders" = betterproto.message_field(20, group="message")
    trades: "Trades" = betterproto.message_field(21, group="message")


@dataclass
class Authenticated(betterproto.Message):
    account_id: int = betterproto.int64_field(1)


@dataclass
class ActingAs(betterproto.Message):
    account_id: int = betterproto.int64_field(1)


@dataclass
class Portfolios(betterproto.Message):
    portfolios: List["Portfolio"] = betterproto.message_field(1)
    are_new_ownerships: bool = betterproto.bool_field(2)


@dataclass
class OwnershipGiven(betterproto.Message):
    pass


@dataclass
class Transfers(betterproto.Message):
    transfers: List["Transfer"] = betterproto.message_field(1)


@dataclass
class Accounts(betterproto.Message):
    accounts: List["Account"] = betterproto.message_field(1)


@dataclass
class MakeTransfer(betterproto.Message):
    from_account_id: int = betterproto.int64_field(1)
    to_account_id: int = betterproto.int64_field(2)
    amount: float = betterproto.double_field(3)
    note: str = betterproto.string_field(4)


@dataclass
class CreateMarket(betterproto.Message):
    name: str = betterproto.string_field(1)
    description: str = betterproto.string_field(2)
    min_settlement: float = betterproto.double_field(3)
    max_settlement: float = betterproto.double_field(4)
    redeemable_for: List["Redeemable"] = betterproto.message_field(5)
    redeem_fee: float = betterproto.double_field(6)


@dataclass
class SettleMarket(betterproto.Message):
    market_id: int = betterproto.int64_field(1)
    settle_price: float = betterproto.double_field(2)


@dataclass
class CreateOrder(betterproto.Message):
    market_id: int = betterproto.int64_field(2)
    price: float = betterproto.double_field(5)
    size: float = betterproto.double_field(6)
    side: "Side" = betterproto.enum_field(7)


@dataclass
class ClientMessage(betterproto.Message):
    request_id: str = betterproto.string_field(14)
    create_market: "CreateMarket" = betterproto.message_field(1, group="message")
    settle_market: "SettleMarket" = betterproto.message_field(2, group="message")
    create_order: "CreateOrder" = betterproto.message_field(3, group="message")
    cancel_order: "CancelOrder" = betterproto.message_field(4, group="message")
    out: "Out" = betterproto.message_field(5, group="message")
    make_transfer: "MakeTransfer" = betterproto.message_field(6, group="message")
    authenticate: "Authenticate" = betterproto.message_field(7, group="message")
    act_as: "ActAs" = betterproto.message_field(8, group="message")
    create_account: "CreateAccount" = betterproto.message_field(9, group="message")
    share_ownership: "ShareOwnership" = betterproto.message_field(10, group="message")
    get_full_order_history: "GetFullOrderHistory" = betterproto.message_field(
        11, group="message"
    )
    get_full_trade_history: "GetFullTradeHistory" = betterproto.message_field(
        12, group="message"
    )
    redeem: "Redeem" = betterproto.message_field(13, group="message")


@dataclass
class GetFullOrderHistory(betterproto.Message):
    market_id: int = betterproto.int64_field(1)


@dataclass
class GetFullTradeHistory(betterproto.Message):
    market_id: int = betterproto.int64_field(1)


@dataclass
class CancelOrder(betterproto.Message):
    id: int = betterproto.int64_field(1)


@dataclass
class Authenticate(betterproto.Message):
    jwt: str = betterproto.string_field(1)
    id_jwt: str = betterproto.string_field(2)
    act_as: int = betterproto.int64_field(4)


@dataclass
class ActAs(betterproto.Message):
    account_id: int = betterproto.int64_field(1)


@dataclass
class CreateAccount(betterproto.Message):
    owner_id: int = betterproto.int64_field(1)
    name: str = betterproto.string_field(2)


@dataclass
class ShareOwnership(betterproto.Message):
    of_account_id: int = betterproto.int64_field(1)
    to_account_id: int = betterproto.int64_field(2)
