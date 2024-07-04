<script land="ts">
	import { kinde } from '$lib/auth';
	import { Button } from '$lib/components/ui/button/index';
	let responseData = {};
	const testBackend = async () => {
		const accessToken = await kinde.getToken();
		const idToken = await kinde.getIdToken();
		console.log({ accessToken, idToken });
		const res = await fetch('/api', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		const data = await res.json();
		console.log(data);
		responseData = data;
	};
</script>

<main class="container">
	<Button class="my-4" on:click={testBackend}>Test Backend</Button>

	{#if responseData}
		<pre>{JSON.stringify(responseData, null, 2)}</pre>
	{/if}
</main>
