<script>
	import { serverState, accountName } from '$lib/api.svelte';
	import * as Table from '$lib/components/ui/table';
	import MarketName from './marketName.svelte';
</script>

<div class="pt-8">
	<h1 class="mb-8 text-xl font-bold">Welcome to Tool's Day!</h1>
	{#if serverState.portfolio}
		<div class="flex flex-col gap-4">
			<p class="text-lg">
				Total Balance: 📎 {new Intl.NumberFormat(undefined, {
					maximumFractionDigits: 4
				}).format(serverState.portfolio.totalBalance ?? 0)}
			</p>
			<p class="text-lg">
				Available Balance: 📎 {new Intl.NumberFormat(undefined, {
					maximumFractionDigits: 4
				}).format(serverState.portfolio.availableBalance ?? 0)}
			</p>
			{#if serverState.portfolio.marketExposures?.length}
				<p class="text-lg">Exposures:</p>
				<Table.Root class="hidden text-center md:block">
					<Table.Header>
						<Table.Row>
							<Table.Head class="text-center">Market</Table.Head>
							<Table.Head class="text-center">Position</Table.Head>
							<Table.Head class="text-center">Total Bid Size</Table.Head>
							<Table.Head class="text-center">Total Offer Size</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each serverState.portfolio.marketExposures as { marketId, position, totalBidSize, totalOfferSize } (marketId)}
							<Table.Row>
								<Table.Cell>
									<MarketName market={serverState.markets.get(marketId)?.definition} />
								</Table.Cell>
								<Table.Cell>
									{new Intl.NumberFormat(undefined, {
										maximumFractionDigits: 2
									}).format(position ?? 0)}
								</Table.Cell>
								<Table.Cell>
									{new Intl.NumberFormat(undefined, {
										maximumFractionDigits: 2
									}).format(totalBidSize ?? 0)}
								</Table.Cell>
								<Table.Cell>
									{new Intl.NumberFormat(undefined, {
										maximumFractionDigits: 2
									}).format(totalOfferSize ?? 0)}
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
				<div class="md:hidden">
					{#each serverState.portfolio.marketExposures as { marketId, position, totalBidSize, totalOfferSize } (marketId)}
						<div class="flex flex-col gap-4 border-b-2">
							<div>
								<span class="font-bold">Market:</span>
								<span><MarketName market={serverState.markets.get(marketId)?.definition} /></span>
							</div>
							<div>
								<span class="font-bold">Position:</span>
								<span
									>{new Intl.NumberFormat(undefined, {
										maximumFractionDigits: 2
									}).format(position ?? 0)}</span
								>
							</div>
							<div>
								<span class="font-bold">Total Bid Size:</span>
								<span
									>{new Intl.NumberFormat(undefined, {
										maximumFractionDigits: 2
									}).format(totalBidSize ?? 0)}</span
								>
							</div>
							<div>
								<span class="font-bold">Total Offer Size:</span>
								<span
									>{new Intl.NumberFormat(undefined, {
										maximumFractionDigits: 2
									}).format(totalOfferSize ?? 0)}</span
								>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	{#if serverState.portfolios.size > 0}
		<div class="mt-8">
			<h2 class="mb-4 text-lg font-bold">All Portfolios</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#each Array.from(serverState.portfolios.entries()) as [accountId, portfolio]}
					<div class="rounded border p-4 shadow">
						<div class="mb-2 font-bold">{accountName(accountId)}</div>
						<div>
							Total Balance: {new Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(
								portfolio.totalBalance ?? 0
							)}
						</div>
						<!-- Add any additional portfolio fields as needed -->
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
