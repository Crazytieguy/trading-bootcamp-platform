import logging
from typing import Annotated
import asyncio

import typer
from dotenv import load_dotenv
from metagame import TradingClient
from metagame.websocket_api import Side, CreateOrder, ClientMessage

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()
app = typer.Typer(pretty_exceptions_show_locals=False)


arbs = [
    {
        'Alpha': 0.2,
        'Beta': 0.2,
        'Charlie': 0.2,
        'ABC': -0.1
    },
    {
        'Alpha': -0.2,
        'Beta': -0.2,
        'Charlie': -0.2,
        'ABC': 0.1
    },
    {
        'Delta': 0.1,
        'Epsilon': 0.1,
        'Foxtrot': 0.4,
        'DEF': -0.1
    },
    {
        'Delta': -0.1,
        'Epsilon': -0.1,
        'Foxtrot': -0.4,
        'DEF': 0.1
    },
    {
        'Golf': 0.3,
        'Hotel': 0.2,
        'India': 0.1,
        'GHI': -0.1
    }
    {
        'Golf': -0.3,
        'Hotel': -0.2,
        'India': -0.1,
        'GHI': 0.1
    }
]

def round(n: float, up: bool=False):
    import math
    if up:
        return math.ceil(n * 100) / 100
    return math.floor(n * 100) / 100

def get_orders_to_fulfill_size(state, market_name, size):
    market_id = state.market_name_to_id[market_name]
    market = state.markets.get(market_id)
    orders = []
    cutoff = size * 2 * 10
    top_offers = [
        order
        for order in
        sorted(market.orders, key=lambda x: x.price)
        if order.side == Side.OFFER
    ][:cutoff]
    top_bids = [
        order
        for order in sorted(market.orders, key=lambda x: x.price)
        if order.side == Side.BID
    ][:cutoff][::-1]
    if size < 0:
        for order in top_offers:
            order.size = size # avoid order.size > size
            size += order.size
            orders.append((market_id, order))
    else:
        for order in top_bids[::-1]: # reverse reverse
            order.size = size
            size -= order.size
            orders.append((market_id, order))
    return orders

async def run_arb_if_profitable(client, arb: dict):
    while True:
        try:
            state = client.recv(timeout=0)
        except TimeoutError:
            continue
        expected_profit = 0
        orders = []
        for market_name, size in arb.items():
            orders.extend(get_orders_to_fulfill_size(state, market_name, size))
            expected_profit += sum(order.price for order in orders)
        if expected_profit > 0:
            bids = []
            offers = []
            for market_id, order in orders:
                client.out(market_id)
                if order.side == Side.OFFER:
                    bids.append(
                        ClientMessage(
                            create_order=CreateOrder(market_id, order.price, order.size, Side.BID)
                        )
                    )
                else:
                    bids.append(
                        ClientMessage(
                            create_order=CreateOrder(market_id, order.price, order.size, Side.OFFER)
                        )
                    )
            client.request_many(bids + offers)

async def arbs_bot(
    client: TradingClient,
    *,
    arbs: list[dict],
):
    # Run all arb strategies concurrently
    # 4 reads
    # 3 arbs * max 1 reqs per arb
    # 7 max
    # 100/s rate limit: 100 / 7 = 14x/s max runs
    # TOOD: try pulling state here if we hit ratelimits too often
    tasks = [run_arb_if_profitable(client, arb) for arb in arbs]
    await asyncio.gather(*tasks)

@app.command()
def main(
    jwt: Annotated[str, typer.Option(envvar="JWT")],
    api_url: Annotated[str, typer.Option(envvar="API_URL")],
    act_as: Annotated[int, typer.Option(envvar="ACT_AS")],
):
    with TradingClient(api_url, jwt, act_as) as client:
        asyncio.run(
            arbs_bot(
                client,
                arbs=arbs
            )
        )

if __name__ == "__main__":
    app()
