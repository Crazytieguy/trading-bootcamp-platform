import logging
from time import sleep
from typing import Annotated, Optional

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
    market_name: str,
    fair_price: float,
    size: float = 0.05,
    position_cap: float = 0.5,
    prior: Optional[float] = None,
):
    with TradingClient(api_url, jwt, act_as) as client:
        try:
            penny_bot(
                client,
                market_name=market_name,
                fair_price=fair_price,
                size=size,
                position_cap=position_cap,
                prior=prior,
            )
        except:
            market_id = client.state().market_name_to_id[market_name]
            client.out(market_id)
            raise
        finally:
            client.out(market_id)


def penny_bot(
    client: TradingClient,
    *,
    market_name: str,
    size: float,
    fair_price: float,
    position_cap: float,
    prior: Optional[float] = None,
) -> None:
    market_id = client.state().market_name_to_id[market_name]
    logger.info(f"Starting penny bot for market {market_name}")

    while True:
        sleep(1)
        state = client.state()
        market = state.markets.get(market_id)

        if market is None:
            logger.info(f"No market data available for market {market_name}")
            raise ValueError(f"No market data available for {market_name}")

        if market is None:
            logger.info(f"No market data available for market {market_id}")
            return

        current_position = next(
            (
                exp.position
                for exp in state.portfolio.market_exposures
                if exp.market_id == market_id
            ),
            0,
        )
        logger.info(f"Current position: {current_position}")

        our_bids = [bid.price for bid in market.bids if bid.owner_id == state.acting_as]
        our_offers = [
            offer.price for offer in market.offers if offer.owner_id == state.acting_as
        ]
        our_best_bid = max(our_bids + [market.definition.min_settlement])
        our_best_offer = min(our_offers + [market.definition.max_settlement])
        other_bids = [
            bid.price for bid in market.bids if bid.owner_id != state.acting_as
        ]
        other_offers = [
            offer.price for offer in market.offers if offer.owner_id != state.acting_as
        ]
        other_best_bid = (
            other_bids[0] if other_bids else market.definition.min_settlement
        )
        other_best_offer = (
            other_offers[0] if other_offers else market.definition.max_settlement
        )
        epsilon = 0.01
        make_bid = our_best_bid < other_best_bid
        make_offer = our_best_offer > other_best_offer
        logger.info(f"make bid? {make_bid} // make offer? {make_offer}")

        bid_price = min(other_best_bid + epsilon, fair_price - epsilon)
        offer_price = max(other_best_offer - epsilon, fair_price + epsilon)

        logger.info(f"bid price: {bid_price} // offer price: {offer_price}")

        position_addition = make_bid * size
        position_subtraction = make_offer * size
        max_position = (
            current_position
            + sum([bid.size for bid in market.bids if bid.owner_id == state.acting_as])
            + position_addition
        )
        min_position = (
            current_position
            - sum(
                [
                    offer.size
                    for offer in market.offers
                    if offer.owner_id == state.acting_as
                ]
            )
            - position_subtraction
        )
        logger.info(f"max position: {max_position} // min position: {min_position}")

        new_cancel_ids = []
        # sort bids in reverse order by price
        reverse_sorted_bids = sorted(market.bids, key=lambda x: x.price, reverse=True)
        if make_bid:
            for bid in reverse_sorted_bids:
                if (
                    bid.owner_id == state.acting_as
                    and bid.price < bid_price
                    and max_position > position_cap
                ):
                    new_cancel_ids.append(bid.id)
                    max_position -= bid.size

        # sort offers in order by price
        sorted_offers = sorted(market.offers, key=lambda x: x.price)
        if make_offer:
            for offer in sorted_offers:
                if (
                    offer.owner_id == state.acting_as
                    and offer.price > offer_price
                    and min_position < -position_cap
                ):
                    new_cancel_ids.append(offer.id)
                    min_position += offer.size

        bid = ClientMessage(
            create_order=CreateOrder(
                market_id=market_id,
                price=bid_price,
                size=size,
                side=Side.BID,
            )
        )

        offer = ClientMessage(
            create_order=CreateOrder(
                market_id=market_id,
                price=offer_price,
                size=size,
                side=Side.OFFER,
            )
        )
        cancels = [
            ClientMessage(cancel_order=CancelOrder(id=id)) for id in new_cancel_ids
        ]
        logger.info(f"Placing and cancelling orders")
        requests = []
        if make_bid:
            requests.append(bid)
        if make_offer:
            requests.append(offer)
        if new_cancel_ids:
            requests.extend(cancels)
        client.request_many(requests)


if __name__ == "__main__":
    app()
