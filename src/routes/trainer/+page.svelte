<script lang="ts">
	import {
		Breadcrumb,
		BreadcrumbItem,
		Heading,
		P,
		Button,
		Radio,
		Spinner,
		AccordionItem,
		Accordion,
		A
	} from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	// console.log(data);

	const possibleAnswers = ['A', 'B', 'C', 'D', 'E'];

	let startLoading = false;
	let checkingAnswer = false;
	let results:
		| false
		| {
				result: 'correct' | 'skipped' | 'wrong';
		  } = false;

	let answer: string | undefined = undefined;

	async function startTrainer() {
		startLoading = true;

		let problemData;
		try {
			problemData = await fetch('/api/trainer', {
				headers: {
					Accept: 'application/json'
				}
			});
			if (!problemData?.ok) {
				console.error(problemData.statusText);
				// TODO: Make better
				alert('Please try again.');
			}
		} catch (e) {
			console.error(e);
			// TODO: Make better
			alert('Please try again.');
		}
		if (!problemData) {
			console.error('No result');
			alert('Please try again.');
			return;
		}
		results = false;
		problemData = await problemData.json();
		answer = undefined;
		if (data?.profile) data.profile.curProblem = problemData;

		startLoading = false;
	}

	async function giveUp() {
		answer = undefined;
		await submitAnswer();
	}
	async function submitAnswer() {
		checkingAnswer = true;
		let result;
		try {
			result = await fetch('/api/trainer', {
				method: 'POST',
				body: JSON.stringify({ answer: answer ?? null }),
				headers: {
					Accept: 'application/json',
					'content-type': 'application/json'
				}
			});
			if (!result.ok) {
				console.error(result.statusText);
				// TODO: Make better
				alert('Please try again.');
			}
		} catch (e) {
			console.error(e);
			// TODO: Make better
			alert('Please try again.');
		}
		if (!result) {
			console.error('No result');
			alert('Please try again.');
			return;
		}
		result = await result.json();

		checkingAnswer = false;
		if (data?.profile) {
			data.profile.curProblem = result.curProblem;
			data.profile.problemsRight = result.problemsRight;
			data.profile.problemsWrong = result.problemsWrong;
			data.profile.problemsSkip = result.problemsSkip;
		}
		results = result;
		console.log(results);
	}
</script>

<div class="flex flex-col h-full grow">
	<Breadcrumb aria-label="Breadcrumbs for trainer" class="mb-4">
		<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
		<BreadcrumbItem href="/trainer">Trainer</BreadcrumbItem>
	</Breadcrumb>

	{#if !data?.profile?.curProblem}
		<div
			class="flex flex-col items-center justify-center w-full text-center grow mb-4 border border-gray-300 dark:border-gray-700 rounded-lg p-10 gap-6"
		>
			<Heading tag="h1">AMC Trainer</Heading>
			<div class="flex flex-row gap-2">
				<Button on:click={startTrainer} disabled={startLoading}>
					<Spinner size="4" color="white" class={(startLoading ? '' : 'hidden ') + 'mr-3'} /> Start</Button
				>
				<Button href={`/users/${data?.profile?.id}/edit?trainer`}>Settings</Button>
			</div>
		</div>
	{:else}
		<div
			class="flex flex-col items-center justify-center w-full text-center grow mb-4 border border-gray-300 dark:border-gray-700 rounded-lg p-10 gap-6"
		>
			<div class="flex flex-col gap-3">
				<Heading tag="h1">{data?.profile?.curProblem?.formattedTitle}</Heading>
				<Heading tag="h4" class="!text-slate-500 dark:!text-slate-500 italic !font-semibold"
					>from the {data?.profile?.curProblem?.contest?.formattedTitle}</Heading
				>
			</div>

			<div class="problem problem-scaled">
				{@html data?.profile?.curProblem?.problem}
			</div>

			{#if results}
				<div class="flex flex-col gap-2">
					{#if results.result == 'correct'}
						<Heading tag="h3">Correct!</Heading>
					{:else if results.result == 'skipped'}
						<Heading tag="h3">Given up.</Heading>
						<P>The correct answer was {data?.profile?.curProblem?.answer}.</P>
					{:else}
						<Heading tag="h3">Incorrect.</Heading>
						<P>The correct answer was {data?.profile?.curProblem?.answer}.</P>
					{/if}
				</div>
			{/if}
			<div class="flex flex-row gap-3">
				<ul
					class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x divide-gray-200 dark:divide-gray-600"
				>
					{#each possibleAnswers as pAnswer}
						{#if results}
							<li class="w-full">
								<Radio
									name="answer"
									disabled={results}
									bind:group={answer}
									class={'p-3 ' +
										(data?.profile?.curProblem?.answer == pAnswer
											? '!text-green-400 dark:!text-green-500'
											: answer == pAnswer
											? '!text-red-400 dark:!text-red-500'
											: '')}
									value={pAnswer}>{pAnswer}</Radio
								>
							</li>
						{:else}
							<li class="w-full">
								<Radio
									name="answer"
									disabled={results}
									bind:group={answer}
									class="p-3"
									value={pAnswer}>{pAnswer}</Radio
								>
							</li>
						{/if}
					{/each}
				</ul>
				{#if results}
					<Button on:click={startTrainer} disabled={startLoading}>
						<Spinner size="4" color="white" class={(startLoading ? '' : 'hidden ') + 'mr-3'} /> Next</Button
					>
				{:else}
					<Button on:click={submitAnswer} disabled={!answer || checkingAnswer}>
						<Spinner
							size="4"
							color="white"
							class={(checkingAnswer ? '' : 'hidden ') + 'mr-3'}
						/>{' '}Submit</Button
					>
					<Button on:click={giveUp} disabled={checkingAnswer} color="red" class="w-full"
						><Spinner
							size="4"
							color="white"
							class={(checkingAnswer ? '' : 'hidden ') + 'mr-3'}
						/>{' '}Give up</Button
					>
				{/if}
			</div>

			{#if results && data?.profile?.curProblem?.solutions !== undefined && data?.profile?.curProblem?.solutions !== null && data?.profile?.curProblem?.solutions?.length > 0}
				<div class="flex flex-col gap-3 w-full">
					<Heading tag="h2">Solutions</Heading>

					<Accordion
						multiple
						class="w-full"
						inactiveClasses="text-gray-500 dark:text-gray-400 hover:!bg-gray-200 hover:dark:!bg-gray-700"
						activeClasses="!bg-gray-200 dark:!bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:!ring-gray-200 dark:focus:!ring-gray-700"
					>
						{#if data?.profile?.curProblem?.solutions !== undefined && data?.profile?.curProblem?.solutions !== null && data?.profile?.curProblem?.solutions?.length > 0}
							{#each data?.profile?.curProblem?.solutions as solution, i}
								<AccordionItem open={i == 0}>
									<span slot="header">{solution.title}</span>
									<div class="problem">
										{@html solution.text}
									</div>
								</AccordionItem>
							{/each}
						{/if}
					</Accordion>
				</div>
			{/if}
			<div class="flex flex-col gap-2">
				<p class="text-slate-500">
					Stats: <span class="text-green-500">{data?.profile?.problemsRight}</span> |
					<span class="text-yellow-400">{data?.profile?.problemsSkip}</span>
					| <span class="text-red-500">{data?.profile?.problemsWrong}</span>
				</p>
				{#if data?.profile?.preference !== 'ANY'}
					<p class="text-slate-500">
						Currently serving problems only from {data?.profile?.preference?.replace(
							'AMC',
							'AMC '
						)}, change this <A href={`/users/${data?.profile?.id}/edit?trainer`}>here</A>.
					</p>
				{:else}
					<p class="text-slate-500">
						Currently serving problems from any contest, change this <A
							href={`/users/${data?.profile?.id}/edit?trainer`}>here</A
						>.
					</p>
				{/if}
				<p class="hidden dark:block text-slate-500">Note that diagrams will appear inverted in dark mode. Shaded/darkened areas will be lightened areas instead.</p>
			</div>
		</div>
	{/if}
</div>
