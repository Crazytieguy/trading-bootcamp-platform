use std::sync::{Arc, RwLock};

use fxhash::FxHashMap;
use tokio::sync::{broadcast, watch};

const MARKETS_BROADCAST_BUFFER_SIZE: usize = 16;
const MARKET_DATA_BROADCAST_BUFFER_SIZE: usize = 256;
const PAYMENT_BROADCAST_BUFFER_SIZE: usize = 16;

#[derive(Clone)]
pub struct Subscriptions {
    inner: Arc<SubscriptionsInner>,
}

struct SubscriptionsInner {
    /// user id -> Notify
    portfolio: RwLock<FxHashMap<String, watch::Sender<()>>>,
    /// contains serialized protobuf Market or MarketSettled
    markets: broadcast::Sender<Vec<u8>>,
    /// market id -> serialized protobuf OrderCreated / OrderCanceled
    market_data: RwLock<FxHashMap<String, broadcast::Sender<Vec<u8>>>>,
    /// user id -> serialized protobuf Payment
    payments: RwLock<FxHashMap<String, broadcast::Sender<Vec<u8>>>>,
}

impl Subscriptions {
    pub fn new() -> Self {
        let markets = broadcast::Sender::new(MARKETS_BROADCAST_BUFFER_SIZE);
        Self {
            inner: Arc::new(SubscriptionsInner {
                portfolio: Default::default(),
                markets,
                market_data: Default::default(),
                payments: Default::default(),
            }),
        }
    }

    pub fn subscribe_portfolio(&self, user_id: &str) -> watch::Receiver<()> {
        if let Some(sender) = self.inner.portfolio.read().unwrap().get(user_id) {
            return sender.subscribe();
        }
        let mut write = self.inner.portfolio.write().unwrap();
        // another writer might have added it in the meantime
        if let Some(sender) = write.get(user_id) {
            return sender.subscribe();
        }
        let (sender, receiver) = watch::channel(());
        write.insert(user_id.to_string(), sender);
        receiver
    }

    pub fn notify_user_portfolio(&self, user_id: &str) {
        if let Some(sender) = self.inner.portfolio.read().unwrap().get(user_id) {
            sender.send(()).ok();
        }
    }

    pub fn subscribe_markets(&self) -> broadcast::Receiver<Vec<u8>> {
        self.inner.markets.subscribe()
    }

    pub fn notify_markets(&self, data: Vec<u8>) {
        self.inner.markets.send(data).ok();
    }

    pub fn subscribe_market_data(&self, market_id: &str) -> broadcast::Receiver<Vec<u8>> {
        if let Some(sender) = self.inner.market_data.read().unwrap().get(market_id) {
            return sender.subscribe();
        }
        let mut write = self.inner.market_data.write().unwrap();
        // another writer might have added it in the meantime
        if let Some(sender) = write.get(market_id) {
            return sender.subscribe();
        }
        let (sender, receiver) = broadcast::channel(MARKET_DATA_BROADCAST_BUFFER_SIZE);
        write.insert(market_id.to_string(), sender);
        receiver
    }

    pub fn notify_market_data(&self, market_id: &str, data: Vec<u8>) {
        if let Some(sender) = self.inner.market_data.read().unwrap().get(market_id) {
            sender.send(data).ok();
        }
    }

    pub fn subscribe_payments(&self, user_id: &str) -> broadcast::Receiver<Vec<u8>> {
        if let Some(sender) = self.inner.payments.read().unwrap().get(user_id) {
            return sender.subscribe();
        }
        let mut write = self.inner.payments.write().unwrap();
        // another writer might have added it in the meantime
        if let Some(sender) = write.get(user_id) {
            return sender.subscribe();
        }
        let (sender, receiver) = broadcast::channel(PAYMENT_BROADCAST_BUFFER_SIZE);
        write.insert(user_id.to_string(), sender);
        receiver
    }

    pub fn notify_payment(&self, user_id: &str, data: Vec<u8>) {
        if let Some(sender) = self.inner.payments.read().unwrap().get(user_id) {
            sender.send(data).ok();
        }
    }
}
