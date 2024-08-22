from http import HTTPStatus
from typing import Any, Dict, Optional, Union

import httpx

from ... import errors
from ...client import AuthenticatedClient, Client
from ...models.create_order import CreateOrder
from ...models.create_order_response import CreateOrderResponse
from ...models.error import Error
from ...types import UNSET, Response, Unset


def _get_kwargs(
    *,
    body: CreateOrder,
    act_as: Union[None, Unset, str] = UNSET,
) -> Dict[str, Any]:
    headers: Dict[str, Any] = {}

    params: Dict[str, Any] = {}

    json_act_as: Union[None, Unset, str]
    if isinstance(act_as, Unset):
        json_act_as = UNSET
    else:
        json_act_as = act_as
    params["act_as"] = json_act_as

    params = {k: v for k, v in params.items() if v is not UNSET and v is not None}

    _kwargs: Dict[str, Any] = {
        "method": "post",
        "url": "/api/create-order",
        "params": params,
    }

    _body = body.to_dict()

    _kwargs["json"] = _body
    headers["Content-Type"] = "application/json"

    _kwargs["headers"] = headers
    return _kwargs


def _parse_response(
    *, client: Union[AuthenticatedClient, Client], response: httpx.Response
) -> Optional[Union[CreateOrderResponse, Error]]:
    if response.status_code == HTTPStatus.CREATED:
        response_201 = CreateOrderResponse.from_dict(response.json())

        return response_201
    if response.status_code == HTTPStatus.BAD_REQUEST:
        response_400 = Error.from_dict(response.json())

        return response_400
    if response.status_code == HTTPStatus.NOT_FOUND:
        response_404 = Error.from_dict(response.json())

        return response_404
    if response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR:
        response_500 = Error.from_dict(response.json())

        return response_500
    if client.raise_on_unexpected_status:
        raise errors.UnexpectedStatus(response.status_code, response.content)
    else:
        return None


def _build_response(
    *, client: Union[AuthenticatedClient, Client], response: httpx.Response
) -> Response[Union[CreateOrderResponse, Error]]:
    return Response(
        status_code=HTTPStatus(response.status_code),
        content=response.content,
        headers=response.headers,
        parsed=_parse_response(client=client, response=response),
    )


def sync_detailed(
    *,
    client: Union[AuthenticatedClient, Client],
    body: CreateOrder,
    act_as: Union[None, Unset, str] = UNSET,
) -> Response[Union[CreateOrderResponse, Error]]:
    """
    Args:
        act_as (Union[None, Unset, str]):
        body (CreateOrder):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Response[Union[CreateOrderResponse, Error]]
    """

    kwargs = _get_kwargs(
        body=body,
        act_as=act_as,
    )

    response = client.get_httpx_client().request(
        **kwargs,
    )

    return _build_response(client=client, response=response)


def sync(
    *,
    client: Union[AuthenticatedClient, Client],
    body: CreateOrder,
    act_as: Union[None, Unset, str] = UNSET,
) -> Optional[Union[CreateOrderResponse, Error]]:
    """
    Args:
        act_as (Union[None, Unset, str]):
        body (CreateOrder):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Union[CreateOrderResponse, Error]
    """

    return sync_detailed(
        client=client,
        body=body,
        act_as=act_as,
    ).parsed


async def asyncio_detailed(
    *,
    client: Union[AuthenticatedClient, Client],
    body: CreateOrder,
    act_as: Union[None, Unset, str] = UNSET,
) -> Response[Union[CreateOrderResponse, Error]]:
    """
    Args:
        act_as (Union[None, Unset, str]):
        body (CreateOrder):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Response[Union[CreateOrderResponse, Error]]
    """

    kwargs = _get_kwargs(
        body=body,
        act_as=act_as,
    )

    response = await client.get_async_httpx_client().request(**kwargs)

    return _build_response(client=client, response=response)


async def asyncio(
    *,
    client: Union[AuthenticatedClient, Client],
    body: CreateOrder,
    act_as: Union[None, Unset, str] = UNSET,
) -> Optional[Union[CreateOrderResponse, Error]]:
    """
    Args:
        act_as (Union[None, Unset, str]):
        body (CreateOrder):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Union[CreateOrderResponse, Error]
    """

    return (
        await asyncio_detailed(
            client=client,
            body=body,
            act_as=act_as,
        )
    ).parsed