<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { Alert, Badge, Button, Card } from 'flowbite-svelte';

	import { PUBLIC_ORIGIN } from '$env/static/public';
	import { getContext } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let conversionDone = false;

	let conversion: (() => void) | undefined;

	$: conversion = getContext('conversionFunction');

	$: {
		if (conversion && !conversionDone) {
			console.log(conversion);
			console.log('Doing conversion!');
			conversionDone = true;
			conversion();
		}
	}

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'AMC Trainer',
		url: PUBLIC_ORIGIN,
		description:
			'The best AMC preparation website for students. Practice real AMC 8, 10, and 12 problems with detailed solutions.',
		applicationCategory: 'EducationalApplication',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		}
	};
	const jsonLd = `<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`;
</script>

<svelte:head>
	<title>AMC Practice: Free AMC 8, 10, & 12 Problems & Solutions (1950-2026)</title>
	<meta
		name="description"
		content="The best AMC preparation website for students. Practice real AMC 8, 10, and 12 problems with detailed solutions. Master every competition with our free trainer."
	/>
	<meta
		name="keywords"
		content="AMC practice, AMC 8 Practice, AMC 10 Practice, AMC 12 Practice, AMC 8 Problems and Solutions, AMC 8 10 12 problems, Best AMC preparation websites, AIME prep"
	/>
	<meta
		property="og:title"
		content="AMC Practice: Free AMC 8, 10, & 12 Problems & Solutions (1950-2026)"
	/>
	<meta
		property="og:description"
		content="The best AMC preparation website for students. Practice real AMC 8, 10, and 12 problems with detailed solutions. Master every competition with our free trainer."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={PUBLIC_ORIGIN} />
	<meta property="og:image" content="{PUBLIC_ORIGIN}/trainer.png" />
	<meta property="og:site_name" content="AMC Trainer" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content="AMC Practice: Free AMC 8, 10, & 12 Problems & Solutions (1950-2026)"
	/>
	<meta
		name="twitter:description"
		content="The best AMC preparation website for students. Practice real AMC 8, 10, and 12 problems with detailed solutions. Master every competition with our free trainer."
	/>
	<meta name="twitter:image" content="{PUBLIC_ORIGIN}/trainer.png" />
	<link rel="canonical" href={PUBLIC_ORIGIN} />
	{@html jsonLd}
</svelte:head>
{#if data.error}
	<div class="container mx-auto px-6 mt-4">
		<Alert color="red">
			<span class="font-medium">You are not signed in.</span> Please sign in to continue.
		</Alert>
	</div>
{/if}

<!-- Hero Section -->
<section class="py-20 md:py-32 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
	<div class="container mx-auto px-6">
		<div class="max-w-4xl mx-auto text-center">
			<Badge color="indigo" class="mx-auto mb-6 w-fit text-sm px-3 py-1">
				Over 5,000+ AMC problems with solutions
			</Badge>
			<h1 class="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
				Master the AMC with
				<span class="text-blue-600 dark:text-blue-500">structured practice</span>
			</h1>
			<p class="mx-auto mb-8 max-w-2xl text-lg text-gray-500 dark:text-gray-400 md:text-xl">
				The most comprehensive AMC 8, AMC 10, and AMC 12 preparation platform. Practice with real
				problems, track your progress, and achieve your target score.
			</p>
			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				{#if data?.session?.user}
					<Button size="xl" href="/trainer" class="gap-2">
						Start Practicing Free
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="h-4 w-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
							/>
						</svg>
					</Button>
				{:else}
					<Button
						size="xl"
						on:click={() => {
							signIn('google', { callbackUrl: PUBLIC_ORIGIN + '/trainer' });
						}}
						class="gap-2"
					>
						Start Practicing Free
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="h-4 w-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
							/>
						</svg>
					</Button>
				{/if}
				<Button size="xl" color="alternative" href="/contests">View Problem Archive</Button>
			</div>
			<p class="mt-4 text-sm text-gray-500">
				No credit card required • Full access • Forever free and open source
			</p>
		</div>
	</div>
</section>

<!-- Stats Section -->
<section class="border-y border-gray-200 bg-gray-50 py-12 dark:border-gray-700 dark:bg-gray-800/50">
	<div class="container mx-auto px-6">
		<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
			<div class="text-center">
				<div class="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">5,000+</div>
				<div class="mt-1 text-gray-500 dark:text-gray-400">Practice Problems</div>
			</div>
			<div class="text-center">
				<div class="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">75+</div>
				<div class="mt-1 text-gray-500 dark:text-gray-400">Years of AMC Tests</div>
			</div>
			<div class="text-center">
				<div class="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">2,000+</div>
				<div class="mt-1 text-gray-500 dark:text-gray-400">Students Practicing</div>
			</div>

			<div class="text-center">
				<div class="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">92%</div>
				<div class="mt-1 text-gray-500 dark:text-gray-400">Score Improvement</div>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
	<div class="container mx-auto px-6">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold md:text-4xl">Everything you need to succeed</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400">
				Access a massive database of AMC 8, 10, and 12 problems and solutions dating back to 1950.
				If you miss a question, our trainer provides state-of-the-art feedback and multiple detailed
				solutions to help you master complex concepts.
			</p>
		</div>

		<!-- Screenshot showcase -->
		<div class="mx-auto mb-16 max-w-3xl">
			<div
				class="rounded-2xl border border-gray-200 bg-gray-100 p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800"
			>
				<img
					src="/trainer.png"
					alt="AMC Trainer problem interface"
					class="w-full rounded-xl hidden dark:block"
				/>
				<img
					src="/lighttrainer.png"
					alt="AMC Trainer problem interface"
					class="w-full rounded-xl block dark:hidden"
				/>
			</div>
		</div>

		<!-- Feature Cards - 2x2 grid -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			<Card padding="xl" class="border border-gray-200 dark:border-gray-700">
				<div
					class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900"
				>
					<!-- BookOpen Icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-5 w-5 text-blue-600 dark:text-blue-400"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold">Complete Problem Archive</h3>
				<p class="text-sm text-gray-500 dark:text-gray-400">
					Access every AMC 8, 10, and 12 problem from 1950 to present with detailed solutions.
				</p>
			</Card>

			<Card padding="xl" class="border border-gray-200 dark:border-gray-700">
				<div
					class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900"
				>
					<!-- Layers Icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-5 w-5 text-blue-600 dark:text-blue-400"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold">Multiple Solutions</h3>
				<p class="text-sm text-gray-500 dark:text-gray-400">
					Learn different approaches to the same problem from step-by-step solutions by top scorers.
				</p>
			</Card>

			<Card padding="xl" class="border border-gray-200 dark:border-gray-700">
				<div
					class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900"
				>
					<!-- Clock Icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-5 w-5 text-blue-600 dark:text-blue-400"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold">Timed Practice Tests</h3>
				<p class="text-sm text-gray-500 dark:text-gray-400">
					Simulate real test conditions with full-length practice exams under pressure.
				</p>
			</Card>

			<Card padding="xl" class="border border-gray-200 dark:border-gray-700">
				<div
					class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900"
				>
					<!-- Play Icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="h-5 w-5 text-blue-600 dark:text-blue-400"
					>
						<path
							fill-rule="evenodd"
							d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold">Trainer Mode</h3>
				<p class="text-sm text-gray-500 dark:text-gray-400">
					Solve one question at a time instead of a full timed test for focused practice.
				</p>
			</Card>
		</div>
	</div>
</section>

<!-- Problem Categories -->
<section class="border-y border-gray-200 bg-gray-50 py-20 dark:border-gray-700 dark:bg-gray-800/50">
	<div class="container mx-auto px-6">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
				Browse by Competition
			</h2>
			<p class="text-lg text-gray-500 dark:text-gray-400">
				Find problems organized by test type and difficulty level
			</p>
		</div>

		<div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
			<a href="/contests/amc8" class="group block">
				<Card
					class="h-full cursor-pointer border-gray-200 transition-colors hover:border-blue-500/50 dark:border-gray-700"
				>
					<div class="pt-6 text-center">
						<div class="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-500">AMC 8</div>
						<p class="mb-4 text-gray-500 dark:text-gray-400">Middle School Level</p>
						<div class="space-y-2 text-sm text-gray-900 dark:text-white">
							<div class="flex items-center justify-center gap-2">
								<!-- CheckCircle2 -->
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="h-4 w-4 text-blue-600 dark:text-blue-500"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>950+ Problems</span>
							</div>
							<div class="flex items-center justify-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="h-4 w-4 text-blue-600 dark:text-blue-500"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>Grades 6-8</span>
							</div>
						</div>
						<p
							class="mt-4 flex items-center justify-center font-medium text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-500"
						>
							Explore Problems
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								class="ml-1 h-4 w-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
								/>
							</svg>
						</p>
					</div>
				</Card>
			</a>

			<a href="/contests/amc10" class="group block">
				<Card
					class="h-full cursor-pointer border-gray-200 transition-colors hover:border-blue-500/50 dark:border-gray-700"
				>
					<div class="pt-6 text-center">
						<div class="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-500">AMC 10</div>
						<p class="mb-4 text-gray-500 dark:text-gray-400">High School Level I</p>
						<div class="space-y-2 text-sm text-gray-900 dark:text-white">
							<div class="flex items-center justify-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="h-4 w-4 text-blue-600 dark:text-blue-500"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>2,100+ Problems</span>
							</div>
							<div class="flex items-center justify-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="h-4 w-4 text-blue-600 dark:text-blue-500"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>Grades 9-10</span>
							</div>
						</div>
						<p
							class="mt-4 flex items-center justify-center font-medium text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-500"
						>
							Explore Problems
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								class="ml-1 h-4 w-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
								/>
							</svg>
						</p>
					</div>
				</Card>
			</a>

			<a href="/contests/amc12" class="group block">
				<Card
					class="h-full cursor-pointer border-gray-200 transition-colors hover:border-blue-500/50 dark:border-gray-700"
				>
					<div class="pt-6 text-center">
						<div class="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-500">AMC 12</div>
						<p class="mb-4 text-gray-500 dark:text-gray-400">High School Level II</p>
						<div class="space-y-2 text-sm text-gray-900 dark:text-white">
							<div class="flex items-center justify-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="h-4 w-4 text-blue-600 dark:text-blue-500"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>2,100+ Problems</span>
							</div>
							<div class="flex items-center justify-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="h-4 w-4 text-blue-600 dark:text-blue-500"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>Grades 11-12</span>
							</div>
						</div>
						<p
							class="mt-4 flex items-center justify-center font-medium text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-500"
						>
							Explore Problems
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								class="ml-1 h-4 w-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
								/>
							</svg>
						</p>
					</div>
				</Card>
			</a>
		</div>
	</div>
</section>

<!-- Testimonial -->
<section class="border-b border-gray-200 bg-gray-50 py-20 dark:border-gray-700 dark:bg-gray-800/50">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-3xl text-center">
			<!-- Trophy Icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="mx-auto mb-6 h-12 w-12 text-blue-600 dark:text-blue-500"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
				/>
			</svg>
			<blockquote class="mb-6 text-2xl font-medium md:text-3xl text-gray-900 dark:text-white">
				"I improved from a 80 to a 126 on the AMC 10 in just three months. The structured practice
				and detailed solutions made all the difference."
			</blockquote>
			<div>
				<div class="font-semibold text-gray-900 dark:text-white">Sarah Chen</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="mb-4 text-3xl font-bold md:text-4xl">Ready to start your AMC journey?</h2>
			<p class="mb-8 text-lg text-gray-500 dark:text-gray-400">
				Join thousands of students who have improved their scores with AMC Trainer.
			</p>
			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<Button
					size="xl"
					on:click={() => {
						if (data?.session?.user) {
							// if signed in, go to trainer
							window.location.href = '/trainer';
						} else {
							// if not signed in, sign in
							signIn('google', { callbackUrl: PUBLIC_ORIGIN + '/trainer' });
						}
					}}
					class="gap-2"
				>
					{data?.session?.user ? 'Go to Trainer' : 'Create Free Account'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						class="h-4 w-4"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
						/>
					</svg>
				</Button>
				<Button size="xl" color="alternative" href="/contests">Browse Problems</Button>
			</div>
		</div>
	</div>
</section>
