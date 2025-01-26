from metagame.websocket_api import CancelOrder, ClientMessage, CreateOrder, Side
from price_utils import MarketPrices, bcolors
from pydantic import BaseModel
import logging
from time import sleep
from typing import Annotated, Optional

import typer
from dotenv import load_dotenv
from metagame import TradingClient
from metagame.websocket_api import CancelOrder, ClientMessage, CreateOrder, Side

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

portfolios_dict = {
    "def_tradewars": {
        "delta_tradewars": 1,
        "echo_tradewars": 1,
        "foxtrot_tradewars": 4,
    },
    "abc_tradewars": {
        "alfa_tradewars": 2,
        "bravo_tradewars": 2,
        "charlie_tradewars": 2,
    },
    "ghi_tradewars": {"golf_tradewars": 3, "hotel_tradewars": 2, "india_tradewars": 1},
}
app = typer.Typer(pretty_exceptions_show_locals=False)


@app.command()
def main(
    jwt: Annotated[str, typer.Option(envvar="JWT")],
    api_url: Annotated[str, typer.Option(envvar="API_URL")],
    act_as: Annotated[int, typer.Option(envvar="ACT_AS")],
    market_name: str,
    spread: float = 1.0,
    size: float = 0.1,
    fade_per_order: float = 1.0,
    prior: Optional[float] = None,
):
    with TradingClient(api_url, jwt, act_as) as client:
        arbitrage_etf_bot(
            client,
            etf_name=market_name,
            spread=spread,
            max_size=size,
            fade_per_order=fade_per_order,
            prior=prior,
            dry=False,
        )


class PComponent(BaseModel):
    weight: float
    id: int
    name: str

    @classmethod
    def from_name(cls, client, name: str, weight: float):
        return cls(
            weight=weight, id=client.state().market_name_to_id.get(name), name=name
        )


def arbitrage_etf(
    client,
    portfolio: list[MarketPrices],
    etf_name: str,
    max_size: float = 0.1,
    dry: bool = False,
):
    etf_prices = MarketPrices.from_client(client, etf_name)

    denovo_etf_components = [
        MarketPrices.from_client(client, component.name) * component.weight
        for component in portfolio
    ]

    denovo_etf_sum = sum(
        denovo_etf_components,
        start=MarketPrices(
            offer=0,
            bid=0,
            offer_size=float("inf"),
            bid_size=float("inf"),
            id=0,
            name="",
        ),
    )

    if etf_prices.bid > denovo_etf_sum.offer:
        size = min(
            [max_size, etf_prices.bid_size, denovo_etf_sum.offer_size]
        )  # check for the size of the trad
        # buy raw components and sell ETF

        bids = []
        for market, prices in zip(portfolio, denovo_etf_components):
            market_id = market.id
            price = prices.offer / market.weight
            size = round(size * market.weight, 2)
            print(
                bcolors.OKGREEN
                + f"buy {market.name} at {price}  | size: {size}"
                + bcolors.ENDC
            )

            bid_ = ClientMessage(
                create_order=CreateOrder(
                    market_id=market_id,
                    price=price,
                    size=size,
                    side=Side.BID,
                )
            )
            bids.append(bid_)
        # sell ETF
        print(
            bcolors.RED
            + f"sell {etf_prices.name} at {etf_prices.bid} | size: {size}"
            + bcolors.ENDC
        )
        offers = [
            ClientMessage(
                create_order=CreateOrder(
                    market_id=etf_prices.id,
                    price=etf_prices.bid,
                    size=size,
                    side=Side.OFFER,
                )
            )
        ]
        if not dry:
            # import pdb; pdb.set_trace()
            if any((order.create_order.size <= 0 for order in bids + offers)):
                print("Too small order size")
                return
            client.request_many(bids + offers)

        for market in [etf_prices] + portfolio:
            client.out(market.id)
    elif etf_prices.offer < denovo_etf_sum.bid:
        # buy ETF and sell raw components
        size = min([max_size, denovo_etf_sum.bid_size, etf_prices.offer_size])
        # buy ETF
        print(
            bcolors.OKGREEN
            + f"buy {etf_prices.name} at {etf_prices.offer}  | size: {size}"
            + bcolors.ENDC
        )
        bids = [
            ClientMessage(
                create_order=CreateOrder(
                    market_id=etf_prices.id,
                    side=Side.BID,
                    size=size,
                    price=etf_prices.offer,
                )
            )
        ]
        # sell components
        offers = []
        for market, prices in zip(portfolio, denovo_etf_components):
            market_id = market.id
            price = prices.bid / market.weight
            size = round(size * market.weight, 2)
            print(
                bcolors.RED
                + f"sell {market.name} at {price}  | size: {size}"
                + bcolors.ENDC
            )
            offer_ = ClientMessage(
                create_order=CreateOrder(
                    market_id=market_id,
                    side=Side.OFFER,
                    size=size,
                    price=price,
                )
            )
            offers.append(offer_)

        if not dry:
            if any((order.create_order.size <= 0 for order in bids + offers)):
                print("Too small order size")
                return
            client.request_many(bids + offers)
        # client.out(market_id)
        for market in portfolio + [etf_prices]:
            client.out(market.id)
    else:
        print(
            "No arbitrage opportunity\n",
            f"ETF {etf_name} bid {etf_prices.bid}\n",
            f"ETF {etf_name} offer {etf_prices.offer}\n",
            *[
                "Component "
                + market.name
                + f" bid {prices.bid}"
                + f" offer {prices.offer}\n"
                for market, prices in zip(portfolio, denovo_etf_components)
            ],
        )


def arbitrage_etf_bot(
    client: TradingClient,
    *,
    etf_name: str = "def_tradewars",
    spread: float,
    max_size: float,
    fade_per_order: float,
    prior: Optional[float] = None,
    dry: bool = False,
) -> None:
    # Clear out any existing orders
    # market_id = client.state().market_name_to_id[market_name]

    # etf_name = "def_tradewars"
    logger.info(f"Starting market maker bot for market {etf_name}")

    this_portfolio_dict = portfolios_dict[etf_name]
    portfolio = [
        PComponent.from_name(client, name=name, weight=weight)
        for name, weight in this_portfolio_dict.items()
    ]

    while True:
        sleep(1)
        # state = client.state()
        # market = state.markets.get(market_id)
        # client.out(market_id)
        # if market is None:
        #     logger.info(f"No market data available for market {market_id}")
        #     continue

        arbitrage_etf(client, portfolio, etf_name, dry=dry, max_size=max_size)


if __name__ == "__main__":
    app()


# if __name__ == '__main__':
#     from dotenv import load_dotenv, dotenv_values
#     from metagame import TradingClient
#     import os

#     env = dotenv_values()

#     client = TradingClient(
#         api_url=env["API_URL"],
#         jwt=env["JWT"],
#         act_as=int(env["ACT_AS"]),
#     )
#     portfolio = [PComponent.from_name(client, name="test_mix_max", weight=2),
#                 PComponent.from_name(client, name="Will any team go bankrupt via a rogue bot?", weight=1),
#                 PComponent.from_name(client, name="Will any team go bankrupt via a rogue bot?", weight=1)]
#     etf_name = "Will any team go bankrupt via a rogue bot?"

#     arbitrage_etf(portfolio, etf_name)
