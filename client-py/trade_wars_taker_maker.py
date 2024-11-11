import logging
import math
import random
from time import sleep
import time
from datetime import datetime
import traceback
from typing import Optional

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
    act_as_mm: Annotated[str, typer.Option(..., envvar="ACT_AS_MM")],
    act_as_it: Annotated[str, typer.Option(..., envvar="ACT_AS_IT")],
    market_id: int,
    tw_start_time: str,
    rolls: str,
    my_round_index: int,
    spread: float = 1.0,
    size: float = 1.0,
    fade_per_order: Optional[float] = None,
    fade: Optional[float] = None,
    depth_fade_per_order: Optional[float] = None,
    temp_fade: float = 0.0,
    temp_fade_half_life: float = 10.0,
    depth: int = 5,
    prior: Optional[float] = None,
    minutes_per_round: float = 10.0,
    max_informed_trade_size: float = 1.0,
    trade_prob: float = 0.5,
):
    if fade_per_order is not None:
        assert fade is None
    elif fade is not None:
        assert fade_per_order is None
        fade_per_order = fade * size
    with TradingClient(api_url, jwt, act_as_mm) as client_mm, \
         TradingClient(api_url, jwt, act_as_it) as client_it:
        trade_wars_bots(
            client_mm=client_mm,
            client_it=client_it,
            market_id=market_id,
            spread=spread,
            size=size,
            fade_per_order=fade_per_order,
            depth_fade_per_order=depth_fade_per_order,
            temp_fade=temp_fade,
            temp_fade_half_life=temp_fade_half_life,
            depth=depth,
            prior=prior,
            tw_start_time=tw_start_time,
            rolls=rolls,
            my_round_index=my_round_index,
            minutes_per_round=minutes_per_round,
            max_informed_trade_size=max_informed_trade_size,
            trade_prob=trade_prob,
        )


def trade_wars_bots(
    client_mm: TradingClient,
    client_it: TradingClient,
    *,
    market_id: int,
    spread: float,
    size: float,
    fade_per_order: float,
    depth_fade_per_order: Optional[float],
    temp_fade: float,
    temp_fade_half_life: float,
    depth: int,
    prior: Optional[float] = None,
    tw_start_time: str,
    rolls: str,
    my_round_index: int,
    minutes_per_round: float = 10,
    max_informed_trade_size: float,
    trade_prob: float = 0.5,
) -> None:
    assert len(rolls.split(",")) == 3
    assert my_round_index in range(3)

    fade = fade_per_order / size
    if depth_fade_per_order is None:
        depth_fade_per_order = fade_per_order
    
    def clamp(value: float):
            assert market is not None
            return round(
                max(
                    market.min_settlement,
                    min(market.max_settlement, value),
                ),
                2,
            )
    
    # Clear out any existing orders
    client_mm.out(market_id)
    client_it.out(market_id)
    logger.info(f"Starting market maker and informed taker bots for market {market_id}")

    temp_fade_sell = 0
    temp_fade_buy = 0
    temp_fade_decay_per_second = math.pow(0.5, 1/temp_fade_half_life)
    logger.info(f"Temp fade is being multiplied by {temp_fade_decay_per_second} every second")

    last_position = None

    rolls = [int(roll) for roll in rolls.split(",")]
    tw_start_dt = datetime.strptime(tw_start_time, '%H:%M:%S')
    now = datetime.now()
    tw_start_dt = tw_start_dt.replace(year=now.year, month=now.month, day=now.day)
    tw_start_time = tw_start_dt.timestamp()
    logger.info(f"Trade wars start time: {tw_start_time}. In PST: {tw_start_time - 7*60*60}")


    while True:
        sleep(1)

        state_mm = client_mm.state()
        state_it = client_it.state()
        market = state_mm.markets.get(market_id)
        if market is None:
            logger.info(f"No market data available for market {market_id}")
            continue

        if prior is None:
            prior = (market.max_settlement + market.min_settlement) / 2

        current_position = next(
            (
                exp.position
                for exp in state_mm.portfolio.market_exposures
                if exp.market_id == market_id
            ),
            0,
        )
        logger.info(f"Current position: {current_position}")

        our_bids = [
            order.price
            for order in market.orders
            if order.side == Side.BID and order.owner_id == state_mm.acting_as.user_id
        ]
        our_offers = [
            order.price
            for order in market.orders
            if order.side == Side.OFFER and order.owner_id == state_mm.acting_as.user_id
        ]

        our_best_bid = max(our_bids + [market.min_settlement])
        our_best_offer = min(our_offers + [market.max_settlement])

        print(f"Current position per size: {round(current_position / (size))}")
        fair_price = prior - round(current_position / (size * (depth_fade_per_order/fade_per_order))) * depth_fade_per_order
        if last_position is None:
            last_position = current_position
        d_position = current_position - last_position
        if last_position > current_position:
            logger.info(f"Sold {-d_position}!")
            temp_fade_sell += temp_fade * -(d_position/size*depth_fade_per_order)
        elif last_position < current_position:
            logger.info(f"Bought {d_position}!")
            temp_fade_buy += temp_fade * (d_position/size*depth_fade_per_order)
        last_position = current_position
        logger.info(f"Current fair: {fair_price}")


        temp_fade_buy *= temp_fade_decay_per_second
        temp_fade_sell *= temp_fade_decay_per_second
        if temp_fade_buy < 0.1 * temp_fade:
            temp_fade_buy = 0
        if temp_fade_sell < 0.1 * temp_fade:
            temp_fade_sell = 0
        logger.info(f"Temp fades: {temp_fade_buy}:{temp_fade_sell}")


        our_desired_best_bid = clamp(fair_price - spread / 2 - temp_fade_buy)
        our_desired_best_offer = clamp(fair_price + spread / 2 + temp_fade_sell)
        
        logger.info(f"Current spread: {our_best_bid}@{our_best_offer} Goal spread: {our_desired_best_bid}@{our_desired_best_offer}")
        #if our_best_bid == our_desired_best_bid and our_best_offer == our_desired_best_offer:
        #    continue

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
            for price in new_cancel_prices if order.price == price and order.owner_id == state_mm.acting_as.user_id
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
        logger.info(f"Placing {len(bids)} bids, {len(offers)} offers, and {len(cancels)} cancels")
        if len(bids+offers+cancels) > 0:
            try:
                client_mm.request_many(bids + offers + cancels)
            except RequestFailed: 
                traceback.print_exc()
                print("Continuing...")
        
        # Informed taker functionality
        # Start Generation Here
        print(f"tw_start_time: {tw_start_dt.strftime('%Y-%m-%d %H:%M:%S')}, current time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        current_round = int((time.time() - tw_start_time) / (minutes_per_round * 60))
        minutes_left_in_round = max(0,  ((current_round+1) * minutes_per_round * 60 + tw_start_time - time.time())/60)
        print(f"Minutes left in round: {minutes_left_in_round:.2f}.")
        is_my_round = current_round // 3 == my_round_index
        is_after_my_round = current_round // 3 > my_round_index
        is_my_phase = minutes_left_in_round < minutes_per_round / 2
        true_fair = sum(rolls[:current_round%3+1]) + 10.5 * (2-current_round%3)
        print(f"In round {current_round}, my round {my_round_index}, phase {2 if is_my_phase else 1}. Time left in round: {minutes_left_in_round:.2f}.")
        if (is_my_round and is_my_phase) or is_after_my_round:
            print(f"True fair: {true_fair}. Maker fair: {fair_price}. Closing the gap {true_fair-fair_price} by trading {fade*(true_fair-fair_price)}")
            should_i_trade = random.random() < trade_prob
            if not should_i_trade:
                continue
            size_to_trade = min(abs(true_fair-fair_price) * fade, max_informed_trade_size)
            print(f"Trading {size_to_trade}...")
            if size_to_trade < 0.01:
                continue
            should_buy = true_fair > fair_price
            if should_buy:
                side = Side.BID
                price = market.max_settlement
            else:
                side = Side.OFFER
                price = market.min_settlement
            
            client_it.create_order(market_id=market_id, side=side, size=size_to_trade, price=price)
            client_it.out(market_id)



    size_per_second = total_size / max_time
    size_traded = 0
    
    total_seconds = random.uniform(0, max_time)
    total_size_to_trade = total_size * total_seconds / max_time
    print(f"TRADING FOR TOTAL SECONDS: {total_seconds:.2f}")
    print(f"TRADING FOR ~{total_size*max_time/total_seconds:.2f} SIZE TOTAL")

    should_buy = random.random() >= 0.5
    print("Starting main loop...")
    start_time = time.time()
    last_start_time = start_time
    next_size = 0
    while True:
        sleep(max(0, 1 - (time.time() - last_start_time)))
        last_start_time = time.time()
        print(f"Trying trade at {(time.time()-start_time):.2f}. So far traded {size_traded:.2f}/{total_size_to_trade:.2f}.")
        next_size += size_per_second

        if size_traded+0.01 >= total_size_to_trade:
            return
        
        next_size = round(min(next_size, total_size_to_trade - size_traded), 2)
            
        if random.random() >= (1 / seconds_per_trade):
            continue

        print(f"Doing trade for {next_size:.2f}.")
            
        state = client.state()
        market = state.markets.get(market_id)
        if not market or not market.orders:
            logger.info(f"No market data available for market {market_id}")
            continue

        if should_buy:
            side = Side.BID
            orders = [order for order in market.orders if order.side == Side.OFFER]
            if not orders:
                logger.info(f"No offers available for market {market_id}")
                continue
            best_order = min(orders, key=lambda x: x.price)
            price = best_order.price + next_size * expected_depth_fade
        else:
            side = Side.OFFER
            orders = [order for order in market.orders if order.side == Side.BID]
            if not orders:
                logger.info(f"No bids available for market {market_id}")
                continue
            best_order = max(orders, key=lambda x: x.price)
            price = best_order.price - next_size * expected_depth_fade

        logger.info(
            f"Market {market_id}: Placing {'BID' if should_buy else 'OFFER'} order, size {next_size}, price {price}"
        )

        client.create_order(
            market_id=market_id,
            side=side,
            size=next_size,
            price=price,
        )
        size_traded += next_size
        client.out(market_id)
        
        # Sleep for remaining time to make total iteration ~1 second

if __name__ == "__main__":
    app()



        
        


if __name__ == "__main__":
    app()
