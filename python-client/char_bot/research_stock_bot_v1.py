import logging

from metagame import TradingClient
from metagame.websocket_api import Side
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def research_bot_v1(
    client: TradingClient,
    *,
    market_name: str,
    price_up: str,
    price_down: str,
    size: float = 0.1,
    test: bool = True,
):
    logger.info(f"Inside bot!")
    logger.info(f"Market name: {market_name}")
    logger.info(f"Price down action: {price_down}")
    logger.info(f"Price up action: {price_up}")

    
        