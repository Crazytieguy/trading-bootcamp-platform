import logging
import uuid
from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, List, Optional

import betterproto
from websockets.frames import CloseCode
from websockets.sync.client import ClientConnection, connect

from . import websocket_api

logger = logging.getLogger(__name__)


class TradingClient:
    """
    Client for interacting with the exchange server.
    """

    _ws: ClientConnection
    _state: "State"

    def __init__(self, api_url: str, jwt: str, act_as: int):
        """
        Connect, Authenticate, then make sure all of the messages holding initial state have been received.
        """
        self._ws = connect(api_url, max_size=2**27)
        self._state = State()
        self._outstanding_requests = set()
        authenticate = websocket_api.Authenticate(jwt=jwt, act_as=act_as)
        self.send(websocket_api.ClientMessage(authenticate=authenticate))
        while self._state._initializing:
            server_message = self.recv()
            _, message = betterproto.which_one_of(server_message, "message")
            if isinstance(message, websocket_api.RequestFailed):
                raise RuntimeError(
                    f"{message.request_details.kind} request failed during initialization: {message.error_details.message}"
                )

    def state(self) -> "State":
        """
        Return the up-to-date state of the client.
        """
        try:
            while True:
                self.recv(timeout=1e-100)
        except TimeoutError:
            return self._state

    def create_order(
        self,
        market_id: int,
        price: float,
        size: float,
        side: websocket_api.Side,
    ) -> websocket_api.OrderCreated:
        """
        Place an order on the exchange.
        Note that if price and size are passed as float or Decimal they will be quantized.
        """
        price_quantized = round(price, 2)
        if abs(price_quantized - price) > 1e-4:
            logger.warning(f"Price {price} quantized to {price_quantized}")
        size_quantized = round(size, 2)
        if abs(size_quantized - size) > 1e-4:
            logger.warning(f"Size {size} quantized to {size_quantized}")
        msg = websocket_api.ClientMessage(
            create_order=websocket_api.CreateOrder(
                market_id=market_id,
                price=price_quantized,
                size=size_quantized,
                side=side,
            ),
        )
        response = self.request(msg)
        _, message = betterproto.which_one_of(response, "message")
        assert isinstance(message, websocket_api.OrderCreated)
        return message

    def cancel_order(self, order_id: int) -> websocket_api.OrdersCancelled:
        """
        Cancel an order on the exchange.
        """
        msg = websocket_api.ClientMessage(
            cancel_order=websocket_api.CancelOrder(
                id=order_id,
            ),
        )
        response = self.request(msg)
        _, message = betterproto.which_one_of(response, "message")
        assert isinstance(message, websocket_api.OrdersCancelled)
        return message

    def out(self, market_id: int) -> websocket_api.Out:
        """
        Cancel all orders for a market.
        """
        msg = websocket_api.ClientMessage(
            out=websocket_api.Out(
                market_id=market_id,
            ),
        )
        response = self.request(msg)
        _, message = betterproto.which_one_of(response, "message")
        assert isinstance(message, websocket_api.Out)
        return message

    def redeem(self, fund_id: int, amount: float) -> websocket_api.Redeemed:
        """
        Redeem a position in a market.
        Note that if amount is passed as float or Decimal it will be quantized.
        """
        amount_quantized = round(amount, 2)
        if abs(amount_quantized - amount) > 1e-4:
            logger.warning(f"Amount {amount} quantized to {amount_quantized}")
        msg = websocket_api.ClientMessage(
            redeem=websocket_api.Redeem(
                fund_id=fund_id,
                amount=amount_quantized,
            ),
        )
        response = self.request(msg)
        _, message = betterproto.which_one_of(response, "message")
        assert isinstance(message, websocket_api.Redeemed)
        return message

    def create_market(
        self,
        name: str,
        description: str,
        min_settlement: float,
        max_settlement: float,
        redeemable_for: List[int],
    ) -> websocket_api.CreateMarket:
        """
        Create a new market on the exchange.
        """
        msg = websocket_api.ClientMessage(
            create_market=websocket_api.CreateMarket(
                name=name,
                description=description,
                min_settlement=min_settlement,
                max_settlement=max_settlement,
                redeemable_for=redeemable_for,
            ),
        )
        response = self.request(msg)
        _, message = betterproto.which_one_of(response, "message")
        assert isinstance(message, websocket_api.CreateMarket)
        return message

    def settle_market(
        self, market_id: int, settle_price: float
    ) -> websocket_api.SettleMarket:
        """
        Settle a market on the exchange.
        """
        msg = websocket_api.ClientMessage(
            settle_market=websocket_api.SettleMarket(
                market_id=market_id,
                settle_price=settle_price,
            ),
        )
        response = self.request(msg)
        _, message = betterproto.which_one_of(response, "message")
        assert isinstance(message, websocket_api.SettleMarket)
        return message

    def make_transfer(
        self, from_account_id: int, to_account_id: int, amount: float, note: str
    ) -> websocket_api.MakeTransfer:
        """
        Make a transfer between accounts.
        """
        msg = websocket_api.ClientMessage(
            make_transfer=websocket_api.MakeTransfer(
                from_account_id=from_account_id,
                to_account_id=to_account_id,
                amount=amount,
                note=note,
            ),
        )
        response = self.request(msg)
        _, message = betterproto.which_one_of(response, "message")
        assert isinstance(message, websocket_api.MakeTransfer)
        return message

    def create_account(self, owner_id: int, name: str) -> websocket_api.CreateAccount:
        """
        Create a new account.
        """
        msg = websocket_api.ClientMessage(
            create_account=websocket_api.CreateAccount(
                owner_id=owner_id,
                name=name,
            ),
        )
        response = self.request(msg)
        _, message = betterproto.which_one_of(response, "message")
        assert isinstance(message, websocket_api.CreateAccount)
        return message

    def share_ownership(
        self, of_account_id: int, to_account_id: int
    ) -> websocket_api.ShareOwnership:
        """
        Share ownership of an account.
        """
        msg = websocket_api.ClientMessage(
            share_ownership=websocket_api.ShareOwnership(
                of_account_id=of_account_id,
                to_account_id=to_account_id,
            ),
        )
        response = self.request(msg)
        _, message = betterproto.which_one_of(response, "message")
        assert isinstance(message, websocket_api.ShareOwnership)
        return message

    def get_full_order_history(
        self, market_id: int
    ) -> websocket_api.GetFullOrderHistory:
        """
        Get the full order history for a market.
        """
        msg = websocket_api.ClientMessage(
            get_full_order_history=websocket_api.GetFullOrderHistory(
                market_id=market_id,
            ),
        )
        response = self.request(msg)
        _, message = betterproto.which_one_of(response, "message")
        assert isinstance(message, websocket_api.GetFullOrderHistory)
        return message

    def get_full_trade_history(
        self, market_id: int
    ) -> websocket_api.GetFullTradeHistory:
        """
        Get the full trade history for a market.
        """
        msg = websocket_api.ClientMessage(
            get_full_trade_history=websocket_api.GetFullTradeHistory(
                market_id=market_id,
            ),
        )
        response = self.request(msg)
        _, message = betterproto.which_one_of(response, "message")
        assert isinstance(message, websocket_api.GetFullTradeHistory)
        return message

    def request(
        self, message: websocket_api.ClientMessage
    ) -> websocket_api.ServerMessage:
        """
        Send a message to the server and wait for a response.
        """
        if not message.request_id:
            message.request_id = str(uuid.uuid4())
        self.send(message)
        while True:
            server_message = self.recv()
            if server_message.request_id == message.request_id:
                _, message = betterproto.which_one_of(server_message, "message")
                if isinstance(message, websocket_api.RequestFailed):
                    raise RequestFailed(
                        f"{message.request_details.kind} request failed: {message.error_details.message}"
                    )
                return server_message

    def request_many(
        self, messages: List[websocket_api.ClientMessage]
    ) -> List[websocket_api.ServerMessage]:
        """
        Send a list of messages to the server and wait for responses.
        """
        for message in messages:
            if not message.request_id:
                message.request_id = str(uuid.uuid4())
            self.send(message)
        responses = [websocket_api.ServerMessage() for _ in messages]
        while any(not response.request_id for response in responses):
            server_message = self.recv()
            for i, message in enumerate(messages):
                if server_message.request_id == message.request_id:
                    _, response = betterproto.which_one_of(server_message, "message")
                    if isinstance(response, websocket_api.RequestFailed):
                        raise RequestFailed(
                            f"{response.request_details.kind} request failed: {response.error_details.message}"
                        )
                    responses[i] = server_message
        return responses

    def close(self, code: int = CloseCode.NORMAL_CLOSURE, reason: str = ""):
        """
        Close the connection to the server.
        """
        self._ws.close(code, reason)

    def recv(self, timeout: Optional[float] = None) -> websocket_api.ServerMessage:
        """
        Wait for a message from the server and update the state accordingly,
        returning the kind of message and the message.
        """
        message = self._ws.recv(timeout=timeout)
        assert isinstance(message, bytes)
        decoded = websocket_api.ServerMessage().parse(message)
        self._state._update(decoded)
        return decoded

    def send(self, message: websocket_api.ClientMessage):
        """
        Send a message to the server.
        """
        self._ws.send(bytes(message))

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is None:
            self.close()
        else:
            self.close(CloseCode.INTERNAL_ERROR)


@dataclass
class MarketData:
    definition: websocket_api.Market = field(default_factory=websocket_api.Market)
    orders: List[websocket_api.Order] = field(default_factory=list)
    trades: List[websocket_api.Trade] = field(default_factory=list)
    hasFullOrderHistory: bool = False
    hasFullTradeHistory: bool = False


@dataclass
class State:
    """
    Aggregated state from the server
    """

    _initializing: bool = True
    user_id: int = 0
    acting_as: int = 0
    portfolio: websocket_api.Portfolio = field(default_factory=websocket_api.Portfolio)
    portfolios: Dict[int, websocket_api.Portfolio] = field(default_factory=dict)
    transfers: List[websocket_api.Transfer] = field(default_factory=list)
    accounts: List[websocket_api.Account] = field(default_factory=list)
    markets: Dict[int, MarketData] = field(default_factory=dict)
    market_name_to_id: Dict[str, int] = field(default_factory=dict)
    transactions: Dict[int, datetime] = field(default_factory=dict)

    def _update(self, server_message: websocket_api.ServerMessage):
        kind, message = betterproto.which_one_of(server_message, "message")

        if isinstance(message, websocket_api.Authenticated):
            self.user_id = message.account_id

        elif isinstance(message, websocket_api.ActingAs):
            # ActingAs is always the last message in the initialization sequence
            self.acting_as = message.account_id
            self.portfolio = self.portfolios[self.acting_as]
            self._initializing = False

        elif isinstance(message, websocket_api.Transactions):
            self.transactions = {
                transaction.id: transaction.timestamp
                for transaction in message.transactions
            }

        elif isinstance(message, websocket_api.Portfolios):
            if message.are_new_ownerships:
                for portfolio in message.portfolios:
                    self.portfolios[portfolio.account_id] = portfolio
            else:
                self.portfolios = {p.account_id: p for p in message.portfolios}
            if self.acting_as in self.portfolios:
                self.portfolio = self.portfolios[self.acting_as]

        elif isinstance(message, websocket_api.Portfolio):
            self.portfolios[message.account_id] = message
            if message.account_id == self.acting_as:
                self.portfolio = message

        elif isinstance(message, websocket_api.Transfers):
            for transfer in message.transfers:
                if all(t.id != transfer.id for t in self.transfers):
                    self.transfers.append(transfer)

        elif isinstance(message, websocket_api.Transfer):
            assert kind == "transfer_created"
            self.transactions[message.transaction.id] = message.transaction.timestamp
            if all(transfer.id != message.id for transfer in self.transfers):
                self.transfers.append(message)

        elif isinstance(message, websocket_api.Accounts):
            self.accounts = message.accounts

        elif isinstance(message, websocket_api.Account):
            assert kind == "account_created"
            if all(account.id != message.id for account in self.accounts):
                self.accounts.append(message)

        elif isinstance(message, websocket_api.Market):
            self.transactions[message.transaction.id] = message.transaction.timestamp

            self.markets.setdefault(message.id, MarketData()).definition = message
            self.market_name_to_id[message.name] = message.id

        elif isinstance(message, websocket_api.Orders):
            market_data = self.markets.setdefault(message.market_id, MarketData())
            market_data.orders = message.orders
            market_data.hasFullOrderHistory = message.has_full_history

        elif isinstance(message, websocket_api.Trades):
            market_data = self.markets.setdefault(message.market_id, MarketData())
            market_data.trades = message.trades
            market_data.hasFullTradeHistory = message.has_full_history

        elif isinstance(message, websocket_api.MarketSettled):
            self.transactions[message.transaction.id] = message.transaction.timestamp

            self.markets[message.id].definition.closed = websocket_api.MarketClosed(
                settle_price=message.settle_price, transaction_id=message.transaction.id
            )

        elif isinstance(message, websocket_api.OrdersCancelled):
            self.transactions[message.transaction.id] = message.transaction.timestamp

            if self.markets[message.market_id].hasFullOrderHistory:
                for order in self.markets[message.market_id].orders:
                    if order.id in message.order_ids:
                        order.size = 0
                        order.sizes.append(
                            websocket_api.Size(
                                transaction_id=message.transaction.id, size=0
                            )
                        )
            else:
                self.markets[message.market_id].orders = [
                    order
                    for order in self.markets[message.market_id].orders
                    if order.id not in message.order_ids
                ]

        elif isinstance(message, websocket_api.OrderCreated):
            self.transactions[message.transaction.id] = message.transaction.timestamp

            orders = self.markets[message.market_id].orders
            if message.order.id:
                orders.append(message.order)
            if message.fills:
                if self.markets[message.market_id].hasFullOrderHistory:
                    for order in orders:
                        if fill := next(
                            (fill for fill in message.fills if fill.id == order.id),
                            None,
                        ):
                            order.size = fill.size_remaining
                            order.sizes.append(
                                websocket_api.Size(
                                    transaction_id=message.transaction.id,
                                    size=fill.size_remaining,
                                )
                            )

                else:
                    fully_filled_orders = [
                        fill.id for fill in message.fills if fill.size_remaining == 0
                    ]
                    orders = [
                        order for order in orders if order.id not in fully_filled_orders
                    ]
                    partial_fills = [
                        fill for fill in message.fills if fill.size_remaining > 0
                    ]
                    for order in orders:
                        if fill := next(
                            (fill for fill in partial_fills if fill.id == order.id),
                            None,
                        ):
                            order.size = fill.size_remaining

                self.markets[message.market_id].orders = orders
            if message.trades:
                self.markets[message.market_id].trades.extend(message.trades)


class RequestFailed(Exception):
    pass
