import logging
import csv
from dotenv import load_dotenv
import os
from trading_client import TradingClient
import websocket_api

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

def create_markets_from_file(filename: str):
    # Load environment variables
    jwt = os.getenv("JWT")
    api_url = os.getenv("API_URL")
    act_as = os.getenv("ACT_AS")

    if not all([jwt, api_url]):
        raise ValueError("Missing required environment variables JWT and API_URL")

    # Read market definitions from CSV file
    markets = []
    try:
        with open(filename, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                markets.append({
                    'name': row['name'],
                    'description': row['description'],
                    'min_settlement': float(row['min_settlement']),
                    'max_settlement': float(row['max_settlement'])
                })
    except FileNotFoundError:
        logger.error(f"Market definitions file {filename} not found")
        return
    except KeyError as e:
        logger.error(f"Missing required column in CSV file: {e}")
        return
    except ValueError as e:
        logger.error(f"Invalid number format in CSV file: {e}")
        return

    # Create markets using trading client
    with TradingClient(api_url, jwt, act_as) as client:
        for market in markets:
            try:
                msg = websocket_api.ClientMessage(
                    create_market=websocket_api.CreateMarket(
                        name=market['name'],
                        description=market['description'],
                        min_settlement=market['min_settlement'],
                        max_settlement=market['max_settlement']
                    )
                )
                logger.info(f"Creating market: {market['name']}")
                client.request(msg)
                logger.info(f"Successfully created market: {market['name']}")
            except Exception as e:
                logger.error(f"Failed to create market {market['name']}: {e}")

if __name__ == "__main__":
    create_markets_from_file("markets.csv") 