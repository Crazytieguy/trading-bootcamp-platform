from flask import Flask, jsonify, request
from metagame import TradingClient
import os
from dotenv import load_dotenv
import logging
from functools import lru_cache

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Load environment variables
load_dotenv()  # This will still work but fall back to actual env vars in production

logger.info("Starting middleware application...")
logger.info(f"API_URL: {os.environ.get('API_URL')}")
logger.info("Attempting to connect to trading client...")

try:
    # Initialize the WebSocket client
    client = TradingClient(
        api_url=os.environ["API_URL"],
        jwt=os.environ["JWT"],
        act_as=int(os.environ["ACT_AS"]),
    )
    logger.info("Successfully connected to trading client")
except Exception as e:
    logger.error(f"Failed to connect to trading client: {e}")
    raise


# Cache client instances
@lru_cache(maxsize=100)
def get_cached_client(jwt: str, act_as: int) -> TradingClient:
    return TradingClient(api_url=os.environ["API_URL"], jwt=jwt, act_as=act_as)


def get_client_for_request():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return client  # fallback to default client

    try:
        jwt, act_as = auth_header.split("|")
        return get_cached_client(jwt, int(act_as))
    except Exception as e:
        logger.error(f"Error creating client: {e}")
        return client


# Add basic health check endpoint
@app.route("/", methods=["GET"])
def health_check():
    logger.info("Health check endpoint called")
    return jsonify(
        {
            "status": "healthy",
            "endpoints": [
                "/markets",
                "/market/<market_id>/trades",
                "/market/<market_id>/orders",
                "/portfolio",
            ],
        }
    )


@app.route("/markets", methods=["GET"])
def get_markets():
    state = client.state()
    markets = {
        id: {
            "name": market.definition.name,
            "description": market.definition.description,
            "min_settlement": market.definition.min_settlement,
            "max_settlement": market.definition.max_settlement,
        }
        for id, market in state.markets.items()
    }
    return jsonify(markets)


@app.route("/market/<int:market_id>/trades", methods=["GET"])
def get_market_trades(market_id):
    state = client.state()
    if not state.markets[market_id].hasFullTradeHistory:
        client.get_full_trade_history(market_id)
        state = client.state()

    trades = [
        {
            "id": trade.id,
            "market_id": trade.market_id,
            "transaction_id": trade.transaction_id,
            "price": trade.price,
            "size": trade.size,
            "buyer_id": trade.buyer_id,
            "seller_id": trade.seller_id,
        }
        for trade in state.markets[market_id].trades
    ]
    return jsonify(trades)


@app.route("/market/<int:market_id>/orders", methods=["GET"])
def get_market_orders(market_id):
    client = get_client_for_request()
    state = client.state()
    orders = [
        {
            "id": order.id,
            "market_id": order.market_id,
            "owner_id": order.owner_id
            if order.owner_id == state.acting_as
            else None,  # to do: show owner if we're not hiding ids
            "self_id": state.user_id,
            "acting_as": state.acting_as,
            "transaction_id": order.transaction_id,
            "price": order.price,
            "size": order.size,
            "side": order.side,
            "sizes": [
                {"transaction_id": size.transaction_id, "size": size.size}
                for size in order.sizes
            ],
        }
        for order in state.markets[market_id].orders
    ]
    return jsonify(orders)


@app.route("/portfolio", methods=["GET"])
def get_portfolio():
    client = get_client_for_request()
    state = client.state()
    if state.portfolio:
        return jsonify(
            {
                "total_balance": state.portfolio.total_balance,
                "available_balance": state.portfolio.available_balance,
                "market_exposures": [
                    {
                        "market_id": exposure.market_id,
                        "position": exposure.position,
                        "total_bid_size": exposure.total_bid_size,
                        "total_offer_size": exposure.total_offer_size,
                    }
                    for exposure in (state.portfolio.market_exposures or [])
                ],
            }
        )
    return jsonify({})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    logger.info(f"Starting Flask server on port {port}")
    app.run(host="0.0.0.0", port=port)
