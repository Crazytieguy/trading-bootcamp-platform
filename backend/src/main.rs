use axum::{
    extract::{State, WebSocketUpgrade},
    response::Response,
    routing::get,
    Router,
};
use backend::db::DB;
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

    let db = DB::init().await?;

    let app = Router::new()
        .route("/api", get(api))
        .layer(TraceLayer::new_for_http())
        .with_state(db);

    let listener = TcpListener::bind("127.0.0.1:8080").await?;
    tracing::info!("Listening on {}", listener.local_addr()?);
    Ok(axum::serve(listener, app).await?)
}

#[axum::debug_handler]
async fn api(ws: WebSocketUpgrade, State(db): State<DB>) -> Response {
    ws.on_upgrade(move |socket| backend::handle_socket::handle_socket(socket, db))
}
