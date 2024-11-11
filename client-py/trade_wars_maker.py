import logging
import math
from time import sleep
import traceback
from typing import Optional, List, Dict

import typer
from dotenv import load_dotenv
from trading_client import RequestFailed, TradingClient
from typing_extensions import Annotated
from websocket_api import ClientMessage, CreateOrder, CancelOrder, Side

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

app = typer.Typer(pretty_exceptions_show_locals=False)

@app.command()
def main(
    jwt: Annotated[str, typer.Option(envvar="JWT")],
    api_url: Annotated[str, typer.Option(envvar="API_URL")],
    act_as: Annotated[str, typer.Option(envvar="ACT_AS")],
    market_ids: str,
    spread: float = 1.0,
    size: float = 0.01,
    fade_per_order: Optional[float] = None,
    fade: Optional[float] = None,
    depth_fade_per_order: Optional[float] = None,
    temp_fade: float = 0,
    temp_fade_half_life: float = 10,
    depth: int = 5,
):
    if fade_per_order is not None:
        assert(fade is None)
    elif fade is not None:
        assert(fade_per_order is None)
        fade_per_order = fade * size

    with TradingClient(api_url, jwt, act_as) as client:
        run_market_makers(
            client,
            market_ids=list(map(int, market_ids.split(","))),
            spread=spread,
            size=size,
            fade_per_order=fade_per_order,
            depth_fade_per_order=depth_fade_per_order,
            temp_fade=temp_fade,
            temp_fade_half_life=temp_fade_half_life,
            depth=depth,
        )

def run_market_makers(
    client: TradingClient,
    *,
    market_ids: List[int],
    spread: float,
    size: float,
    fade_per_order: float,
    depth_fade_per_order: Optional[float],
    temp_fade: float,
    temp_fade_half_life: float,
    depth: int,
) -> None:
    fade = fade_per_order / size
    if depth_fade_per_order is None:
        depth_fade_per_order = fade_per_order

    # Initialize state for each market
    market_states = {
        market_id: {
            "temp_fade_sell": 0,
            "temp_fade_buy": 0,
            "last_position": None,
            "local_fair_diff": 0,
        }
        for market_id in market_ids
    }

    # Clear existing orders for all markets
    for market_id in market_ids:
        client.out(market_id)
        logger.info(f"Starting market maker bot for market {market_id}")

    temp_fade_decay_per_second = math.pow(0.5, 1/temp_fade_half_life)
    logger.info(f"Temp fade is being multiplied by {temp_fade_decay_per_second} every second")


    sum_id = market_ids[0]
    diff_id = market_ids[1]
    avg_id = market_ids[2]
    a_id = market_ids[3]
    b_id = market_ids[4]
    c_id = market_ids[5]
    d_id = market_ids[6]
    a_ids_other = market_ids[7:10]
    b_ids_other = market_ids[10:13]
    c_ids_other = market_ids[13:16]
    d_ids_other = market_ids[16:19]
    assert len(market_ids) == 19

    while True:
        sleep(1)
        state = client.state()

        def position_in_market(market_id: int):
            return next(
                (exp.position for exp in state.portfolio.market_exposures if exp.market_id == market_id),
                0,
            )

        a_positions = [position_in_market(id)+position_in_market(a_id)+position_in_market(sum_id)+position_in_market(avg_id)/4+position_in_market(diff_id) for id in a_ids_other]
        b_positions = [position_in_market(id)+position_in_market(b_id)+position_in_market(sum_id)+position_in_market(avg_id)/4 for id in b_ids_other]
        c_positions = [position_in_market(id)+position_in_market(c_id)+position_in_market(sum_id)+position_in_market(avg_id)/4 for id in c_ids_other]
        d_positions = [position_in_market(id)+position_in_market(d_id)+position_in_market(sum_id)+position_in_market(avg_id)/4-position_in_market(diff_id) for id in d_ids_other]

        a_prior = 16.5*3
        b_prior = 12.5*3
        c_prior = 21*3 - b_prior
        d_prior = 21*3 - a_prior

        a_fairs = [a_prior - a_position * fade for a_position in a_positions]
        b_fairs = [b_prior - b_position * fade for b_position in b_positions]
        c_fairs = [c_prior - c_position * fade for c_position in c_positions]
        d_fairs = [d_prior - d_position * fade for d_position in d_positions]

        a_fair = sum(a_fairs)
        b_fair = sum(b_fairs)
        c_fair = sum(c_fairs)
        d_fair = sum(d_fairs)

        sum_fair = a_fair + b_fair + c_fair + d_fair
        avg_fair = (a_fair + b_fair + c_fair + d_fair) / 4
        diff_fair = a_fair - d_fair

        def step_market(market_id: int, fair: float):
            market = state.markets.get(market_id)
            if market is None:
                logger.info(f"No market data available for market {market_id}")
                return

            def clamp(value: float):
                return round(
                    max(
                        market.min_settlement,
                        min(market.max_settlement, value),
                    ),
                    2,
                )

            market_state = market_states[market_id]
            temp_fade_sell = market_state["temp_fade_sell"]
            temp_fade_buy = market_state["temp_fade_buy"]
            last_position = market_state["last_position"]
            local_fair_diff = market_state["local_fair_diff"]
            print(f"Market {market_id} local fair diff: {local_fair_diff}")

            current_position = next(
                (
                    exp.position
                    for exp in state.portfolio.market_exposures
                    if exp.market_id == market_id
                ),
                0,
            )
            logger.info(f"Market {market_id} current position: {current_position}")

            our_bids = [
                order.price
                for order in market.orders
                if order.side == Side.BID and order.owner_id == state.acting_as.user_id
            ]
            our_offers = [
                order.price
                for order in market.orders
                if order.side == Side.OFFER and order.owner_id == state.acting_as.user_id
            ]

            our_best_bid = max(our_bids + [market.min_settlement])
            our_best_offer = min(our_offers + [market.max_settlement])

            print(f"Market {market_id} current position per size: {round(current_position / (size))}")
            fair_price = round(fair) # HELL YEAH
            
            if last_position is None:
                last_position = current_position
            d_position = current_position - last_position
            if last_position > current_position:
                logger.info(f"Market {market_id} sold {-d_position}!")
                temp_fade_sell += temp_fade * -(d_position/size*depth_fade_per_order)
                local_fair_diff += -d_position * fade
            elif last_position < current_position:
                logger.info(f"Market {market_id} bought {d_position}!")
                temp_fade_buy += temp_fade * (d_position/size*depth_fade_per_order)
                local_fair_diff += -d_position * fade
            market_state["last_position"] = current_position

            fair_price = fair_price + local_fair_diff
            fair_price = round(fair_price)
            logger.info(f"Market {market_id} current fair: {fair_price}")

            temp_fade_buy *= temp_fade_decay_per_second
            temp_fade_sell *= temp_fade_decay_per_second
            if temp_fade_buy < 0.1 * temp_fade:
                temp_fade_buy = 0
            if temp_fade_sell < 0.1 * temp_fade:
                temp_fade_sell = 0
            market_state["temp_fade_buy"] = temp_fade_buy
            market_state["temp_fade_sell"] = temp_fade_sell
            logger.info(f"Market {market_id} temp fades: {temp_fade_buy}:{temp_fade_sell}")

            our_desired_best_bid = clamp(fair_price - spread / 2 - temp_fade_buy)
            our_desired_best_offer = clamp(fair_price + spread / 2 + temp_fade_sell)
            
            logger.info(f"Market {market_id} current spread: {our_best_bid}@{our_best_offer} Goal spread: {our_desired_best_bid}@{our_desired_best_offer}")

            desired_bid_prices = [
                clamp((fair_price - i * depth_fade_per_order - spread / 2))
                for i in range(depth)
                if i*depth_fade_per_order >= temp_fade_buy or i == depth-1
            ]
            desired_offer_prices = [
                clamp((fair_price + i * depth_fade_per_order + spread / 2))
                for i in range(depth)
                if i*depth_fade_per_order >= temp_fade_sell or i == depth-1
            ]

            new_bid_prices = [
                bid for bid in desired_bid_prices if bid not in our_bids
            ]
            new_offer_prices = [
                offer for offer in desired_offer_prices if offer not in our_offers
            ]
            new_cancel_prices = [
                bid for bid in our_bids if bid not in desired_bid_prices
            ] + [
                offer for offer in our_offers if offer not in desired_offer_prices
            ]
            new_cancel_ids = [
                order.id
                for order in market.orders
                for price in new_cancel_prices if order.price == price and order.owner_id == state.acting_as.user_id
            ]

            bids = [
                ClientMessage(
                    create_order=CreateOrder(
                        market_id=market_id,
                        price=bid_price,
                        size=size,
                        side=Side.BID,
                    )
                )
                for bid_price in new_bid_prices
            ]
            offers = [
                ClientMessage(
                    create_order=CreateOrder(
                        market_id=market_id,
                        price=offer_price,
                        size=size,
                        side=Side.OFFER,
                    )
                )
                for offer_price in new_offer_prices
            ]
            cancels = [
                ClientMessage(
                    cancel_order=CancelOrder(
                        id=id
                    )
                ) for id in new_cancel_ids
            ]
            logger.info(f"Market {market_id} placing {len(bids)} bids, {len(offers)} offers, and {len(cancels)} cancels")
            if len(bids+offers+cancels) > 0:
                try:
                    client.request_many(bids + offers + cancels)
                except RequestFailed:
                    traceback.print_exc()
                    print(f"Market {market_id} continuing...")
            
            local_fair_diff = local_fair_diff * 0.97
            market_states[market_id]["local_fair_diff"] = local_fair_diff
            market_states[market_id]["last_position"] = current_position

        step_market(sum_id, sum_fair)
        step_market(avg_id, avg_fair)
        step_market(diff_id, diff_fair)
        step_market(a_id, a_fair)
        step_market(b_id, b_fair)
        step_market(c_id, c_fair)
        step_market(d_id, d_fair)
        for i, fair in zip(a_ids_other, a_fairs):
            step_market(i, fair)
        for i, fair in zip(b_ids_other, b_fairs):
            step_market(i, fair)
        for i, fair in zip(c_ids_other, c_fairs):
            step_market(i, fair)
        for i, fair in zip(d_ids_other, d_fairs):
            step_market(i, fair)

if __name__ == "__main__":
    app()
