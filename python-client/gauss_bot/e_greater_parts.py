import logging
from typing import Annotated

import typer
from dotenv import load_dotenv
from metagame import TradingClient
from metagame.websocket_api import Side
import time
from etf_arbitrage_v1 import (
    arbitrage_etf_sum_lesser_than_parts_1,
    arbitrage_etf_sum_greater_parts_bot_1,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

app = typer.Typer(pretty_exceptions_show_locals=False)


@app.command()
def main(
    jwt: Annotated[str, typer.Option(envvar="JWT")],
    api_url: Annotated[str, typer.Option(envvar="API_URL")],
    act_as: Annotated[int, typer.Option(envvar="ACT_AS")],
    market_name: str = "bond_test",
    size: float = 100.0,
):
    logger.info("Bots started!")
    with TradingClient(api_url, jwt, act_as) as client:
        arbitrage_etf_sum_greater_parts_bot_1(
            client,
            etf_market_name="abc_tw",
            component_market_names=["alpha_tw", "bravo_tw", "charlie_tw"],
            component_weights=[2, 2, 2],
            size=0.1,
            test=False,
        )


if __name__ == "__main__":
    app()
