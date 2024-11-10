
import logging
import math
import random
import time
from datetime import datetime
from time import sleep
from typing import List

import typer
from trading_client import TradingClient, RequestFailed
from typing_extensions import Annotated
from websocket_api import ClientMessage, CreateOrder, Side

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = typer.Typer(pretty_exceptions_show_locals=False)

@app.command()
def main(
    jwt: Annotated[str, typer.Option(envvar="JWT")],
    api_url: Annotated[str, typer.Option(envvar="API_URL")],
    act_as: Annotated[str, typer.Option(envvar="ACT_AS")],
    market_id: int,
    tw_start_time: str,
    rolls: str,
    my_round_index: int,
    size: float = 1.0,
    minutes_per_round: float = 10.0,
    max_informed_trade_size: float = 1.0,
    trade_prob: float = 0.5,
):
    with TradingClient(api_url, jwt, act_as) as client:
        informed_taker_bot(
            client,
            market_id=market_id,
            tw_start_time=tw_start_time,
            rolls=rolls,
            my_round_index=my_round_index,
            size=size,
            minutes_per_round=minutes_per_round,
            max_informed_trade_size=max_informed_trade_size,
            trade_prob=trade_prob,
        )

def informed_taker_bot(
    client: TradingClient,
    *,
    market_id: int,
    tw_start_time: str,
    all_rolls: str,
    my_index: int,
    my_round_index: int,
    size: float,
    minutes_per_round: float,
    max_informed_trade_size: float,
    trade_prob: float,
):
    logger.info(f"Starting informed taker bot for market {market_id} with rolls {all_rolls}")

    rolls = [int(roll) for roll in all_rolls.split(",")]
    tw_start_dt = datetime.strptime(tw_start_time, '%H:%M:%S')
    now = datetime.now()
    tw_start_dt = tw_start_dt.replace(year=now.year, month=now.month, day=now.day)
    tw_start_timestamp = tw_start_dt.timestamp()
    logger.info(f"Trade wars start time: {tw_start_timestamp}. In PST: {tw_start_timestamp - 7*60*60}")

    while True:
        sleep(1)
        state = client.state()
        market = state.markets.get(market_id)
        if market is None:
            logger.info(f"No market data available for market {market_id}")
            continue

        # Determine current round and phase
        current_time = time.time()
        elapsed_time = current_time - tw_start_timestamp
        current_round = int(elapsed_time / (minutes_per_round * 60))
        minutes_left_in_round = max(0, ((current_round + 1) * minutes_per_round * 60 + tw_start_timestamp - current_time)/60)
        is_my_round = current_round % 3 == my_round_index
        is_after_my_round = current_round % 3 > my_round_index
        is_my_phase = minutes_left_in_round > minutes_per_round / 2

        logger.info(f"tw_start_time: {tw_start_dt.strftime('%Y-%m-%d %H:%M:%S')}, current time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        logger.info(f"In round {current_round}, my round {my_round_index}, phase {'2' if is_my_phase else '1'}. Time left in round: {minutes_left_in_round:.2f}.")

        if current_round < len(rolls):
            true_fair = sum(rolls[:current_round % 3 + 1]) + 10.5 * (2 - current_round % 3)
        else:
            true_fair = sum(rolls) + 10.5 * (2 - (len(rolls) - 1))

        if (is_my_round and is_my_phase) or is_after_my_round:
            logger.info(f"True fair: {true_fair}.")
            should_i_trade = random.random() < trade_prob
            if not should_i_trade:
                continue

            best_bid = max(
                (order.price for order in market.orders if order.side == Side.BID),
                default=market.min_settlement
            )
            best_offer = min(
                (order.price for order in market.orders if order.side == Side.OFFER),
                default=market.max_settlement
            )
            logger.info(f"Current best bid: {best_bid}, best offer: {best_offer}")

            size_to_trade = min(abs(true_fair - ((best_bid + best_offer)/2)) * size, max_informed_trade_size)
            if size_to_trade < 0.01:
                continue

            if true_fair > best_offer:
                price = best_offer
                side = Side.BID
                logger.info(f"True fair is higher than best offer. Placing buy order at {price}")
            elif true_fair < best_bid:
                price = best_bid
                side = Side.OFFER
                logger.info(f"True fair is lower than best bid. Placing sell order at {price}")
            else:
                continue  # Fair price is within bid-ask spread; skip trading

            try:
                client.request(
                    ClientMessage(
                        create_order=CreateOrder(
                            market_id=market_id,
                            price=price,
                            size=size_to_trade,
                            side=side,
                        )
                    )
                )
                logger.info(f"Order placed: side={side}, price={price}, size={size_to_trade}")
                client.out(market_id)  # Cancel outstanding orders after trade
            except RequestFailed as e:
                logger.error(f"Order failed: {e}")

            # Exit after one trade
            break

if __name__ == "__main__":
    app()

