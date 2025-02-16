<script lang="ts">
    import { serverState } from '$lib/api.svelte';
    import * as Select from '$lib/components/ui/select';
    import {
		midPrice as getMidPrice,
		maxClosedTransactionId,
		ordersAtTransaction,
		sortedBids,
		sortedOffers,
		tradesAtTransaction
	} from '$lib/components/marketDataUtils';
    const openMarkets = $derived(
        Array.from(serverState.markets.values())
            .filter(m => m.definition.open)
            .sort((a, b) => (a.definition.name || '').localeCompare(b.definition.name || ''))
    );

    let selectedMarketId = $state<number>();
    
    const selectedMarketInfo = $derived(() => {
        const selectedMarket = selectedMarketId ? serverState.markets.get(selectedMarketId) : undefined;
        if (selectedMarket) {
            const orders = selectedMarket.orders;
            const bids = sortedBids(orders);
            const offers = sortedOffers(orders);
            const midPrice = getMidPrice(bids, offers);
            const spread = offers[0]?.price && bids[0]?.price ? offers[0].price - bids[0].price : undefined;
            return { midPrice, spread };
        }
        return { midPrice: undefined, spread: undefined };
    })
</script>

<div class="flex flex-col gap-2">
    <Select.Root 
        bind:value={selectedMarketId as string}
        items={openMarkets.filter(m => m.definition.id && m.definition.name).map(m => ({ value: m.definition.id, label: m.definition.name }))}
    >
        <Select.Trigger class="w-full">
            <Select.Value placeholder="Select a market..." />
        </Select.Trigger>
        <Select.Content>
            {#each openMarkets as market}
                <Select.Item value={market.definition.id}>
                    {market.definition.name}
                </Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>
    
    {#if selectedMarketId}
        <div class="text-sm">
            <p>Mid Price: {selectedMarketInfo().midPrice ?? '-'}</p>
            <p>Spread: {selectedMarketInfo().spread !== undefined ? selectedMarketInfo().spread.toFixed(2) : '-'}</p>
        </div>
    {/if}
</div>
