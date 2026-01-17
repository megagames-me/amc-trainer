<script lang="ts">
	import { A, Breadcrumb, BreadcrumbItem, Heading, P } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>AMC 10 Problems & Solutions | AMC Trainer</title>
	<meta
		name="description"
		content="Practice real AMC 10 problems with detailed solutions. Free archive of AMC 10 contests."
	/>
</svelte:head>

<Breadcrumb aria-label="Breadcrumbs for AMC 10" class="mb-4">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem href="/contests">Contests</BreadcrumbItem>
	<BreadcrumbItem>AMC 10</BreadcrumbItem>
</Breadcrumb>

<Heading tag="h1" class="mb-6">AMC 10 Contests</Heading>

<P class="mb-6 text-gray-500 dark:text-gray-400">
	Browse our archive of AMC 10 contests and solutions. Click on a year to practice.
</P>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
	{#each data.contests as contest}
		<A
			href="/contests/{contest.title}"
			class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
		>
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{contest.formattedTitle}
			</h5>
		</A>
	{/each}
</div>
