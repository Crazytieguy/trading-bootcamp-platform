<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { accountName } from '$lib/api.svelte';
	import type { websocket_api } from 'schema-js';

	interface Position {
		userId: number;
		position: number;
	}

	let { trades }: { trades: websocket_api.ITrade[] } = $props();

	function aggregateTradesByAccount(trades: websocket_api.ITrade[]) {
		const result: Record<number, { net: number }> = {};

		for (const t of trades) {
			const buyerRec = (result[t.buyerId!] ??= { net: 0 });
			const sellerRec = (result[t.sellerId!] ??= { net: 0 });

			buyerRec.net += t.size ?? 0;
			sellerRec.net -= t.size ?? 0;
		}

		return result;
	}

	let positions = $derived(
		Object.entries(aggregateTradesByAccount(trades)).map(([userId, data]) => ({
			userId: Number(userId),
			position: data.net
		}))
	);

	const getShortTraderName = (id: number) => {
		const name = accountName(id);
		return name.substring(3);
	};
</script>

<div>
	<Table.Root>
		<Table.Header>
			<Table.Row class="grid h-full grid-cols-[5rem_4rem]">
				<Table.Head class="text-center text-xs">Trader</Table.Head>
				<Table.Head class="text-center text-xs">Pos</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each positions as position}
				<Table.Row class="grid h-full grid-cols-[5rem_4rem]">
					<Table.Cell class="truncate px-1 py-0.5 text-center text-sm">
						{getShortTraderName(position.userId)}
					</Table.Cell>
					<Table.Cell class="px-1 py-0.5 text-center text-sm">
						{position.position.toFixed(1)}
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
