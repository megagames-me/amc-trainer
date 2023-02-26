<script lang="ts">
	import { Heading, Avatar, P, Breadcrumb, BreadcrumbItem, A } from 'flowbite-svelte';
	import { initials } from '$lib/helpers';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Breadcrumb aria-label="Breadcrumbs for users" class="mb-4">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem href={'/users/' + data?.uprof?.id}>{data?.uprof?.user?.name}</BreadcrumbItem>
</Breadcrumb>

<div class="flex items-center gap-3 mb-4">
	<Avatar size="md" src={data?.uprof?.user?.image ?? ''}
		>{initials(data?.uprof?.user?.name ?? '?')}</Avatar
	>
	<Heading tag="h1" class="!w-auto">{data?.uprof?.user?.name}</Heading>
	{#if data?.profile?.id == data?.uprof?.id}
		<A
			class="hover:after:content-['Edit'] hover:after:ml-1"
			href={`/users/${data?.uprof?.id}/edit`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-[27px] !fill-blue-600 hover:underline"
				viewBox="0 0 576 512"
				><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path
					d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
				/></svg
			>
		</A>
	{/if}
</div>

<P color="text-gray-500 dark:text-gray-400" class="mb-4"
	>Joined AMC Trainer on {data?.uprof?.createdAt?.toLocaleDateString()}</P
>

<!-- {#if data.uprof.description || data.uprof.grad} -->
{#if data?.uprof?.description}
	<Heading tag="h3" class="mb-2">Description</Heading>
	<P class="mb-4">{data?.uprof?.description}</P>
{/if}
<Heading tag="h3" class="mb-2">Trainer Information</Heading>
{#if data?.uprof?.preference}
	<P class="mb-4"
		>Practicing {data?.uprof?.preference.replace('AMC', 'AMC ')} problems on the trainer.</P
	>
{/if}
<P class="mb-4"
	>Trainer Stats: <span class="text-green-500">{data?.uprof?.problemsRight}</span> |
	<span class="text-yellow-400">{data?.uprof?.problemsSkip}</span>
	| <span class="text-red-500">{data?.uprof?.problemsWrong}</span></P
>
{#if data?.uprof?.grad}
	<P color="text-gray-500 dark:text-gray-500">Class of {data?.uprof?.grad}</P>
{/if}
<!-- {:else}
	<Heading tag="h3">This user has not customized their profile.</Heading>
{/if} -->

<!-- text-blue-600 dark:text-blue-500 -->
