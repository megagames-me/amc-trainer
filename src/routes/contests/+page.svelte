<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Heading, Select, Button, Toggle } from 'flowbite-svelte';
	import { randomBetween } from '$lib/helpers';

	import type { PageData } from './$types';

	export let data: PageData;

	let formattedData: Record<string, Array<{ name: string; value: string }>> = {};

	for (const contest of data.contests!) {
		if (formattedData[contest.type.split('C').join('C ')]) {
			formattedData[contest.type.split('C').join('C ')].push({
				name: contest.formattedTitle,
				value: contest.title
			});
		} else {
			formattedData[contest.type.split('C').join('C ')] = [
				{
					name: contest.formattedTitle,
					value: contest.title
				}
			];
		}
	}

	const contestTypes = Object.keys(formattedData).map((name) => {
		return { value: name.split(' ').join(''), name };
	});

	let selectedType = '';
	let selectedContest = '';

	let randomContestType = true;

	function randomize() {
		if (randomContestType)
			selectedType = contestTypes[randomBetween(0, contestTypes.length - 1)].value;
		else selectedType = selectedType == '' ? 'AMC8' : selectedType;
		selectedContest =
			formattedData[selectedType.split('C').join('C ')][
				randomBetween(0, formattedData[selectedType.split('C').join('C ')].length - 1)
			].value;
	}

	function goToContest() {
		window.location.href = `/contests/${selectedContest}`;
	}
</script>

<svelte:head>
	<title>Trainer | AMC Trainer</title>
</svelte:head>

<Breadcrumb aria-label="Breadcrumbs for contests" class="mb-4">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem href="/contests">Contests</BreadcrumbItem>
</Breadcrumb>

<Heading tag="h1" class="mb-6">Contests</Heading>

<div class="flex mb-4">
	<Select
		items={contestTypes}
		bind:value={selectedType}
		placeholder="Contest type"
		class="!rounded-r-none !w-auto !pl-4"
	/>
	<Select
		items={formattedData[selectedType.split('C').join('C ')]}
		placeholder="Choose a contest"
		bind:value={selectedContest}
		class="!rounded-l-none !pl-4"
	/>
</div>
<div class="flex gap-7 flex-col sm:flex-row mb-4">
	<Button on:click={randomize}>I'm feeling lucky!</Button>
	<Toggle bind:checked={randomContestType}>Choose random contest type</Toggle>
</div>

<Button on:click={goToContest} disabled={!selectedContest} class="w-fit">Go</Button>
