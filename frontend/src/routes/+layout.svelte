<script>
	import { kinde } from '$lib/auth';
	import Theme from '$lib/components/theme.svelte';
	import { Button } from '$lib/components/ui/button/index';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
</script>

<ModeWatcher />
<header class="sticky border bg-secondary">
	<nav>
		<ul class="flex justify-between p-4 align-bottom">
			<li class="my-auto">
				<a href="/" class="text-xl font-bold uppercase">Trading Bootcamp</a>
			</li>
			<ul class="flex justify-center gap-4">
				<li>
					{#await kinde.isAuthenticated() then isAuthenticated}
						{#if isAuthenticated}
							<Button on:click={kinde.logout}>Log Out</Button>
						{:else}
							<Button on:click={kinde.login}>Log In</Button>
						{/if}
					{/await}
				</li>
				<li>
					<Theme />
				</li>
			</ul>
		</ul>
	</nav>
</header>
<slot></slot>
