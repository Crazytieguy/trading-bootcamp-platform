import logging
from typing import Annotated

import typer
from dotenv import load_dotenv
from metagame import TradingClient
from metagame.websocket_api import Side
import time
from penny_bot import penny_bid_bot_v1
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
        """
            penny_bid_bot_v1(
                client,
                market_name="At 6PM Saturday, resolves to 20 if I believe a camp participant has >=4000 clips",
                size=size,
            )
        """

        arbitrage_etf_sum_greater_parts_bot_1(
            client,
            etf_market_name="gauss_test_ab",
            component_market_names=["gauss_test_a", "gauss_test_b"],
            component_weights=[1, 2],
            size=0.1,
            test=True,
        )


if __name__ == "__main__":
    app()
