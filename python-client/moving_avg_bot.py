import time

import logging
from dotenv import load_dotenv

from typing import Annotated
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

from metagame import TradingClient
from metagame.websocket_api import Side
from typing import Literal
from metagame.websocket_api import CancelOrder, ClientMessage, CreateOrder, Side
import fire
from os import getenv
import time

API_URL="wss://trading-bootcamp.fly.dev/api"
JWT="eyJhbGciOiJSUzI1NiIsImtpZCI6ImNhOjA0OmZmOjViOjNmOmUwOmUzOjNjOmU2OmUwOjAzOjZiOjIxOmJiOjQ3OjVlIiwidHlwIjoiSldUIn0.eyJhdWQiOlsidHJhZGluZy1zZXJ2ZXItYXBpIl0sImF6cCI6ImE5ODY5YmIxMjI1ODQ4YjlhZDViYWQyYTA0YjcyYjVmIiwiZXhwIjoxNzQwMDkyNjQyLCJpYXQiOjE3Mzk0ODc4NDEsImlzcyI6Imh0dHBzOi8vYWNjb3VudC50cmFkaW5nLmNhbXAiLCJqdGkiOiI3OTUwOTIwZC1mM2NjLTQ1NjUtYWY5ZC0wNTdmYjcyMzA3MjgiLCJvcmdfY29kZSI6Im9yZ18xYTFkMmMxMDEwZiIsInBlcm1pc3Npb25zIjpbXSwic2NwIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsIm9mZmxpbmUiXSwic3ViIjoia3BfZWEyYzFkOTE0ODlkNDE0OGIzZTMwY2Q3N2Q1MmU4NTEifQ.U6VYz38ebgt9YeO-iGg7-QEkZbTPikBGhLZ5l71YKcjNpYhg_T1mvdTPeVDti6bzPyywwe5CqDeSALkjXS03DUvGtVQrM1bY08SV9K7Yaz4Zbf7un7fSS42EFn8EabK3agf4YF6NQ_FiF69sOJNI6-b0nLG6aPBArfxPfa0wZpWokLIy3UmhqTyAfjoXc0FY9e9n8PdhOWufnFtRnst-as4hWHr0sQ0fk1DRp_XWgGnnwbKBndHLQzf93DY1gSAzmUOlxP5i3oYKYDmSVK2n31Ijsxpn9mj3OV9q4JdEhly-gvmiDcEda-rWJrUHytBaW_W6tW_FzIkHvNkiuUNuIA"
ACT_AS=126


# ACTORS = [
#     {
#         'JWT': "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNhOjA0OmZmOjViOjNmOmUwOmUzOjNjOmU2OmUwOjAzOjZiOjIxOmJiOjQ3OjVlIiwidHlwIjoiSldUIn0.eyJhdWQiOlsidHJhZGluZy1zZXJ2ZXItYXBpIl0sImF6cCI6ImE5ODY5YmIxMjI1ODQ4YjlhZDViYWQyYTA0YjcyYjVmIiwiZXhwIjoxNzQwMDkyNjQyLCJpYXQiOjE3Mzk0ODc4NDEsImlzcyI6Imh0dHBzOi8vYWNjb3VudC50cmFkaW5nLmNhbXAiLCJqdGkiOiI3OTUwOTIwZC1mM2NjLTQ1NjUtYWY5ZC0wNTdmYjcyMzA3MjgiLCJvcmdfY29kZSI6Im9yZ18xYTFkMmMxMDEwZiIsInBlcm1pc3Npb25zIjpbXSwic2NwIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsIm9mZmxpbmUiXSwic3ViIjoia3BfZWEyYzFkOTE0ODlkNDE0OGIzZTMwY2Q3N2Q1MmU4NTEifQ.U6VYz38ebgt9YeO-iGg7-QEkZbTPikBGhLZ5l71YKcjNpYhg_T1mvdTPeVDti6bzPyywwe5CqDeSALkjXS03DUvGtVQrM1bY08SV9K7Yaz4Zbf7un7fSS42EFn8EabK3agf4YF6NQ_FiF69sOJNI6-b0nLG6aPBArfxPfa0wZpWokLIy3UmhqTyAfjoXc0FY9e9n8PdhOWufnFtRnst-as4hWHr0sQ0fk1DRp_XWgGnnwbKBndHLQzf93DY1gSAzmUOlxP5i3oYKYDmSVK2n31Ijsxpn9mj3OV9q4JdEhly-gvmiDcEda-rWJrUHytBaW_W6tW_FzIkHvNkiuUNuIA",
#         'ACT_AS': 126
#     },
#     {
#         'JWT': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNhOjA0OmZmOjViOjNmOmUwOmUzOjNjOmU2OmUwOjAzOjZiOjIxOmJiOjQ3OjVlIiwidHlwIjoiSldUIn0.eyJhdWQiOlsidHJhZGluZy1zZXJ2ZXItYXBpIl0sImF6cCI6ImE5ODY5YmIxMjI1ODQ4YjlhZDViYWQyYTA0YjcyYjVmIiwiZXhwIjoxNzQwNDQ1NzQ4LCJpYXQiOjE3Mzk4NDA5NDgsImlzcyI6Imh0dHBzOi8vYWNjb3VudC50cmFkaW5nLmNhbXAiLCJqdGkiOiJjZTQ0ZmQxZS01NmNmLTQwZGMtOTM3MC1hMjRiNjMxMjVkMTUiLCJvcmdfY29kZSI6Im9yZ18xYTFkMmMxMDEwZiIsInBlcm1pc3Npb25zIjpbXSwic2NwIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsIm9mZmxpbmUiXSwic3ViIjoia3BfNzYwYzZmMDc1NDY1NDNmNWI0ZmFlNGJhYzVkNzIzNjAifQ.oy78RJLDDLAMj98yr8DBoHeQ7bdAv_Z5BUoivAOHs7Pyz4PfmcCbP1J8EeAuDsi47PGz_iCrS9eloAjf66t5XwPRlFJlg9dWMTx793VRQ5gaqeH7yZRUrIsXRg9k-7SiLtMSKSypqGzHBh6ocaHyPXt-Id-ucqAb0lsM00jULvb29Uk-rqV8d39R0Zu8nqNbtKzlbsqBcwY-dFzZ2CqgF8bkxQ4iB2kDrpYbf_ZTfRvqBbDXkcls4sE2nUi6a91aZMjcGyYFjQL6HJnQg_ahfhOuwIGRxwE9vEx3hRZmB9Eyjt_0XnYzYD2iv1Qs4uujBBJUGcl585EJH9eVZGbu3g',
#         'ACT_AS':126
#     },
#     {
#         'JWT': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNhOjA0OmZmOjViOjNmOmUwOmUzOjNjOmU2OmUwOjAzOjZiOjIxOmJiOjQ3OjVlIiwidHlwIjoiSldUIn0.eyJhdWQiOlsidHJhZGluZy1zZXJ2ZXItYXBpIl0sImF6cCI6ImE5ODY5YmIxMjI1ODQ4YjlhZDViYWQyYTA0YjcyYjVmIiwiZXhwIjoxNzQwNDQ0MDA3LCJpYXQiOjE3Mzk4MzkyMDcsImlzcyI6Imh0dHBzOi8vYWNjb3VudC50cmFkaW5nLmNhbXAiLCJqdGkiOiJkNTQxMDllYy1jYzZjLTQzOWQtOTE1Ni01MDliZDQ5Y2U1NTgiLCJvcmdfY29kZSI6Im9yZ18xYTFkMmMxMDEwZiIsInBlcm1pc3Npb25zIjpbXSwic2NwIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsIm9mZmxpbmUiXSwic3ViIjoia3BfNzYwZWMxYjc4MGY1NGZhNThhYmE1YzY1Y2RiMzQ5MWMifQ.pfGxo82efqxDTuKJJEJWSrJlXCp2rDlmEje1eNW-mBKYWJEXRnQYf-OecVAjNm2Tal-laVlPrUZw5k-gcGn26xRpSQhnbMDdHB0KCMoMgYk377mt2de1MJod9Z0IJ6peSXuXZ4Zn67MG9xUis8HvwCWWl9J7MMBNCxQMYEZGq4TnN9DGw6JlPhoAudecsGROxm8_-l2lIPpw-GFqPeYuHXLT3SgxxNdcJ4nC3bp3dGSUVNYiflS0xpezi1-YHTE_h3O5dpf539yeEHvkFoStbSfG3yYUoXEcrvVb0H-KVofgtOSvFvAPMNW6HW2KhX-TiDKX4QSPcDRTwjNxS2EnQ',
#         'ACT_AS': 126
#     }
# ]



from typing import Union
import random
def main(market_names: Union[str,list[str]]):
    # actor_id = random.randint(0, len(ACTORS) - 1)
    # JWT = ACTORS[actor_id]['JWT']
    # ACT_AS = ACTORS[actor_id]['ACT_AS']
    if isinstance(market_names, str):
        market_names = [market_names]
    while True:
        # time.sleep(0.01)
        with TradingClient(API_URL, JWT, ACT_AS) as client:
            state = client.state()
            # market_name_to_id = state.market_name_to_id

            # name_to_market = {}
            # for market_name in market_names:
            #     market_id = state.market_name_to_id[market_name]
            #     name_to_market[market_name] = state.markets[market_id]
            
            for market_name in market_names:
                state = client.state()
                market_id = state.market_name_to_id[market_name]
                market = state.markets[market_id]
                trade_history = client.get_full_trade_history(market_id)
                moving_avg = round(sum([trade.price for trade in trade_history.trades][-40:])/40, 2)
                
                messages = []
    
                for delta in [-5, -8, -10, 5, 8, 10, 15, -15]:
                    messages.append(ClientMessage(
                        create_order=CreateOrder(
                            market_id=market_id,
                            price=moving_avg + delta,
                            size=1,
                            side = Side.BID if delta < 0 else Side.OFFER
                        )
                    ))
                client.request_many(messages)
                time.sleep(0.5)
                # for order in market.orders:
                #     print(order)
                #         break
                # cancel all orders
                orders = [
                    ClientMessage(
                        cancel_order=CancelOrder(
                            id=order.id
                        )
                    )
                    for order in market.orders
                    if order.owner_id == state.acting_as
                ]
                try:
                    client.request_many(orders)
                except Exception as e:
                    print(e)
                    continue
                
if __name__ == "__main__":
    fire.Fire(main)
