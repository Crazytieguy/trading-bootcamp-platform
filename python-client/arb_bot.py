import logging
from time import sleep
from typing import Annotated, Optional, Callable, List

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
):
    with TradingClient(api_url, jwt, act_as) as client:
        state = client.state()
        market_ids = [
            state.market_name_to_id[name] for name in ["alpha_tw", "bravo_tw", "charlie_tw"]
        ]
        etf_id = state.market_name_to_id["abc_tw"]

        def exchange_formula(m_prices, e_prices) -> float:
            s1 = sum((m*2 for m in m_prices))
            s2 = sum(e_prices)
            return s1-s2

        try:
            arb_bot(
                client,
                market_ids=market_ids,
                etf_id=etf_id,
                expected_profit_for_exchange=exchange_formula,
            )
        except:
            for market_id in market_ids:
                client.out(market_id)
            client.out(etf_id)
            raise
        finally:
            for market_id in market_ids:
                client.out(market_id)
            client.out(etf_id)


def arb_bot(
    client: TradingClient,
    *,
    market_ids: List[int],
    etf_id: int,
    expected_profit_for_exchange: Callable[[List[float], List[float]], float],
) -> None:
    # Clear out any existing orders
    for market_id in market_ids:
        client.out(market_id)
    logger.info(f"Starting market maker bot for markets {market_ids}")

    while True:
        sleep(1)
        state = client.state()

        market_best_bids: List[float] = []
        etf_best_offers: List[float] = []

        # Collect best bids from component markets
        for market_id in market_ids:
            market = state.markets.get(market_id)
            if market is None:
                logger.info(f"No market data available for market {market_id}")
                raise ValueError("No market data available for ETF")

            best_bid = market.definition.min_settlement
            if market.bids:
                best_bid = max(bid.price for bid in market.bids)
            market_best_bids.append(best_bid)

        # Get best offer from ETF
        etf_market = state.markets.get(etf_id)
        if etf_market is None:
            logger.info(f"No market data available for ETF {etf_id}")
            raise ValueError("No market data available for ETF")

        etf_best_offer = etf_market.definition.max_settlement
        if etf_market.offers:
            etf_best_offer = min(offer.price for offer in etf_market.offers)
        etf_best_offers = [etf_best_offer]

        if len(market_best_bids) == len(market_ids):
            fair_price = expected_profit_for_exchange(market_best_bids, etf_best_offers)
            logger.info(f"Calculated fair price: {fair_price}")
        else:
            raise ValueError("Not all markets have data")

        if fair_price > 0.01:
            # Build debug message showing the trading strategy
            buy_markets = []
            sell_markets = []
            for market_id, bid_price in zip(market_ids, market_best_bids):
                market_name = next(
                    name
                    for name, id in state.market_name_to_id.items()
                    if id == market_id
                )
                buy_markets.append(f"{market_name}@{bid_price}")

            etf_name = next(
                name for name, id in state.market_name_to_id.items() if id == etf_id
            )
            sell_markets.append(f"{etf_name}@{etf_best_offer}")

            logger.info(f"Profitable trade detected: {fair_price}")
            logger.info(f"Planning to buy: {', '.join(buy_markets)}")
            logger.info(f"Planning to sell: {', '.join(sell_markets)}")

        for market_id in market_ids:
            market = state.markets.get(market_id)
            if market is None:
                raise ValueError("No market data available for ETF")

            bids = [
                ClientMessage(
                    create_order=CreateOrder(
                        market_id=market_id,
                        price=market.definition.min_settlement,
                        size=0.01,
                        side=Side.BID,
                    )
                )
            ]
            offers = [
                ClientMessage(
                    create_order=CreateOrder(
                        market_id=market_id,
                        price=market.definition.max_settlement,
                        size=0.01,
                        side=Side.OFFER,
                    )
                )
            ]
            cancels = []
            logger.info(
                f"Placing {len(bids)} bids, {len(offers)} offers for market {market_id}"
            )
            client.request_many(bids + offers + cancels)


if __name__ == "__main__":
    app()
