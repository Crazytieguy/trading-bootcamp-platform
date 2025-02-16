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
    loop_interval: float = typer.Option(1, help="Time interval for the loop in seconds"),
    max_size: float = typer.Option(0.01, help="Maximum order size factor")  # new CLI argument
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
                loop_interval=loop_interval,
                max_size=max_size  # pass the max_size argument
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
    loop_interval: float = 1,
    max_size: float = 0.01,  # new parameter for order size
) -> None:
    # Clear out any existing orders
    for market_id, _ in market_tuples:
        client.out(market_id)
    logger.info(f"Starting market maker bot for markets {[mid for mid, _ in market_tuples]}")

    # Helper function to generate orders
    def create_orders(
        instruments: List[tuple[int, float]],
        prices: List[float],
        side: Side,
        is_market: bool,
    ) -> List[ClientMessage]:
        orders = []
        action = "Buying" if side == Side.OFFER else "Selling"
        for (instr_id, ratio), price in zip(instruments, prices):
            logger.info(f"{action} {instr_id} at {price}")
            orders.append(
                ClientMessage(
                    create_order=CreateOrder(
                        market_id=instr_id,
                        price=price,
                        size=max_size * ratio,  # use max_size instead of 0.01
                        side=side,
                    )
                )
            )
        return orders

    # New helper to get best bids and offers
    def get_best_prices(
        instruments: List[tuple[int, float]],
        state,
        instrument_type: str,
    ) -> tuple[List[float], List[float]]:
        best_bids = []
        best_offers = []
        for instr_id, _ in instruments:
            market = state.markets.get(instr_id)
            if market is None:
                logger.info(f"No market data available for {instrument_type} {instr_id}")
                raise ValueError(f"No market data available for {instrument_type}")
            bid = market.definition.min_settlement
            offer = market.definition.max_settlement
            if market.bids:
                bid = max(bid_item.price for bid_item in market.bids)
            if market.offers:
                offer = min(offer_item.price for offer_item in market.offers)
            best_bids.append(bid)
            best_offers.append(offer)
        return best_bids, best_offers

    while True:
        sleep(loop_interval)
        state = client.state()

        # Replace duplicate loops by calling helper
        market_best_bids, market_best_offers = get_best_prices(market_tuples, state, "market")
        etf_best_bids, etf_best_offers = get_best_prices(etf_tuples, state, "ETF")

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
            orders += create_orders(market_tuples, market_best_bids, Side.OFFER, True)
            orders += create_orders(etf_tuples, etf_best_offers, Side.BID, False)

        elif short_profit > 0.01:
            # Short strategy: Sell components, buy ETF
            logger.info(f"Executing short arbitrage (profit: {short_profit})")
            orders += create_orders(market_tuples, market_best_offers, Side.BID, True)
            orders += create_orders(etf_tuples, etf_best_bids, Side.OFFER, False)

        if orders:
            client.request_many(orders)
            logger.info("Orders executed successfully")
        else:
            # cancel all orders:
            for market_id, _ in market_tuples:
                client.out(market_id)
            for etf_id, _ in etf_tuples:
                client.out(etf_id)

    #def redeem(self, fund_id: int, amount: float) -> websocket_api.Redeemed:



if __name__ == "__main__":
    app()
