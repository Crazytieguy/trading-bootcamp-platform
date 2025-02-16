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
        market_tuples = [
            (state.market_name_to_id["alpha_tw"], 2),
            (state.market_name_to_id["bravo_tw"], 2),
            (state.market_name_to_id["charlie_tw"], 2),
        ]
        etf_tuples = [(state.market_name_to_id["abc_tw"], 1)]

        def exchange_formula(m_prices, e_prices) -> float:
            s1 = sum(m * ratio for m, ratio in zip(m_prices, [ratio for _, ratio in market_tuples]))
            s2 = sum(e * ratio for e, ratio in zip(e_prices, [ratio for _, ratio in etf_tuples]))
            return s1-s2

        try:
            arb_bot(
                client,
                market_tuples=market_tuples,
                etf_tuples=etf_tuples,
                expected_profit_for_exchange=exchange_formula,
            )
        except:
            for market_id, _ in market_tuples:
                client.out(market_id)
            for market_id, _ in etf_tuples:
                client.out(market_id)
            raise
        finally:
            for market_id, _ in market_tuples:
                client.out(market_id)
            for market_id, _ in etf_tuples:
                client.out(market_id)


def arb_bot(
    client: TradingClient,
    *,
    market_tuples: List[tuple[int, float]],
    etf_tuples: List[tuple[int, float]],
    expected_profit_for_exchange: Callable[[List[float], List[float]], float],
) -> None:
    # Clear out any existing orders
    for market_id, _ in market_tuples:
        client.out(market_id)
    logger.info(f"Starting market maker bot for markets {[mid for mid, _ in market_tuples]}")

    while True:
        sleep(1)
        state = client.state()

        market_best_bids: List[float] = []
        market_best_offers: List[float] = []
        etf_best_offers: List[float] = []
        etf_best_bids: List[float] = []

        # Collect best bids and offers from component markets
        for market_id, _ in market_tuples:
            market = state.markets.get(market_id)
            if market is None:
                logger.info(f"No market data available for market {market_id}")
                raise ValueError("No market data available for market")

            best_bid = market.definition.min_settlement
            best_offer = market.definition.max_settlement
            if market.bids:
                best_bid = max(bid.price for bid in market.bids)
            if market.offers:
                best_offer = min(offer.price for offer in market.offers)
            market_best_bids.append(best_bid)
            market_best_offers.append(best_offer)

        # Get best bid and offer from ETF
        for etf_id, _ in etf_tuples:
            etf_market = state.markets.get(etf_id)
            if etf_market is None:
                logger.info(f"No market data available for ETF {etf_id}")
                raise ValueError("No market data available for ETF")

            etf_best_bid = etf_market.definition.min_settlement
            etf_best_offer = etf_market.definition.max_settlement
            if etf_market.bids:
                etf_best_bid = max(bid.price for bid in etf_market.bids)
            if etf_market.offers:
                etf_best_offer = min(offer.price for offer in etf_market.offers)
            etf_best_bids.append(etf_best_bid)
            etf_best_offers.append(etf_best_offer)

        if len(market_best_bids) == len(market_tuples):
            # Calculate profitability in both directions
            long_profit = expected_profit_for_exchange(market_best_bids, etf_best_offers)
            short_profit = -expected_profit_for_exchange(market_best_offers, etf_best_bids)
            logger.info(f"Calculated profits - Long: {long_profit}, Short: {short_profit}")
        else:
            raise ValueError("Not all markets have data")

        orders = []
        if long_profit > 0.01:
            # Long strategy: Buy components, sell ETF
            logger.info(f"Executing long arbitrage (profit: {long_profit})")
            for (market_id, ratio), bid_price in zip(market_tuples, market_best_bids):
                market_name = next(name for name, id in state.market_name_to_id.items() if id == market_id)
                logger.info(f"Buying {market_name} at {bid_price}")
                orders.append(
                    ClientMessage(
                        create_order=CreateOrder(
                            market_id=market_id,
                            price=bid_price,
                            size=0.01 * ratio,
                            side=Side.OFFER,
                        )
                    )
                )
            
            for (etf_id, ratio), best_bid in zip(etf_tuples, etf_best_offers):
                logger.info(f"Selling ETF at {best_bid}")
                orders.append(
                    ClientMessage(
                        create_order=CreateOrder(
                            market_id=etf_id,
                            price=best_bid,
                            size=0.01 * ratio,
                            side=Side.BID,
                        )
                    )
                )

        elif short_profit > 0.01:
            # Short strategy: Sell components, buy ETF
            logger.info(f"Executing short arbitrage (profit: {short_profit})")
            for (market_id, ratio), offer_price in zip(market_tuples, market_best_offers):
                market_name = next(name for name, id in state.market_name_to_id.items() if id == market_id)
                logger.info(f"Selling {market_name} at {offer_price}")
                orders.append(
                    ClientMessage(
                        create_order=CreateOrder(
                            market_id=market_id,
                            price=offer_price,
                            size=0.01 * ratio,
                            side=Side.BID,
                        )
                    )
                )
            
            for (etf_id, ratio), best_bid in zip(etf_tuples, etf_best_bids):
                logger.info(f"Buying ETF at {best_bid}")
                orders.append(
                    ClientMessage(
                        create_order=CreateOrder(
                            market_id=etf_id,
                            price=best_bid,
                            size=0.01 * ratio,
                            side=Side.OFFER,
                        )
                    )
                )

        if orders:
            client.request_many(orders)
            logger.info("Orders executed successfully")



if __name__ == "__main__":
    app()
