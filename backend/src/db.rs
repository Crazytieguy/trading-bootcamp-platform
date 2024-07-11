use std::{env, str::FromStr};

use sqlx::{
    sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions, SqliteSynchronous},
    Connection, SqliteConnection, SqlitePool,
};
use tokio::sync::broadcast::error::RecvError;

// should hopefully keep the WAL size nice and small and avoid blocking writers
const CHECKPOINT_PAGE_LIMIT: i64 = 512;

pub async fn init() -> anyhow::Result<SqlitePool> {
    let connection_options = SqliteConnectOptions::from_str(&env::var("DATABASE_URL")?)?
        .create_if_missing(true)
        .journal_mode(SqliteJournalMode::Wal)
        .synchronous(SqliteSynchronous::Normal)
        // This should work with the default idle timeout and max lifetime
        .optimize_on_close(true, None)
        .pragma("optimize", "0x10002")
        // already checkpointing in the background
        .pragma("wal_autocheckpoint", "0");

    let mut management_conn = SqliteConnection::connect_with(&connection_options).await?;

    sqlx::migrate!().run(&mut management_conn).await?;

    let (release_tx, mut release_rx) = tokio::sync::broadcast::channel(1);

    let pool = SqlitePoolOptions::new()
        .min_connections(8)
        .max_connections(64)
        .after_release(move |_, _| {
            let release_tx = release_tx.clone();
            Box::pin(async move {
                if let Err(e) = release_tx.send(()) {
                    tracing::error!("release_tx.send failed: {:?}", e);
                };
                Ok(true)
            })
        })
        .connect_with(connection_options)
        .await?;

    // checkpointing task
    tokio::spawn(async move {
        let mut released_connections = 0;
        let mut remaining_pages = 0;
        loop {
            match release_rx.recv().await {
                Ok(()) => {
                    released_connections += 1;
                }
                Err(RecvError::Lagged(n)) => {
                    released_connections += n as i64;
                }
                Err(RecvError::Closed) => {
                    break;
                }
            };
            let approx_wal_pages = remaining_pages + released_connections * 4;
            if approx_wal_pages < CHECKPOINT_PAGE_LIMIT {
                continue;
            }
            match sqlx::query_as::<_, WalCheckPointRow>("PRAGMA wal_checkpoint(PASSIVE)")
                .fetch_one(&mut management_conn)
                .await
            {
                Err(e) => {
                    tracing::error!("wal_checkpoint failed: {:?}", e);
                }
                Ok(row) => {
                    released_connections = 0;
                    remaining_pages = row.log - row.checkpointed;
                    tracing::info!(
                        "wal_checkpoint: busy={} log={} checkpointed={}",
                        row.busy,
                        row.log,
                        row.checkpointed
                    );
                }
            }
        }
    });

    Ok(pool)
}

#[derive(sqlx::FromRow)]
struct WalCheckPointRow {
    busy: i64,
    log: i64,
    checkpointed: i64,
}
