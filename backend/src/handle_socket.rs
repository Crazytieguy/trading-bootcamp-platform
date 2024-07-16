use crate::{
    auth::{validate_jwt, Claims, Role},
    db::DB,
    websocket_api::{
        client_message::Message as CM,
        request_failed::{ErrorDetails, RequestDetails},
        server_message::{Authenticated, Message as SM},
        ClientMessage, RequestFailed, ServerMessage,
    },
};
use anyhow::bail;
use axum::extract::{ws, ws::WebSocket};
use prost::{bytes::Bytes, Message as _};
use rust_decimal_macros::dec;

pub async fn handle_socket(socket: WebSocket, db: DB) {
    if let Err(e) = handle_socket_fallible(socket, db).await {
        tracing::error!("Error handling socket: {e}");
    }
}

async fn handle_socket_fallible(mut socket: WebSocket, db: DB) -> anyhow::Result<()> {
    let claims = authenticate(&mut socket).await?;
    let is_trader = claims.roles.contains(&Role::Trader);
    let is_admin = claims.roles.contains(&Role::Admin);
    if is_trader {
        let initial_balance = if is_admin { dec!(1_000_000) } else { dec!(0) };
        db.ensure_user_created(&claims.sub, initial_balance).await?;
    }
    Ok(())
}

async fn authenticate(socket: &mut WebSocket) -> anyhow::Result<Claims> {
    loop {
        match socket.recv().await {
            Some(Ok(ws::Message::Binary(msg))) => {
                let Ok(ClientMessage {
                    message: Some(CM::Authenticate(authenticate)),
                }) = ClientMessage::decode(Bytes::from(msg))
                else {
                    let resp = request_failed("Authenticate", "Expected Authenticate message");
                    socket.send(resp.encode_to_vec().into()).await?;
                    continue;
                };
                let Ok(claims) = validate_jwt(&authenticate.jwt).await else {
                    let resp = request_failed("Authenticate", "JWT validation failed");
                    socket.send(resp.encode_to_vec().into()).await?;
                    continue;
                };
                let resp = ServerMessage {
                    message: Some(SM::Authenticated(Authenticated {})),
                };
                socket.send(resp.encode_to_vec().into()).await?;
                return Ok(claims);
            }
            Some(Ok(_)) => {
                let resp = request_failed("Authenticate", "Expected Binary message");
                socket.send(resp.encode_to_vec().into()).await?;
                continue;
            }
            _ => bail!("Never got Authenticate message"),
        }
    }
}

fn request_failed(kind: &str, message: &str) -> ServerMessage {
    ServerMessage {
        message: Some(SM::RequestFailed(RequestFailed {
            request_details: Some(RequestDetails { kind: kind.into() }),
            error_details: Some(ErrorDetails {
                message: message.into(),
            }),
        })),
    }
}
