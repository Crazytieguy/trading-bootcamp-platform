<script lang="ts">
	import { kinde } from '$lib/auth';
	import CancelOrder from '$lib/components/forms/cancelOrder.svelte';
	import CreateMarket from '$lib/components/forms/createMarket.svelte';
	import CreateOrder from '$lib/components/forms/createOrder.svelte';
	import SettleMarket from '$lib/components/forms/settleMarket.svelte';
	import SubscribeMarketData from '$lib/components/forms/subscribeMarketData.svelte';
	import UnSubscribeMarketData from '$lib/components/forms/unSubscribeMarketData.svelte';
	import { Button } from '$lib/components/ui/button/index';
	import { websocket_api } from 'schema-js';

	let messages: websocket_api.ServerMessage[] = [];
	const socket = new WebSocket('/api');
	socket.onmessage = async (event) => {
		const data = await event.data.arrayBuffer();
		const msg = websocket_api.ServerMessage.decode(new Uint8Array(data));
		messages = [...messages, msg];
	};

	const authenticate = async () => {
		const accessToken = await kinde.getToken();
		if (!accessToken) {
			console.log('no access token');
			return;
		}
		const authenticateMessage = websocket_api.ClientMessage.encode({
			authenticate: {
				jwt: accessToken
			}
		}).finish();
		socket.send(authenticateMessage);
	};

	const subscribePortfolio = () => {
		const subscribeMessage = websocket_api.ClientMessage.encode({
			subscribePortfolio: {}
		}).finish();
		socket.send(subscribeMessage);
	};

	const unSubscribePortfolio = () => {
		const unSubscribeMessage = websocket_api.ClientMessage.encode({
			unsubscribePortfolio: {}
		}).finish();
		socket.send(unSubscribeMessage);
	};

	const subscribeMarkets = () => {
		const subscribeMessage = websocket_api.ClientMessage.encode({
			subscribeMarkets: {}
		}).finish();
		socket.send(subscribeMessage);
	};

	const unSubscribeMarkets = () => {
		const unSubscribeMessage = websocket_api.ClientMessage.encode({
			unsubscribeMarkets: {}
		}).finish();
		socket.send(unSubscribeMessage);
	};
</script>

<main class="container">
	<div class="my-8 grid grid-cols-3 gap-8">
		<Button on:click={authenticate}>Authenticate</Button>
		<Button on:click={subscribePortfolio}>Subscribe Portfolio</Button>
		<Button on:click={unSubscribePortfolio}>Unsubscribe Portfolio</Button>
		<Button on:click={subscribeMarkets}>Subscribe Markets</Button>
		<Button on:click={unSubscribeMarkets}>Unsubscribe Markets</Button>
		<div></div>
		<SubscribeMarketData {socket} />
		<UnSubscribeMarketData {socket} />
		<CancelOrder {socket} />
		<CreateMarket {socket} />
		<CreateOrder {socket} />
		<SettleMarket {socket} />
	</div>

	{#each messages as message}
		<pre class="my-2">{JSON.stringify(message)}</pre>
	{/each}
</main>
