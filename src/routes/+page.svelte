<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { Alert, Button, Heading, P, Span } from 'flowbite-svelte';

	import { PUBLIC_ORIGIN } from '$env/static/public';
	import { getContext, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const conversion: (() => void) | undefined = getContext('conversionFunction');

	onMount(() => {
		if (conversion) {
			console.log(conversion);
			console.log('Doing conversion!');
			conversion();
		}
	});
</script>

<svelte:head>
	<title>AMC Trainer</title>
</svelte:head>
{#if data.error}
	<Alert color="red">
		<span class="font-medium">You are not signed in.</span> Please sign in to continue.
	</Alert>
{/if}

<div class="text-center my-40">
	<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
		>Practice problems from AMC 8, 10, 12, and more.
	</Heading>
	<P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>The AMC Trainer has every single problem from AMC 8, 10, 12, and more from contests dating back
		to 1950. Practice for upcoming tests using our database of more than 5000 problems and detailed
		solutions, helping you learn.</P
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
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
			><Span gradient>Customizable</Span> Trainer.</Heading
		>
		<P class="mb-6 text-md lg:text-lg  dark:text-gray-400"
			>AMC Trainer allows you to choose what contests you want to practice on the trainer while
			recording your statistics. It gives you state of the art feedback if you get your answers
			wrong, sometimes giving you several different possible solutions to a single problem. Share
			with your friends how much you have been practicing!</P
		>
	</div>
	<div>
		<img src="/trainer.png" alt="Trainer mode" class="dark:block hidden" />
		<img src="/lighttrainer.png" alt="Trainer mode" class="dark:hidden block" />
	</div>
</div>
