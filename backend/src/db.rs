use std::{env, str::FromStr, time::Duration};

use sqlx::{
    sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions, SqliteSynchronous},
    Connection, SqliteConnection, SqlitePool,
};
use tokio::sync::broadcast::error::RecvError;

// should hopefully keep the WAL size nice and small
// and avoid blocking writers
const CHECKPOINT_AFTER_RELEASES: u64 = 128;

pub async fn init() -> anyhow::Result<SqlitePool> {
    let connection_options = SqliteConnectOptions::from_str(&env::var("DATABASE_URL")?)?
        .create_if_missing(true)
        .journal_mode(SqliteJournalMode::Wal)
        .synchronous(SqliteSynchronous::Normal)
        // This should work with the default idle timeout and max lifetime
        .optimize_on_close(true, None)
        .pragma("optimize", "0x10002");

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
        let mut released = 0;
        loop {
            match release_rx.recv().await {
                Ok(()) => {
                    released += 1;
                }
                Err(RecvError::Lagged(n)) => {
                    released += n;
                }
                Err(RecvError::Closed) => {
                    break;
                }
            };
            if released >= CHECKPOINT_AFTER_RELEASES {
                released = 0;
                if let Err(e) = sqlx::query("PRAGMA wal_checkpoint(PASSIVE)")
                    .execute(&mut management_conn)
                    .await
                {
                    tracing::error!("wal_checkpoint failed: {:?}", e);
                };
            }
            // Don't bother recieving every release
            tokio::time::sleep(Duration::from_millis(100)).await;
        }
    });

    Ok(pool)
}
