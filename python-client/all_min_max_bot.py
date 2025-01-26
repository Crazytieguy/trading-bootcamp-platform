import logging
from typing import Annotated

import typer
from dotenv import load_dotenv

from metagame import TradingClient
from metagame.websocket_api import Side

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

app = typer.Typer(pretty_exceptions_show_locals=False)


@app.command()
def main(
    jwt: Annotated[str, typer.Option(envvar="JWT")],
    api_url: Annotated[str, typer.Option(envvar="API_URL")],
    act_as: Annotated[int, typer.Option(envvar="ACT_AS")],
    size: float = 100.0,
):
    with TradingClient(api_url, jwt, act_as) as client:
        all_markets(
            client,
            size=size,
        )


def min_max_bot(
    client: TradingClient,
    *,
    market_name: str,
    size: float,
):
    state = client.state()
    market_id = state.market_name_to_id[market_name]
    market = state.markets.get(market_id)
    if not market:
        logger.info(f"No market data available for market {market_name}")
        return

    min_settlement = market.definition.min_settlement
    max_settlement = market.definition.max_settlement

    client.create_order(market_id, min_settlement, size, Side.BID)
    client.create_order(market_id, max_settlement, size, Side.OFFER)


def all_markets(client: TradingClient, *, size: float):
    for market in [
        "alfa_tradewars",
        "bravo_tradewars",
        "charlie_tradewars",
        "delta_tradewars",
        "echo_tradewars",
        "foxtrot_tradewars",
        "golf_tradewars",
        "india_tradewars",
        "hotel_tradewars",
        "abc_tradewars",
        "def_tradewars",
        "ghi_tradewars",
    ]:
        try:
            min_max_bot(client, market_name=market, size=size)
        except Exception as e:
            print(e)


if __name__ == "__main__":
    app()
