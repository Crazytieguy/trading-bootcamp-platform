import logging
from time import sleep
from typing import Annotated, Optional, Callable, List
import typer
from dotenv import load_dotenv
from metagame import TradingClient
from metagame.websocket_api import CancelOrder, ClientMessage, CreateOrder, Side
from arb_bot import arb_bot  # Import the latest arb_bot implementation

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
    max_size: float = typer.Option(0.01, help="Maximum order size factor")
):
    act_as = 104
    with TradingClient(api_url, jwt, act_as) as client:
        state = client.state()
        market_tuples = [
            (state.market_name_to_id["golf_tw"], 3),
            (state.market_name_to_id["hotel_tw"], 2),
            (state.market_name_to_id["india_tw"], 1),
        ]
        etf_tuples = [(state.market_name_to_id["ghi_tw"], 1)]

        def exchange_formula(m_prices, e_prices) -> float:
            s1 = sum(
                m * ratio
                for m, ratio in zip(m_prices, [ratio for _, ratio in market_tuples])
            )
            s2 = sum(
                e * ratio
                for e, ratio in zip(e_prices, [ratio for _, ratio in etf_tuples])
            )
            return s1 - s2

        try:
            arb_bot(
                client,
                market_tuples=market_tuples,
                etf_tuples=etf_tuples,
                expected_profit_for_exchange=exchange_formula,
                loop_interval=loop_interval,
                max_size=max_size
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


if __name__ == "__main__":
    app()
