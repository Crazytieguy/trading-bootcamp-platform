<script lang="ts">
	import { accountName, serverState } from '$lib/api.svelte';
	import FlexNumber from '$lib/components/flexNumber.svelte';
	import * as Table from '$lib/components/ui/table';
	import { createVirtualizer, type VirtualItem } from '@tanstack/svelte-virtual';
	import type { websocket_api } from 'schema-js';

	let { trades, lastPrice } = $props<{ 
		trades: websocket_api.ITrade[],
		lastPrice: number 
	}>();

	let virtualTradesEl = $state<HTMLElement | null>(null);

	let tradesVirtualizer = createVirtualizer({
		count: 0,
		getScrollElement: () => virtualTradesEl,
		estimateSize: () => 32,
		overscan: 10
	});

	let totalSize = $state(0);
	let virtualItems = $state<VirtualItem[]>([]);

	$effect(() => {
		$tradesVirtualizer.setOptions({ count: trades.length });
		totalSize = $tradesVirtualizer.getTotalSize();
		virtualItems = $tradesVirtualizer.getVirtualItems();
	});

	const getShortUserName = (id: number | null | undefined) => {
		return accountName(id).split(' ')[0];
	};

	const calculateTradePnL = (trade: websocket_api.ITrade) => {
		if (!lastPrice) return null;
		
		if (trade.buyerId === serverState.userId) {
			return (lastPrice - trade.price) * trade.size;
		} else if (trade.sellerId === serverState.userId) {
			return (trade.price - lastPrice) * trade.size;
		}
		return null;
	};
</script>

<div>
	<h2 class="text-center text-lg font-bold">Trades</h2>
	<Table.Root>
		<Table.Header>
			<Table.Row class="grid h-full grid-cols-[7rem_7rem_3.5rem_3.5rem_4rem_4rem]">
				<Table.Head class="flex items-center justify-center text-center">Buyer</Table.Head>
				<Table.Head class="flex items-center justify-center text-center">Seller</Table.Head>
				<Table.Head class="flex items-center justify-center text-center">Price</Table.Head>
				<Table.Head class="flex items-center justify-center text-center">Size</Table.Head>
				<Table.Head class="flex items-center justify-center text-center">PnL</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<div use:virtualTradesEl class="relative h-full w-full">
				{#each virtualItems as { index, start, size }}
					{#if trades[index]}
						<div
							class="absolute top-0 left-0 w-full"
							style="transform: translateY({start}px); height: {size}px;"
						>
							<Table.Row class="grid h-full grid-cols-[7rem_7rem_3.5rem_3.5rem_4rem_4rem]">
								<Table.Cell class="flex items-center truncate px-1 py-0 text-center">
									{getShortUserName(trades[index].buyerId)}
								</Table.Cell>
								<Table.Cell class="flex items-center truncate px-1 py-0 text-center">
									{getShortUserName(trades[index].sellerId)}
								</Table.Cell>
								<Table.Cell class="flex items-center truncate px-1 py-0 text-center">
									<FlexNumber value={(trades[index].price ?? 0).toString()} />
								</Table.Cell>
								<Table.Cell class="flex items-center truncate px-1 py-0 text-center">
									<FlexNumber value={(trades[index].size ?? 0).toString()} />
								</Table.Cell>
								<Table.Cell class="flex items-center truncate px-1 py-0 text-center">
									{#if calculateTradePnL(trades[index]) !== null}
										<FlexNumber value={calculateTradePnL(trades[index])?.toFixed(2) ?? ''} />
									{/if}
								</Table.Cell>
							</Table.Row>
						</div>
					{/if}
				{/each}
			</div>
		</Table.Body>
	</Table.Root>
</div>
