use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::get,
    Router,
};
use backend::{auth::Claims, db::DB};
use tokio::net::TcpListener;
use tower_http::trace::TraceLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let _db = DB::init().await?;

    let app = Router::new()
        .route("/api", get(example_auth_handler))
        .layer(TraceLayer::new_for_http());

    let listener = TcpListener::bind("127.0.0.1:8080").await?;
    tracing::info!("Listening on {}", listener.local_addr()?);
    Ok(axum::serve(listener, app).await?)
}

#[axum::debug_handler]
async fn example_auth_handler(claims: Claims) -> Response {
    let Ok(claims) = serde_json::to_string(&claims) else {
        return (StatusCode::INTERNAL_SERVER_ERROR, "Internal server error").into_response();
    };
    claims.into_response()
}
