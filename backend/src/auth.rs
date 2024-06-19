use jsonwebtoken::{jwk::JwkSet, Algorithm, DecodingKey, Validation};
use serde::{Deserialize, Serialize};

const ISSUER: &str = "https://crazytieguy.kinde.com";
const AUDIENCE: &str = "trading-server-api";

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    permissions: Vec<String>,
}

pub async fn get_jwk_set() -> anyhow::Result<JwkSet> {
    let url = format!("{ISSUER}/.well-known/jwks.json");
    Ok(reqwest::get(url).await?.json().await?)
}

pub fn validate_jwt(jwk_set: &JwkSet, token: &str) -> anyhow::Result<Claims> {
    let header = jsonwebtoken::decode_header(token)?;
    let Some(kid) = header.kid else {
        anyhow::bail!("Missing kid")
    };
    let Some(jwk) = jwk_set.find(&kid) else {
        anyhow::bail!("kid not in JwkSet")
    };
    let decoding_key = DecodingKey::from_jwk(jwk)?;
    let mut validation = Validation::new(Algorithm::RS256);
    validation.set_audience(&[AUDIENCE]);
    validation.set_issuer(&[ISSUER]);
    let token = jsonwebtoken::decode::<Claims>(token, &decoding_key, &validation)?;
    Ok(token.claims)
}
