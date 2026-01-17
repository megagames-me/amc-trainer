<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { Alert, Button, Heading, P, Span } from 'flowbite-svelte';

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
	<Alert color="red">
		<span class="font-medium">You are not signed in.</span> Please sign in to continue.
	</Alert>
{/if}

<div class="text-center my-40">
	<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
		>The Ultimate AMC 8, 10, and 12 Practice Platform
	</Heading>
	<P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>The AMC Trainer is designed to be the best AMC preparation website for students aiming for top
		scores. Our platform allows you to build a personalized study plan by choosing specific <a
			href="/contests/amc8"
			class="text-blue-500 hover:underline">AMC 8</a
		>,
		<a href="/contests/amc10" class="text-blue-500 hover:underline">AMC 10</a>, and
		<a href="/contests/amc12" class="text-blue-500 hover:underline">AMC 12</a> practice modules while
		tracking your performance statistics in real-time.</P
	>
	{#if data?.session?.user}
		<Button href="/trainer"
			>Start Training
			<svg
				class="ml-2 -mr-1 w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/></svg
			>
		</Button>
	{:else}
		<Button
			on:click={() => {
				signIn('google', { callbackUrl: PUBLIC_ORIGIN + '/' });
			}}
			>Sign up with Google
			<svg
				class="ml-2 -mr-1 w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/></svg
			>
		</Button>
	{/if}
</div>
<div
	class="text-left mb-40  flex xl:grid xl:grid-cols-2 flex-col xl:gap-20 gap-10 justify-center items-center"
>
	<div>
		<Heading tag="h2" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
			><Span gradient>Customizable</Span> AMC Practice & Training.</Heading
		>
		<P class="mb-6 text-md lg:text-lg  dark:text-gray-400">
			Access a massive database of AMC 8, 10, and 12 problems and solutions dating back to 1950. If
			you miss a question, our trainer provides state-of-the-art feedback and multiple detailed
			solutions to help you master complex concepts. Whether you are preparing for the AMC 8 or
			pushing for AIME qualification, you can save your progress and share your training milestones
			with friends!</P
		>
	</div>
	<div>
		<img
			src="/trainer.png"
			alt="AMC Trainer interface showing practice problems"
			class="dark:block hidden"
		/>
		<img
			src="/lighttrainer.png"
			alt="AMC Trainer interface showing practice problems in light mode"
			class="dark:hidden block"
		/>
	</div>
</div>
