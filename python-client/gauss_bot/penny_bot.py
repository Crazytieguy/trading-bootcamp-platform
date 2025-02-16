import logging

from dotenv import load_dotenv
from metagame import TradingClient
from metagame.websocket_api import Side
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()


def penny_bid_bot_v1(
    client: TradingClient,
    *,
    market_name: str,
    size: float,
):
    # naive bot that makes a single offer on bond at highest possible price
    # cancels it and makes a single bid at lowest possible price
    # cancels that

    state = client.state()
    market_id = state.market_name_to_id[market_name]
    market = state.markets.get(market_id)
    if not market:
        logger.info(f"No market data available for market {market_name}")
        return

    orders = market.bids
    offers = market.offers
    own_acc_id = client.state().user_id

    penny_order = next(filter(lambda x: x.owner_id != own_acc_id, orders))

    if not penny_order:
        logger.info("No penny order found")
        return

    penny_price = penny_order.price + 0.0001

    logger.info(penny_price)
    if penny_order.price < offers[0].price:
        client.create_order(market_id, penny_order.price + 0.0001, 0.01, Side.BID)

    time.sleep(10)

    client.out(market_id)
