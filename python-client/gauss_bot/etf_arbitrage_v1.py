import logging
from typing import Annotated

import typer
from dotenv import load_dotenv
from metagame import TradingClient
from metagame.websocket_api import Side
import time

DELTA = 0.0001
ARB_EPSILON = 4

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def arbitrage_etf_sum_lesser_than_parts_1(
    client: TradingClient,
    *,
    etf_market_name: str,
    component_market_names: list[str],
    component_weights: list[float],
    size: float = 0.1,
    test: bool = True,
):
    state = client.state()
    etf_id = state.market_name_to_id[etf_market_name]
    etf_market = state.markets.get(etf_id)
    if not etf_market:
        logger.info(f"No market data available for market {etf_market_name}")
        return
    own_acc_id = client.state().user_id

    component_market_ids = [
        state.market_name_to_id[name] for name in component_market_names
    ]
    component_markets = [state.markets.get(id) for id in component_market_ids]

    # ETF < SUM (component_market_prices * component_weights)
    etf_best_offer = (
        etf_market.offers[0]
        if test
        else next(filter(lambda x: x.owner_id != own_acc_id, etf_market.offers))
        if etf_market.offers
        else None
    )

    if etf_best_offer:
        # Calculate weighted sum of component ask prices
        component_total = 0
        can_execute = True
        for market, weight in zip(component_markets, component_weights):
            if not market or not market.bids:
                can_execute = False
                break
            component_total += market.bids[0].price * weight

        # padding for different between ETF bid and component sum
        if can_execute and (etf_best_offer.price - component_total) < ARB_EPSILON:
            # Arbitrage opportunity found:
            # Buy ETF at bid price
            # Sell components at offer prices
            # Redeem to end up zero
            logger.info(
                f"Found arbitrage: ETF offer {etf_best_offer.price} < components sum {component_total}"
            )

            # Buy ETF
            client.create_order(etf_id, etf_best_offer.price + DELTA, size, Side.BID)

            # Buy components
            for market_id, weight, market in zip(
                component_market_ids, component_weights, component_markets
            ):
                if market and market.offers:
                    component_size = size * weight
                    client.create_order(
                        market_id,
                        market.offers[0].price - DELTA,
                        component_size,
                        Side.OFFER,
                    )
                    # Call redeem with market that's combination of components

            time.sleep(10)  # Wait for orders to process

            # Redeem to net to 0
            if not test:
                client.redeem(etf_id, -size)

            # Be out of all markets because we only trade when we have arbitrage opportunity
            client.out(etf_id)
            for market_id in component_market_ids:
                client.out(market_id)


def arbitrage_etf_sum_greater_parts_bot_1(
    client: TradingClient,
    *,
    etf_market_name: str,
    component_market_names: list[str],
    component_weights: list[float],
    size: float = 0.1,
    test: bool = True,
):
    # naive bot that makes a single offer on bond at highest possible price
    # cancels it and makes a single bid at lowest possible price
    # cancels that

    state = client.state()
    etf_id = state.market_name_to_id[etf_market_name]
    etf_market = state.markets.get(etf_id)
    if not etf_market:
        logger.info(f"No market data available for market {etf_market_name}")
        return
    own_acc_id = client.state().user_id

    component_market_ids = [
        state.market_name_to_id[name] for name in component_market_names
    ]
    component_markets = [state.markets.get(id) for id in component_market_ids]

    # Check conditions

    # ETF > SUM (component_market_prices * component_weights)
    etf_best_bid = (
        etf_market.bids[0]
        if test
        else next(filter(lambda x: x.owner_id != own_acc_id, etf_market.bids))
        if etf_market.bids
        else None
    )
    logger.info(f"etf_best_bid: {etf_best_bid}")

    if etf_best_bid:
        # Calculate weighted sum of component ask prices
        component_total = 0
        can_execute = True
        for market, weight in zip(component_markets, component_weights):
            if not market or not market.offers:
                can_execute = False
                break
            component_total += market.offers[0].price * weight

        # padding for different between ETF bid and component sum
        if can_execute and (etf_best_bid.price - component_total) > ARB_EPSILON:
            # Arbitrage opportunity found:
            # Sell ETF at bid price
            # Buy components at offer prices
            # Redeem to end up zero
            logger.info(
                f"Found arbitrage: ETF bid {etf_best_bid.price} > components sum {component_total}"
            )

            # Sell ETF
            client.create_order(etf_id, etf_best_bid.price, size, Side.OFFER)

            # Buy components
            for market_id, weight, market in zip(
                component_market_ids, component_weights, component_markets
            ):
                if market and market.offers:
                    component_size = size * weight
                    client.create_order(
                        market_id,
                        market.offers[0].price,
                        component_size,
                        Side.BID,
                    )
                    # Call redeem with market that's combination of components

            # Redeem to net to 0
            if not test:
                client.redeem(etf_id, size)

            time.sleep(0.01)  # Wait for orders to process

            # Be out of all markets because we only trade when we have arbitrage opportunity
            client.out(etf_id)
            for market_id in component_market_ids:
                client.out(market_id)
