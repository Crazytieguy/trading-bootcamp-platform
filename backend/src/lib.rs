#![feature(type_alias_impl_trait)]
#![feature(const_async_blocks)]

pub mod websocket_api {
    include!(concat!(env!("OUT_DIR"), "/websocket_api.rs"));
}

pub mod auth;
pub mod db;
