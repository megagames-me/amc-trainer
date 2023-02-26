<script lang="ts">
	import {
		Heading,
		Avatar,
		P,
		Breadcrumb,
		BreadcrumbItem,
		Textarea,
		Label,
		Select,
		Button,
		Alert
	} from 'flowbite-svelte';
	import { initials } from '$lib/helpers';
	import { page } from '$app/stores';

	import type { PageData, ActionData } from './$types';

	export let data: PageData;

	let options = [{ name: 'Prefer not to say', value: 0 }];

	let prefOptions = [
		{ name: 'Any contest type', value: 'ANY' },
		{ name: 'Problems from AMC 8', value: 'AMC8' },
		{ name: 'Problems from AMC 10', value: 'AMC10' },
		{ name: 'Problems from AMC 12', value: 'AMC12' },
		{ name: 'Problems from AHSME', value: 'AHSME' }
	];

	for (let i = 0; i <= 10; i++) {
		options.push({
			value: new Date().getFullYear() + i,
			name: `Class of ${new Date().getFullYear() + i}`
		});
	}

	export let form: ActionData;

	let selectedYear = form?.grad ?? data?.uprof?.grad ?? 0;
	let descBind = form?.desc ?? data?.uprof?.description ?? '';
	let selectedPref = form?.pref ?? data?.uprof?.preference ?? 'ANY';
</script>

<Breadcrumb aria-label="Breadcrumbs for users" class="mb-4">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem href={'/users/' + data?.uprof?.id}>{data?.uprof?.user?.name}</BreadcrumbItem>
	<BreadcrumbItem href={'/users/' + data?.uprof?.id + '/edit'}>Edit</BreadcrumbItem>
</Breadcrumb>

<div class="flex items-center gap-3 mb-4">
	<Avatar size="md" src={data?.uprof?.user?.image ?? ''}
		>{initials(data?.uprof?.user?.name ?? '?')}</Avatar
	>
	<Heading tag="h1" class="!w-auto">{data?.uprof?.user?.name}</Heading>
</div>

<P color="text-gray-500 dark:text-gray-400" class="mb-4"
	>Joined AMC Trainer on {data?.uprof?.createdAt.toLocaleDateString()}</P
>

<Heading tag="h3" class="mb-4">Edit your Profile</Heading>

<form method="POST">
	{#if form?.success}
		<Alert color="green" class="mb-4" dismissable>
			<span slot="icon"
				><svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>
			</span>
			{#if $page.url.search == '?trainer'}
				Changes have been saved. Go back to
				<a
					href="/trainer"
					class="font-semibold underline hover:text-green-800 dark:hover:text-green-900"
					>the trainer</a
				>.
			{:else}
				Changes have been saved. Go back to
				<a
					href={'/users/' + data?.uprof?.id}
					class="font-semibold underline hover:text-green-800 dark:hover:text-green-900"
					>your profile</a
				>.
			{/if}
		</Alert>
	{/if}

	{#if form?.lengthDesc}
		<Alert color="red" class="mb-2" dismissable>
			<span slot="icon"
				><svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>
			</span>
			Make sure that the length of your description is no longer than 150 letters.
		</Alert>
	{/if}

	{#if form?.gradOut}
		<Alert color="red" class="mb-2" dismissable>
			<span slot="icon"
				><svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>
			</span>
			Make sure that your graduation year is within 10 years of the current year.
		</Alert>
	{/if}
	<Label for="desc" class="mb-2">Description</Label>
	<Textarea
		id="desc"
		name="desc"
		bind:value={descBind}
		rows="5"
		class="max-w-3xl mb-4"
		maxlength={150}
	/>

	<Label for="grad" class="mb-6"
		>Graduation Year

		<Select
			name="grad"
			id="grad"
			class="mt-2 max-w-3xl"
			placeholder=""
			bind:value={selectedYear}
			items={options}
		/>
	</Label>

	<Heading tag="h4" class="mb-4">Trainer Options</Heading>

	{#if form?.prefInvalid}
		<Alert color="red" class="mb-2" dismissable>
			<span slot="icon"
				><svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>
			</span>
			Make sure that your preference is valid. Try reloading the page.
		</Alert>
	{/if}

	<Label for="grad" class="mb-4"
		>Contest Source Preference (note: once changed, you must complete the current pending problem
		before recieving a new problem to your preference)

		<Select
			name="pref"
			id="pref"
			class="mt-2 max-w-3xl"
			placeholder=""
			bind:value={selectedPref}
			items={prefOptions}
		/>
	</Label>

	<Button type="submit">Save Changes</Button>
</form>

<!-- text-blue-600 dark:text-blue-500 -->
