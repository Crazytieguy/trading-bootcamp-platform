# Step 1: Get logs of all the markets

import logging
from time import sleep
from typing import Annotated

import typer
from dotenv import load_dotenv
from metagame import TradingClient
from metagame.websocket_api import CancelOrder, ClientMessage, CreateOrder, Side

import pandas as pd

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()


class SectorArbs:
    def __init__(self, index: str, underlying: list[str], composition: list[int]):
        self.index = index
        self.underlying = underlying
        self.composition = composition

    def calculate_min_size(self, market_data: pd.DataFrame):
        """
        calculate the minimum size of the arb based on the lowest individual asset size
        """

        pass

    def calculate_sizes(self, market_data: pd.DataFrame, direction: Side):
        """
        Side.BID: sell underlying assets, buy index
        Side.OFFER: sell index, buy underlying assets
        """
        pass


sector_market_ids = {
    "abc": ["abc", "a", "b", "c"],
}

sector_to_arbs = {
    "abc": SectorArbs(index="abc", underlying=["a", "b", "c"], composition=[2, 2, 2]),
}

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
    df = pd.DataFrame()

    # set up market feeds?
    market_ids = [client.state().market_name_to_id[name] for name in markets]
    sectors = ["abc", "def", "ghi"]

    while True:
        for sector in sectors: # should be sectors
            state = client.state()
            # 1. collect market data for all constituent markets
            for market_id in sector_market_ids[sector]:
                market_data = get_market_data(state.markets.get(market_id), market_id)
                # append this to the dataframe somehow

            # 2. calculate arbs
            calculate_arbs(market_data, sector)

            # 4. place orders
        sleep(0.01)


def get_market_data(state, market_id: str):
    df = pd.DataFrame()
    # get orderbook
    orders = state.markets[market_id].orders

    # get trades

    # get market info

    # get user's orders

    pass


# market data
# "arb path" = sector + side
# max size
# expected profit per path
def calculate_arbs(market_data: pd.DataFrame, sector_id: str):
    arbs = sector_to_arbs[sector_id]
    # find max arb size based on lowest individual asset size
    df = 
    #

    pass
class Signal:
    def __init__(self, market_id: str, side: Side, size: float):
        self.market_id = market_id
        self.side = side
        self.size = size

def place_orders(signals: list[Signal]):
    pass


if __name__ == "__main__":
    app()
