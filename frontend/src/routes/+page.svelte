<script lang="ts">
	import { kinde } from '$lib/auth';
	import { Button } from '$lib/components/ui/button/index';
	import { websocket_api } from 'schema-js';

	let messages: websocket_api.ServerMessage[] = [];

	const testBackend = async () => {
		const accessToken = await kinde.getToken();
		if (!accessToken) {
			console.log('no access token');
			return;
		}
		const socket = new WebSocket('/api');
		socket.onopen = () => {
			const authenticate = websocket_api.ClientMessage.encode({
				authenticate: {
					jwt: accessToken
				}
			}).finish();
			socket.send(authenticate);
		};
		socket.onmessage = async (event) => {
			const data = await event.data.arrayBuffer();
			const msg = websocket_api.ServerMessage.decode(new Uint8Array(data));
			messages = [...messages, msg];
		};
	};
</script>

<main class="container">
	<Button class="my-4" on:click={testBackend}>Test Backend</Button>

	{#each messages as message}
		<pre>{JSON.stringify(message)}</pre>
	{/each}
</main>
