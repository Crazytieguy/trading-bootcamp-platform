import { PUBLIC_SERVER_URL } from '$env/static/public';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { websocket_api } from 'schema-js';
import { toast } from 'svelte-sonner';
import { kinde } from './auth.svelte';
import { notifyUser } from './notifications';

export const redeemables = [];

const socket = new ReconnectingWebSocket(PUBLIC_SERVER_URL);
socket.binaryType = 'arraybuffer';

export const serverState = $state({
	stale: true,
	actingAs: undefined as string | undefined,
	portfolio: undefined as websocket_api.IPortfolio | undefined,
	payments: [] as websocket_api.IPayment[],
	ownerships: [] as websocket_api.IOwnership[],
	users: {} as Record<string, websocket_api.IUser>,
	markets: {} as Record<number, websocket_api.IMarket>
});

let resolveConnectionToast: ((value: unknown) => void) | undefined;
const startConnectionToast = () => {
	toast.promise(
		() =>
			new Promise((resolve) => {
				resolveConnectionToast = resolve;
			}),
		{
			loading: 'Connecting...',
			success: 'Connected!',
			error: 'Error connecting'
		}
	);
};

let messageQueue: websocket_api.IClientMessage[] = [];
let hasAuthenticated = false;

export const sendClientMessage = (msg: websocket_api.IClientMessage) => {
	if (hasAuthenticated || 'authenticate' in msg) {
		const data = websocket_api.ClientMessage.encode(msg).finish();
		socket.send(data);
		hasAuthenticated = true;
		for (const m of messageQueue) {
			sendClientMessage(m);
		}
		messageQueue = [];
	} else {
		messageQueue.push(msg);
	}
};

socket.onopen = async () => {
	startConnectionToast();
	const accessToken = await kinde.getToken();
	const idToken = await kinde.getIdToken();
	if (!accessToken) {
		console.log('no access token');
		return;
	}
	if (!idToken) {
		console.log('no id token');
		return;
	}
	const actAs = localStorage.getItem('actAs');
	const authenticate = {
		jwt: accessToken,
		idJwt: idToken,
		actAs
	};
	console.log('Auth info:', authenticate);
	sendClientMessage({ authenticate });
};

socket.onclose = () => {
	serverState.stale = true;
};

socket.onmessage = (event: MessageEvent) => {
	const data = event.data;
	const msg = websocket_api.ServerMessage.decode(new Uint8Array(data));

	notifyUser(msg);

	if (msg.actingAs) {
		serverState.stale = false;
		if (resolveConnectionToast) {
			resolveConnectionToast('connected');
			resolveConnectionToast = undefined;
		}
		localStorage.setItem('actAs', msg.actingAs.userId!);
		serverState.actingAs = msg.actingAs.userId!;
	}

	if (msg.portfolio) {
		serverState.portfolio = msg.portfolio;
	}

	if (msg.payments) {
		serverState.payments = msg.payments.payments || [];
	}

	const paymentCreated = msg.paymentCreated;
	if (paymentCreated) {
		if (!serverState.payments.find((p) => p.id === paymentCreated.id)) {
			serverState.payments.push(paymentCreated);
		}
	}

	if (msg.ownerships) {
		serverState.ownerships = msg.ownerships.ownerships || [];
	}

	const ownershipReceived = msg.ownershipReceived;
	if (ownershipReceived) {
		if (!serverState.ownerships.find((o) => o.ofBotId === ownershipReceived.ofBotId)) {
			serverState.ownerships.push(ownershipReceived);
		}
	}

	if (msg.users) {
		serverState.users = {};
		for (const user of msg.users.users || []) {
			serverState.users[user.id!] = user;
		}
	}

	const userCreated = msg.userCreated;
	if (userCreated) {
		serverState.users[userCreated.id!] = userCreated;
	}

	const market = msg.marketData || msg.marketCreated;
	if (market) {
		// @ts-expect-error decoded nexted objects are class instances
		serverState.markets[market.id] = websocket_api.Market.toObject(market, { defaults: true });
	}

	const marketSettled = msg.marketSettled;
	if (marketSettled) {
		const existingMarket = serverState.markets[marketSettled.id];
		if (existingMarket) {
			delete existingMarket.open;
			existingMarket.closed = {
				settlePrice: marketSettled.settlePrice
			};
			existingMarket.orders = [];
		} else {
			console.error(`Market ${marketSettled.id} not already in state`);
		}
		return;
	}

	const orderCancelled = msg.orderCancelled;
	if (orderCancelled) {
		const existingMarket = serverState.markets[orderCancelled.marketId];
		if (!existingMarket) {
			console.error(`Market ${orderCancelled.marketId} not already in state`);
			return;
		}
		existingMarket.orders?.forEach((order) => {
			if (order.id === orderCancelled.id) {
				order.size = 0;
			}
		});
	}

	const orderCreated = msg.orderCreated;
	if (orderCreated) {
		const existingMarket = serverState.markets[orderCreated.marketId];
		if (!existingMarket) {
			console.error(`Market ${orderCreated.marketId} not already in state`);
			return;
		}
		const orders = existingMarket.orders || [];
		if (orderCreated.order) {
			// @ts-expect-error decoded nexted objects are class instances
			orders.push(websocket_api.Order.toObject(orderCreated.order, { defaults: true }));
		}
		const fills = orderCreated.fills;
		if (fills && fills.length) {
			orders.forEach((order) => {
				const fill = fills.find((fill) => fill.id === order.id);
				if (fill) {
					order.size = fill.sizeRemaining;
				}
			});
		}
		existingMarket.orders = orders;
		const trades = orderCreated.trades;
		if (trades && trades.length) {
			existingMarket.trades = [
				...(existingMarket.trades || []),
				// @ts-expect-error decoded nexted objects are class instances
				...trades.map((t) => websocket_api.Trade.toObject(t, { defaults: true }))
			];
		}
	}
};
