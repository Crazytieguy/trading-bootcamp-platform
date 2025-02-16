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
    market_name: str = "bond_test",
    size: float = 100.0,
):
    with TradingClient(api_url, jwt, act_as) as client:
        arb_bot_gen(
            client,
            market_name=market_name,
            size=size,
        )


ETFS = {
    "ghi_tw": {"golf_tw": 3, "hotel_tw": 2, "india_tw": 1},
    "def_tw": {"delta_tw": 1, "echo_tw": 1, "foxtrot_tw": 4},
    "abc_tw": {"alpha_tw": 2, "bravo_tw": 2, "charlie_tw": 2},
}
ALL_MARKETS = list(
    set(ETFS.keys()).union(
        *[set(etf_constituents.keys()) for etf_constituents in ETFS.values()]
    )
)


def arb_bot_gen(
    client: TradingClient,
    *,
    market_name: str = "bond_test",
    size: float = 0.1,
):
    global ETFS, ALL_MARKETS
    market_name_to_market_id = state.market_name_to_id
    
    # x_name = "alpha_tw"
    # y_name = "bravo_tw"
    # z_name = "charlie_tw"
    # etf_name = "abc_tw"

    cx = 2  # where c_x*x + c_y*y + c_z*z = etf
    cy = 2
    cz = 2
    state = client.state()



    x_id = state.market_name_to_id[x_name]
    y_id = state.market_name_to_id[y_name]
    z_id = state.market_name_to_id[z_name]
    etf_id = state.market_name_to_id[etf_name]

    x_market = state.markets.get(x_id)
    y_market = state.markets.get(y_id)
    z_market = state.markets.get(z_id)
    etf_market = state.markets.get(etf_id)

    if not x_market:
        logger.info(f"No market data available for market {x_name}")
        return

    if not y_market:
        logger.info(f"No market data available for market {y_name}")
        return

    if not z_market:
        logger.info(f"No market data available for market {z_name}")
        return

    if not etf_market:
        logger.info(f"No market data available for market {etf_name}")
        return

    # min_settlement = market.definition.min_settlement

    x_bid = client.get_highest_bid(x_id) if client.get_highest_bid(x_id) else 0
    x_offer = (
        client.get_lowest_offer(x_id) if client.get_lowest_offer(x_id) else float("inf")
    )

    y_bid = client.get_highest_bid(y_id) if client.get_highest_bid(y_id) else 0
    y_offer = (
        client.get_lowest_offer(y_id) if client.get_lowest_offer(y_id) else float("inf")
    )

    z_bid = client.get_highest_bid(z_id) if client.get_highest_bid(z_id) else 0
    z_offer = (
        client.get_lowest_offer(z_id) if client.get_lowest_offer(z_id) else float("inf")
    )

    etf_bid = client.get_highest_bid(etf_id) if client.get_highest_bid(etf_id) else 0
    etf_offer = (
        client.get_lowest_offer(etf_id)
        if client.get_lowest_offer(etf_id)
        else float("inf")
    )

    predict_bid = etf_ideal(x_bid, y_bid, z_bid, cx, cy, cz)
    predict_offer = etf_ideal(x_offer, y_offer, z_offer, cx, cy, cz)

    if big_arb_detected(predict_bid, etf_offer):  # sell x, y, z and buy etf
        client.create_order(x_id, x_bid, size, Side.OFFER)
        client.create_order(y_id, y_bid, size, Side.OFFER)
        client.create_order(z_id, z_bid, size, Side.OFFER)
        client.create_order(etf_id, etf_offer, size, Side.BID)

    if small_arb_detected(predict_offer, etf_bid):  # buy x, y, z and sell etf
        client.create_order(x_id, x_offer, size, Side.BID)
        client.create_order(y_id, y_offer, size, Side.BID)
        client.create_order(z_id, z_offer, size, Side.BID)
        client.create_order(etf_id, etf_bid, size, Side.OFFER)


def etf_ideal(x, y, z, cx, cy, cz):
    return cx * x + cy * y + cz * z


def big_arb_detected(xyz_bid, etf_sell):
    return xyz_bid > etf_sell


def small_arb_detected(xyz_sell, etf_bid):
    return xyz_sell < etf_bid


if __name__ == "__main__":
    app()
