import logging
import random
from time import sleep

import typer
from dotenv import load_dotenv
from metagame import TradingClient
from metagame.websocket_api import Side
from typing_extensions import Annotated

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

app = typer.Typer(pretty_exceptions_show_locals=False)


@app.command()
def main(
    jwt: Annotated[str, typer.Option(envvar="JWT")],
    api_url: Annotated[str, typer.Option(envvar="API_URL")],
    act_as: Annotated[int, typer.Option(envvar="ACT_AS")],
    market_name: str,
    loss_per_trade: float = 1.0,
    max_size: float = 1.0,
    seconds_per_trade: float = 1.0,
):
    with TradingClient(api_url, jwt, act_as) as client:
        naive_bot(
            client,
            market_name=market_name,
            loss_per_trade=loss_per_trade,
            max_size=max_size,
            seconds_per_trade=seconds_per_trade,
        )


def naive_bot(
    client: TradingClient,
    *,
    market_name: str,
    loss_per_trade: float,
    max_size: float,
    seconds_per_trade: float,
):
    market_id = client.state().market_name_to_id[market_name]
    client.out(market_id)

    while True:
        sleep(1)
        if random.random() >= (1 / seconds_per_trade):
            continue

        market = client.state().markets.get(market_id)
        if not market or not market.orders:
            logger.info(f"No market data available for market {market_name}")
            continue

        bids = [order for order in market.orders if order.side == Side.BID]
        offers = [order for order in market.orders if order.side == Side.OFFER]

        if not bids:
            logger.info(f"No bids available for market {market_name}")
            continue

        if not offers:
            logger.info(f"No offers available for market {market_name}")
            continue

        best_bid = max(bids, key=lambda x: x.price)
        best_offer = min(offers, key=lambda x: x.price)
        spread = best_offer.price - best_bid.price

        available_size = min(best_bid.size, best_offer.size)
        desired_size = min(loss_per_trade * 2 / spread, max_size)
        size = min(available_size, desired_size)

        if random.random() < 0.5:
            side = Side.BID
            price = best_offer.price
        else:
            side = Side.OFFER
            price = best_bid.price

        logger.info(
            f"Market {market_name}: Placing {side.name} order, spread {spread}, size {size}, price {price}"
        )

        client.create_order(
            market_id=market_id,
            side=side,
            size=size,
            price=price,
        )
        client.out(market_id)


if __name__ == "__main__":
    app()
