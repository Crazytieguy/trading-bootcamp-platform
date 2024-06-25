use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::get,
    Router,
};
use axum_extra::{
    headers::{authorization::Bearer, Authorization},
    typed_header::TypedHeaderRejection,
    TypedHeader,
};
use backend::auth;
use migration::{Migrator, MigratorTrait};
use sea_orm::Database;
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
    auth::init().await?;
    let db = Database::connect(std::env::var("DATABASE_URL")?).await?;
    Migrator::up(&db, None).await?;

    let app = Router::new()
        .route("/api", get(handler))
        .layer(TraceLayer::new_for_http());

    let listener = TcpListener::bind("127.0.0.1:8080").await?;
    tracing::info!("Listening on {}", listener.local_addr()?);
    Ok(axum::serve(listener, app).await?)
}

#[axum::debug_handler]
async fn handler(
    authorization: Result<TypedHeader<Authorization<Bearer>>, TypedHeaderRejection>,
) -> Response {
    let Ok(TypedHeader(authorization)) = authorization else {
        return (StatusCode::UNAUTHORIZED, "Missing Authorization header").into_response();
    };
    let Ok(claims) = auth::validate_jwt(authorization.token()) else {
        return (StatusCode::UNAUTHORIZED, "Unauthorized").into_response();
    };
    let Ok(claims) = serde_json::to_string(&claims) else {
        return (StatusCode::INTERNAL_SERVER_ERROR, "Internal server error").into_response();
    };
    claims.into_response()
}
