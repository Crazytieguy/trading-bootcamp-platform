import logging
import time
from time import sleep
import json
import math

import typer
from dotenv import load_dotenv
from trading_client import TradingClient
from typing_extensions import Annotated
from websocket_api import Side
from typing import List, Dict

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

app = typer.Typer(pretty_exceptions_show_locals=False)


@app.command()
def main(
    jwt: Annotated[str, typer.Option(envvar="JWT")],
    api_url: Annotated[str, typer.Option(envvar="API_URL")],
    act_as: Annotated[str, typer.Option(envvar="ACT_AS")],
    market_ids: Annotated[str, typer.Argument(..., help="List of market IDs")],
    dice: str,
    round_index: int,
    seconds_per_trade: float = 1.0,
    expected_depth_fade: float = 5.0,
    mm_size: float = 1.0,
):
    """
    Adjust positions to reach target positions by trading in specified markets.
    """
    market_ids = list(map(int, market_ids.split(',')))
    lut = list(reversed([[1.0, 1.85824, 2.58618, 3.19988, 3.71055, 4.12667, 4.47509, 4.75137, 4.96122, 5.11972, 5.26453, 5.36173, 5.42748, 5.46477, 5.49347, 5.49933, 5.49302, 5.51903, 5.51275, 5.50701], [5.50521, 5.65153, 5.88663, 6.2073, 6.59724, 7.01591, 7.45198, 7.91069, 8.3375, 8.74883, 9.13524, 9.45899, 9.74907, 9.98915, 10.17181, 10.30362, 10.40761, 10.47873, 10.49721, 10.48037], [10.48975, 10.508, 10.53252, 10.57653, 10.69057, 10.80105, 11.01717, 11.26262, 11.54845, 11.87821, 12.27592, 12.67083, 13.08069, 13.55165, 13.97779, 14.39761, 14.78155, 15.1149, 15.34968, 15.48178], [15.46659, 15.48133, 15.47499, 15.46729, 15.50071, 15.50341, 15.5655, 15.60842, 15.65545, 15.75491, 15.88135, 16.03597, 16.23895, 16.54007, 16.86561, 17.28698, 17.79536, 18.41441, 19.14312, 20.0]]))

    dice = eval(dice)
    a_dice = [sorted(x)[0] for x in dice[:round_index+1]]
    b_dice = [sorted(x)[1] for x in dice[:round_index+1]]
    c_dice = [sorted(x)[2] for x in dice[:round_index+1]]
    d_dice = [sorted(x)[3] for x in dice[:round_index+1]]
    a_surprise = sum([lut[0][x-1] - 16.5 for x in a_dice])
    b_surprise = sum([lut[1][x-1] - 12.5 for x in b_dice])
    c_surprise = sum([lut[2][x-1] - (21 - 12.5) for x in c_dice])
    d_surprise = sum([lut[3][x-1] - (21 - 16.5) for x in d_dice])
    target_a_pos = a_surprise * mm_size * 10
    target_b_pos = b_surprise * mm_size * 10
    target_c_pos = c_surprise * mm_size * 10
    target_d_pos = d_surprise * mm_size * 10

    # Read positions from JSON files
    positions_files = ['pos_1.json', 'pos_2.json', 'pos_3.json', 'pos_4.json']
    positions = []

    for file in positions_files:
        with open(file, 'r') as f:
            pos = json.load(f)
            positions.append(pos)

    # Sum total positions
    total_positions = {'a_pos': 0, 'b_pos': 0, 'c_pos': 0, 'd_pos': 0}
    for pos in positions:
        for key in total_positions:
            total_positions[key] += pos.get(key, 0)

    # Compute required positions
    targets = {
        'a_pos': target_a_pos,
        'b_pos': target_b_pos,
        'c_pos': target_c_pos,
        'd_pos': target_d_pos,
    }

    required_positions = {}
    for key in targets:
        required_positions[key] = targets[key] - total_positions[key]

    # Map positions to market IDs
    if len(market_ids) != 19:
        logger.error("Please provide exactly 19 market IDs.")
        return
    
    
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

    markets = {
        'a_pos': a_id,
        'b_pos': b_id,
        'c_pos': c_id,
        'd_pos': d_id,
    }

    with TradingClient(api_url, jwt, act_as) as client:
        adjust_positions(
            client=client,
            markets=markets,
            required_positions=required_positions,
            seconds_per_trade=seconds_per_trade,
            expected_depth_fade=expected_depth_fade,
        )


def adjust_positions(
    client: TradingClient,
    markets: Dict[str, int],
    required_positions: Dict[str, float],
    seconds_per_trade: float,
    expected_depth_fade: float,
):
    
    while True:
        all_positions_reached = True
        state = client.state()
        for pos_name, market_id in markets.items():
            market = state.markets.get(market_id)
            def clamp(value: float):
                assert market is not None
                return round(
                    max(
                        market.min_settlement,
                        min(market.max_settlement, value),
                    ),
                    2,
                )
            if not market or not market.orders:
                logger.info(f"No market data available for market {market_id}")
                continue

            # Get our current position in this market
            current_position = next(
                (
                    exp.position
                    for exp in state.portfolio.market_exposures
                    if exp.market_id == market_id
                ),
                0,
            )

            # Compute required change
            required_change = required_positions[pos_name] - current_position

            logger.info(f"Market {market_id}: Current position {current_position}, Required position {required_positions[pos_name]}, Required change {required_change}")

            if abs(required_change) < 0.01:
                logger.info(f"Market {market_id}: Position reached")
                continue

            all_positions_reached = False

            # Determine side to trade
            if required_change > 0:
                side = Side.BID
                orders = [order for order in market.orders if order.side == Side.OFFER]
                if not orders:
                    logger.info(f"No offers available for market {market_id}")
                    continue
                best_order = min(orders, key=lambda x: x.price)
                price = best_order.price + abs(required_change) * expected_depth_fade
            else:
                side = Side.OFFER
                orders = [order for order in market.orders if order.side == Side.BID]
                if not orders:
                    logger.info(f"No bids available for market {market_id}")
                    continue
                best_order = max(orders, key=lambda x: x.price)
                price = best_order.price - abs(required_change) * expected_depth_fade

            price = clamp(price)

            # Determine size to trade (capped at 0.01 for example)
            trade_size = min(abs(required_change), 0.01)

            logger.info(
                f"Market {market_id}: Placing {'BID' if side == Side.BID else 'OFFER'} order, size {trade_size}, price {price}"
            )

            client.create_order(
                market_id=market_id,
                side=side,
                size=trade_size,
                price=price,
            )

        if all_positions_reached:
            logger.info("All positions reached")
            break

        sleep(seconds_per_trade)


if __name__ == "__main__":
    app()
