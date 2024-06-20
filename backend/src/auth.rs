use std::{env, sync::OnceLock};

use jsonwebtoken::{jwk::JwkSet, Algorithm, DecodingKey, Validation};
use serde::{Deserialize, Serialize};

static AUTH_DETAILS: OnceLock<AuthDetails> = OnceLock::new();

struct AuthDetails {
    issuer: String,
    audience: String,
    jwk_set: JwkSet,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    permissions: Vec<String>,
}

/// Initialize the auth module with the necessary configuration.
pub async fn init() -> anyhow::Result<()> {
    let issuer = env::var("KINDE_ISSUER")?;
    let audience = env::var("KINDE_AUDIENCE")?;
    let url = format!("{issuer}/.well-known/jwks.json");
    let jwk_set: JwkSet = reqwest::get(url).await?.json().await?;
    let auth_details = AuthDetails {
        issuer,
        audience,
        jwk_set,
    };
    AUTH_DETAILS.set(auth_details).ok();
    tracing::info!("Auth module initialized");
    Ok(())
}

pub fn validate_jwt(token: &str) -> anyhow::Result<Claims> {
    let Some(auth_details) = AUTH_DETAILS.get() else {
        anyhow::bail!("Auth module not initialized")
    };
    let header = jsonwebtoken::decode_header(token)?;
    let Some(kid) = header.kid else {
        anyhow::bail!("Missing kid")
    };
    let Some(jwk) = auth_details.jwk_set.find(&kid) else {
        anyhow::bail!("kid not in JwkSet")
    };
    let decoding_key = DecodingKey::from_jwk(jwk)?;
    let mut validation = Validation::new(Algorithm::RS256);
    validation.set_audience(&[&auth_details.audience]);
    validation.set_issuer(&[&auth_details.issuer]);
    let token = jsonwebtoken::decode::<Claims>(token, &decoding_key, &validation)?;
    Ok(token.claims)
}
