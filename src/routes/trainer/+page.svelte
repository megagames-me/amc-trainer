<script lang="ts">
import { Breadcrumb, BreadcrumbItem, Heading, P, Select, Button, Toggle, Radio, Spinner } from 'flowbite-svelte';

	export let data: PageData

	// console.log(data);

	let startLoading = false;
	
	async function startTrainer() {
		startLoading = true;
		let problemData;
		try {
			problemData = await fetch("https://amc.grapecoder.repl.co/api/trainer", {
				headers: {
					'Accept': 'application/json'
				}
			})
		} catch(e) {
			console.error(e);
			// TODO: Make better
			alert("Please try again.")
		}

		problemData = await problemData.json();

		data.profile.curProblem = problemData;
	}

	
</script>

<div class="flex flex-col h-full grow">
	<Breadcrumb aria-label="Breadcrumbs for trainer" class="mb-4">
	  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	  <BreadcrumbItem href="/trainer">Trainer</BreadcrumbItem>
	</Breadcrumb>
	
	

	{#if !data.profile.curProblem}
		<div class="flex flex-col items-center justify-center w-full text-center grow mb-4 border border-gray-300 dark:border-gray-700 rounded-lg p-10 gap-6">
			<Heading tag="h1">AMC Trainer</Heading>
			<Button on:click={startTrainer} disabled={startLoading}> <Spinner size="4" color="white" class={(startLoading ? "" : "hidden ") + "mr-3"} /> Start</Button>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center w-full text-center grow mb-4 border border-gray-300 dark:border-gray-700 rounded-lg p-10 gap-6">
			<div class="flex flex-col gap-3">
				<Heading tag="h1">{data.profile.curProblem.formattedTitle}</Heading>
				<Heading tag="h4" class="!text-slate-500 dark:!text-slate-500 italic !font-semibold">from the {data.profile.curProblem.contest.formattedTitle}</Heading>
			</div>

			<div class="problem problem-scaled">
				{@html data.profile.curProblem.problem}
			</div>

			<div class="flex flex-row gap-3">
				<ul class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x divide-gray-200 dark:divide-gray-600">
				  <li class="w-full"><Radio name="answer" class="p-3">A</Radio></li>
				  <li class="w-full"><Radio name="answer" class="p-3">B</Radio></li>
				  <li class="w-full"><Radio name="answer" class="p-3">C</Radio></li>
				  <li class="w-full"><Radio name="answer" class="p-3">D</Radio></li>
					<li class="w-full"><Radio name="answer" class="p-3">E</Radio></li>
				</ul>
				<Button>Submit</Button>
				<Button color="red" class="w-full">Give up</Button>
			</div>

			<div>
				<p class="text-slate-500">Stats: <span class="text-green-500">{data.profile.problemsRight}</span> | <span class="text-yellow-400">{data.profile.problemsSkip}</span> | <span class="text-red-500">{data.profile.problemsWrong}</span></p>
			</div>
		</div>
	{/if}
		
	
	
</div>