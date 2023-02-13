<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Heading, P, Select, Button, Toggle, A, Label, Toast } from 'flowbite-svelte';
	import type { PageData } from './$types';

	import { contestMetadata } from "$lib/helpers";
	
	export let data: PageData;

	const items = [
		{name: "Blank (Unanswered)", value: "0"},
		{name: "A", value: "A"},
		{name: "B", value: "B"},
		{name: "C", value: "C"},
		{name: "D", value: "D"},
		{name: "E", value: "E"},
	];

	let selectedR: Record<number, string> = {};
	let selected: Record<number, string> = {};

	let timerStarted = false;
	let timerBtnText = "Start";
	let timerEnds = Date.now();
	let timerInterval = null;
	let timerTime = contestMetadata[data.contest.type].time;
	let timeText = String(Math.floor(timerTime/(60 * 60 * 1000)) ).padStart(2, "0") + ":" + String(Math.floor(timerTime/(60 * 1000)) % 60).padStart(2, "0") + ":" + String(Math.floor(timerTime/(1000)) % 60).padStart(2, "0");
	let timerEnded = false;

	function getPoints() {
		let ans = 0;
		for (const problemi of data.contest.problems) {
			const num = problemi.problemNum - 1;
			if (selected[num] == "0") {
				ans += contestMetadata[data.contest.type].blank;
			} else if (selected[num] !== problemi.answer) {
				ans += contestMetadata[data.contest.type].incorrect;
			} else {
				ans += contestMetadata[data.contest.type].correct;
			}
		}
		return ans;
	}	

	function getCorrect() {
		let ans = 0;
		for (const problemi of data.contest.problems) {
			const num = problemi.problemNum - 1;
			if (selected[num] == problemi.answer) {
				ans++
			} 
		}
		return ans;
	}
	
	function startTimer() {
		if (timerStarted && !timerEnded) {
			timerEnded = true;
			timerBtnText = "Ended";
			selected = {...selectedR};
			clearInterval(timerInterval);
			return;
		} 
		if (timerEnded) return;
		timerStarted = true;
		timerBtnText = "I'm done";
		timerEnds = Date.now() + contestMetadata[data.contest.type].time;
		timerTime = timerEnds - Date.now();
		
		timerInterval = setInterval(() => {
			timerTime = timerEnds - Date.now();
			timeText = String(Math.floor(timerTime/(60 * 60 * 1000)) ).padStart(2, "0") + ":" + String(Math.floor(timerTime/(60 * 1000)) % 60).padStart(2, "0") + ":" + String(Math.floor(timerTime/(1000)) % 60).padStart(2, "0");

			if (timerTime <= 0) {
				timerEnded = true;
				timerBtnText = "Ended";
				selected = {...selectedR};
				clearInterval(timerInterval);
			}
		}, 50);
	}

	const defaultSelect = 'text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
	const validSelect = "border rounded-lg focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 dark:focus:ring-green-500 bg-green-50 dark:bg-gray-700 text-green-900 placeholder-green-700 dark:text-green-400 dark:placeholder-green-500 border-green-500 dark:border-green-400";
	const invalidSelect = "border rounded-lg focus:ring-red-500 focus:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500 bg-red-50 dark:bg-gray-700 text-red-900 placeholder-red-700 dark:text-red-400 dark:placeholder-red-500 border-red-500 dark:border-red-400";

</script>

<svelte:head>
	<title>{data.contest.formattedTitle} | AMC Trainer</title>
</svelte:head>

<Breadcrumb aria-label="Breadcrumbs for contests" class="mb-4">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
  <BreadcrumbItem href="/contests">Contests</BreadcrumbItem>
	<BreadcrumbItem href={`/contests/${data.contest.title}`}>{data.contest.formattedTitle}</BreadcrumbItem>
</Breadcrumb>

<Heading tag="h1" class="mb-4">{data.contest.formattedTitle}</Heading>
<A href={data.contest.link} class="mb-4" textColor="text-blue-600 dark:text-blue-500" aClass="inline-flex items-center font-medium  hover:underline">
    See on Wiki
    <svg aria-hidden="true" class="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
</A>

<P>In this {contestMetadata[data.contest.type].formattedName} contest, you will have {contestMetadata[data.contest.type].time / (60 * 1000)} minutes to complete {data.contest.problems.length} problems. Answers to questions that are correct will recieve {contestMetadata[data.contest.type].correct} points, incorrect answers will recieve {contestMetadata[data.contest.type].incorrect} points, and answers left blank/unanswered will recieve {contestMetadata[data.contest.type].blank}. {#if contestMetadata[data.contest.type].blank > 0}This means that guessing is penalized.{:else}This means that guessing is not penalized and, in fact, encouraged. Do not leave any answers blank as you will recieve less points.{/if}</P>

{#if !timerStarted}
<P class="mt-2">Please start the timer on the bottom right (or just bottom on mobile) of your screen to begin the contest.</P>
{:else}
	<div class="mb-6"></div>
	{#each data.contest.problems as problemi}
		<div class="mb-6 problem">
			<Heading tag="h2" class="mb-3">{problemi.formattedTitle}</Heading>
			{@html problemi.problem}
			<div class="mt-4 mb-4">
			<Label color={timerEnded ? (problemi.answer == selected[problemi.problemNum - 1] ? "green" : "red") : "gray"}>{timerEnded ? (problemi.answer == selected[problemi.problemNum - 1] ? `Correct! (${contestMetadata[data.contest.type].correct} pts)` : (selected[problemi.problemNum - 1] == "0" ? `Left unanswered. (${contestMetadata[data.contest.type].blank} pts)` : `Incorrect. (${contestMetadata[data.contest.type].incorrect} pts)`)) : "Select an answer"}
			  <Select defaultClass={"mt-2 !max-w-md " + (timerEnded ? (problemi.answer == selected[problemi.problemNum - 1] ? validSelect : invalidSelect) : defaultSelect)} items={items} bind:value={selectedR[problemi.problemNum - 1]} placeholder="" disabled={timerEnded}/>
			</Label>
			</div>
			{#if timerEnded}
				<Heading tag="h3" class="mb-4">Solutions</Heading>
				{#each problemi.solutions as solution}
					<Heading tag="h4" class="mb-2">{solution.title}</Heading>
					{@html solution.text}
				{/each}
			{/if}
		</div>
	{/each}
{/if}



<div class="fixed sm:right-5 sm:bottom-5 sm:left-auto left-2 right-2 bottom-2 sm:w-auto">
	<div class="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
		<div class="flex flex-row gap-4">
			{#if timerStarted}
			<div>
				{#if timerEnded}
				<p>Total points</p>
				<Heading tag="h3" class="!mb-0 inline-block w-auto">{getPoints()}/{data.contest.problems.length * contestMetadata[data.contest.type].correct}</Heading>
				{:else}
				<p>Total answered</p>
				<Heading tag="h3" class="!mb-0 inline-block w-auto">{Object.values(selectedR).filter(t => t !== "0").length}/{data.contest.problems.length}</Heading>
				{/if}
			</div>
			{/if}
			{#if timerEnded && contestMetadata[data.contest.type].correct !== 1 && contestMetadata[data.contest.type].blank !== 0}
			<div>
				<p>Total correct</p>
				<Heading tag="h3" class="!mb-0 inline-block w-auto">{getCorrect()}/{data.contest.problems.length}</Heading>
			</div>
			{/if}
			<div>	
				<p>Time remaining</p>
				<div class="flex gap-4">
					<Heading tag="h3" class="!mb-0 !w-auto">{timeText}</Heading>
					<Button size="sm" on:click={startTimer} disabled={timerEnded}>{timerBtnText}</Button>
				</div>
			</div>
		</div>
	</div>
	
</div>