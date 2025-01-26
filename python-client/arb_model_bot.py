# Step 1: Get logs of all the markets

import logging
from time import sleep
from typing import Annotated

import typer
from dotenv import load_dotenv
from metagame import TradingClient
from metagame.websocket_api import CancelOrder, ClientMessage, CreateOrder, Side

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

app = typer.Typer(pretty_exceptions_show_locals=False)

@app.command()
def main(
    jwt: Annotated[str, typer.Option(envvar="JWT")],
    api_url: Annotated[str, typer.Option(envvar="API_URL")],
    act_as: Annotated[int, typer.Option(envvar="ACT_AS")],
    markets: list[str],
    size: float = 100.0,
):
    with TradingClient(api_url, jwt, act_as) as client:
        arb_model_bot(
            client,
            markets=markets,
            size=size,
        )

def arb_model_bot(
    client: TradingClient,
    *,
    markets: list[str],
    size: float,
):
    market_id = client.state().market_name_to_id[market_name]
    client.out(market_id)

    while True:
        sleep(1)
