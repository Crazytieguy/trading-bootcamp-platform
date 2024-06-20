<script lang="ts">
	import { kinde } from '$lib/auth';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import '../app.postcss';

	const isAuthenticatedPromise = kinde.isAuthenticated();
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Trading Bootcamp</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#await isAuthenticatedPromise then isAuthenticated}
					{#if isAuthenticated}
						<button class="btn variant-filled-primary" on:click={kinde.logout}>Logout</button>
					{:else}
						<button class="btn variant-filled-primary" on:click={kinde.login}>Login</button>
					{/if}
				{/await}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
