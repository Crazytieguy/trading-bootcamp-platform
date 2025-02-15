from datetime import datetime
import logging
import math
import random
from time import sleep
import time
import traceback
from typing import Optional, List, Dict

import json

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
    dice: str,
    name: str,
    tw_start_time: str,
    round_time: float=12*60,
    mm_size: float=1,
):

    with TradingClient(api_url, jwt, act_as) as client:
        run_market_makers(
            client,
            market_ids=list(map(int, market_ids.split(","))),
            dice=eval(dice),
            tw_start_time=tw_start_time,
            round_time=round_time,
            mm_size=mm_size,
            name=name,
        )

def run_market_makers(
    client: TradingClient,
    *,
    market_ids: List[int],
    dice: List[int],
    tw_start_time: str,
    round_time: float=12*60,
    mm_size: float=1,
    name: str="noname",
) -> None:
    tw_start_dt = datetime.strptime(tw_start_time, '%H:%M:%S')
    now = datetime.now()
    tw_start_dt = tw_start_dt.replace(year=now.year, month=now.month, day=now.day)
    tw_start_time = tw_start_dt.timestamp()
    logger.info(f"Trade wars start time: {tw_start_time}. In PST: {tw_start_time - 7*60*60}") 
    lut = [[1.0, 1.85824, 2.58618, 3.19988, 3.71055, 4.12667, 4.47509, 4.75137, 4.96122, 5.11972, 5.26453, 5.36173, 5.42748, 5.46477, 5.49347, 5.49933, 5.49302, 5.51903, 5.51275, 5.50701], [5.50521, 5.65153, 5.88663, 6.2073, 6.59724, 7.01591, 7.45198, 7.91069, 8.3375, 8.74883, 9.13524, 9.45899, 9.74907, 9.98915, 10.17181, 10.30362, 10.40761, 10.47873, 10.49721, 10.48037], [10.48975, 10.508, 10.53252, 10.57653, 10.69057, 10.80105, 11.01717, 11.26262, 11.54845, 11.87821, 12.27592, 12.67083, 13.08069, 13.55165, 13.97779, 14.39761, 14.78155, 15.1149, 15.34968, 15.48178], [15.46659, 15.48133, 15.47499, 15.46729, 15.50071, 15.50341, 15.5655, 15.60842, 15.65545, 15.75491, 15.88135, 16.03597, 16.23895, 16.54007, 16.86561, 17.28698, 17.79536, 18.41441, 19.14312, 20.0]]
    
    a_prior = 16.5
    b_prior = 12.5
    c_prior = 20 - b_prior
    d_prior = 20 - a_prior

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

    appetites = [0, 0, 0, 0]
    has_traded = [0,0,0,0]
    while True:
        sleep(1)
        state = client.state()
        
        def position_in_market(market_id: int):
            return next(
                (exp.position for exp in state.portfolio.market_exposures if exp.market_id == market_id),
                0,
            )

        # Save positions to file
        positions = {
            'a_pos': position_in_market(a_id),
            'b_pos': position_in_market(b_id), 
            'c_pos': position_in_market(c_id),
            'd_pos': position_in_market(d_id)
        }
        with open(f"{name}", "w") as f:
            json.dump(positions, f, indent=2)

        now = time.time()
        if now < tw_start_time or now > tw_start_time + round_time*9:
            continue
        
        round_index = int((now - tw_start_time) / round_time)
        time_in_round = now - tw_start_time - round_index * round_time
        if time_in_round < round_time / 2:
            appetites = [0, 0, 0, 0]
            has_traded = [0,0,0,0]
            continue

        my_roll = dice[round_index]
        ev = list(reversed([lut[i][my_roll-1] for i in range(4)]))

        
        my_ids = [a_id, b_id, c_id, d_id]
        my_priors = [a_prior, b_prior, c_prior, d_prior]
        
        logger.info(f"Round {round_index} of 9. My roll: {my_roll}. Expected values: {ev}. Surprises: {[(ev[i] - my_priors[i]) for i in range(4)]}")
        
        to_trades = [(ev[i] - my_priors[i]) * mm_size*10 for i in range(4)]
        print("Trying to trade", to_trades)
        to_trades = [to_trades[i] - has_traded[i] for i in range(4)]
        print("After trades so far", to_trades)
        
        if random.random() < 0.1:
            appetites = [appetites[i] + mm_size for i in range(4)]
        
        for i in range(4):
            if to_trades[i] > 0:
                logger.info(f"Want to buy {to_trades[i]} of {my_ids[i]}")
            else:
                logger.info(f"Want to sell {-to_trades[i]} of {my_ids[i]}")
            
            market = state.markets.get(my_ids[i])
            if market is None:
                logger.info(f"Market {my_ids[i]} not found")
                continue
            bids = [order for order in market.orders if order.side == Side.BID]
            offers = [order for order in market.orders if order.side == Side.OFFER]

            if not bids or not offers:
                logger.info(f"No bids or offers for market {my_ids[i]}")
                continue

            best_bid = max(bids, key=lambda x: x.price)
            best_offer = min(offers, key=lambda x: x.price)
            spread = best_offer.price - best_bid.price

            
            if to_trades[i] > 0:  # Need to buy
                size = min(abs(to_trades[i]), best_bid.size)
                if size > appetites[i]:
                    continue
                price = min(market.max_settlement, best_offer.price + 5)
                side = Side.BID
            elif to_trades[i] < 0:  # Need to sell
                size = min(abs(to_trades[i]), best_bid.size)
                if size > appetites[i]:
                    continue
                price = max(market.min_settlement, best_bid.price - 5) 
                side = Side.OFFER
                size = -size  # Make size negative for sells
            else:
                continue
            
            logger.info(
                f"Market {my_ids[i]}: Placing {side.name} order, spread {spread}, size {size}, price {price}"
            )

            client.create_order(
                market_id=my_ids[i],
                side=side,
                size=abs(size),
                price=price,
            )
            client.out(my_ids[i])
            has_traded[i] += size





        








if __name__ == "__main__":
    app()
