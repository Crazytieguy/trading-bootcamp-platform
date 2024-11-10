import logging
import random
import time
from time import sleep
import math

import typer
from dotenv import load_dotenv
from trading_client import TradingClient
from typing_extensions import Annotated
from websocket_api import Side

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

app = typer.Typer(pretty_exceptions_show_locals=False)


@app.command()
def main(
    jwt: Annotated[str, typer.Option(envvar="JWT")],
    api_url: Annotated[str, typer.Option(envvar="API_URL")],
    act_as: Annotated[str, typer.Option(envvar="ACT_AS")],
    market_id: int,
    total_size: float = 1.0,
    seconds_per_trade: float = 1.0,
    expected_depth_fade: float = 0.0,
    max_time: float = 1.0,
):
    """
    Note: If use_loss_falloff is wrong, the desired size function is changed such that the effective loss may be completely different from loss_per_trade.
          loss_per_trade should be interpreted as the loss-per-trade when the spread is 1 (*before* capping size at max_size).
          I've made a graph here: https://www.desmos.com/calculator/toylhnw4ia
          The right parameters to define for this are probably max_loss_per_trade, optimal_spread. Then we should be able to solve for loss_per_trade and max_size.
    """
    with TradingClient(api_url, jwt, act_as) as client:
        naive_bot(
            client,
            market_id=market_id,
            total_size=total_size,
            seconds_per_trade=seconds_per_trade,
            expected_depth_fade=expected_depth_fade,
            max_time=max_time,
        )

#@app.command()
#def quadratic(
#    jwt: Annotated[str, typer.Option(envvar="JWT")],
#    api_url: Annotated[str, typer.Option(envvar="API_URL")],
#    act_as: Annotated[str, typer.Option(envvar="ACT_AS")],
#    market_id: int,
#    max_loss_per_trade: float = 1.0,
#    optimal_spread: float = 1.0,
#    seconds_per_trade: float = 1.0,
#    ):
#    # uhh need to do this math
#    with TradingClient(api_url, jwt, act_as) as client:
#        naive_bot(
#            client,
#            market_id=market_id,
#            loss_per_trade=loss_per_trade,
#            max_size=max_size,
#            seconds_per_trade=seconds_per_trade,
#            use_quadratic=True
#        )


def naive_bot(
    client: TradingClient,
    *,
    market_id: int,
    total_size: float,
    seconds_per_trade: float,
    expected_depth_fade: float,
    max_time: float,
):
    client.out(market_id)

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
