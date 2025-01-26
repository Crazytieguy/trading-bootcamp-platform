from price_utils import MarketPrices, bcolors
from pydantic import BaseModel

class PComponent(BaseModel):
    weight: float
    id: int
    name: str
    
    @classmethod 
    def from_name(cls, client, name: str, weight: float):
        return cls(
            weight=weight,
            id=client.state().market_name_to_id.get(name),
            name=name
        )

def arbitrage_etf(portfolio:list[MarketPrices], etf_name:str, max_size:float=1.0):

    etf_prices = MarketPrices.from_client(client, etf_name)

    denovo_etf_components = [
                MarketPrices.from_client(client, component.name) * component.weight 
                for component in portfolio]

    denovo_etf_sum = sum(denovo_etf_components, 
        start = MarketPrices(offer=0, bid=0, offer_size=float("inf"), bid_size=float("inf"), id=0, name=""))

    if etf_prices.bid > denovo_etf_sum.offer:
        size = min([max_size, etf_prices.bid_size, denovo_etf_sum.offer_size])   # check for the size of the trad
        # buy raw components and sell ETF
        side = Side.BUY

        for market, prices in zip(portfolio, denovo_etf_components):
            market_id = market.id
            price = prices.bid / market.weight
            size = size / market.weight
            print(bcolors.OKGREEN + f"buy {market.name} at {price}" + bcolors.ENDC)
            client.create_order(
                    market_id=market_id,
                    side=side,
                    size=size,
                    price=price,
            )
        # sell ETF
        print(bcolors.RED + f"sell {etf_prices.name} at {etf_prices.bid}" + bcolors.ENDC)
        client.create_order(
                    market_id=etf_prices.id,
                    side=Side.OFFER,
                    size=size,
                    price=etf_prices.bid,
            )
    elif etf_prices.offer < denovo_etf_sum.bid:
        # 
        size = min([max_size, denovo_etf_sum.bid_size, etf_prices.offer_size])
        # buy ETF and sell raw components
        
        # buy ETF
        print(f"buy {etf_prices.name} at {etf_prices.offer}")
        client.create_order(
            market_id=etf_prices.id,
            side=side.BID,
            size=size,
            price=etf_prices.offer,
        )
        # sell components
        for market, prices in zip(portfolio, denovo_etf_components):
            market_id = market.id
            price = prices.offer / market.weight
            size = size / market.weight
            print(f"sell {market.name} at {price}")
            client.create_order(
                market_id=market_id,
                side=Side.OFFER,
                size=size,
                price=price,
            )
    else:
        print("No arbitrage opportunity")

if __name__ == '__main__':
    from dotenv import load_dotenv, dotenv_values
    from metagame import TradingClient
    from metagame.websocket_api import CancelOrder, ClientMessage, CreateOrder, Side
    import os

    env = dotenv_values()

    client = TradingClient(
        api_url=env["API_URL"],
        jwt=env["JWT"],
        act_as=int(env["ACT_AS"]),
    )
    portfolio = [PComponent.from_name(client, name="test_mix_max", weight=2), 
                PComponent.from_name(client, name="Will any team go bankrupt via a rogue bot?", weight=1), 
                PComponent.from_name(client, name="Will any team go bankrupt via a rogue bot?", weight=1)]
    etf_name = "Will any team go bankrupt via a rogue bot?"

    arbitrage_etf(portfolio, etf_name)
