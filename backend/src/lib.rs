#![feature(type_alias_impl_trait)]
#![feature(const_async_blocks)]
#![feature(assert_matches)]

pub mod websocket_api {
    include!(concat!(env!("OUT_DIR"), "/websocket_api.rs"));
}

pub mod auth;
pub mod db;
