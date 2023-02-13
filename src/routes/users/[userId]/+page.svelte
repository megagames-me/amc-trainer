<script lang="ts">
import { Heading, Avatar, P, Breadcrumb, BreadcrumbItem, A } from "flowbite-svelte";
import { initials } from "$lib/helpers"
import { Edit } from "svelte-google-materialdesign-icons"

export let data: PageData;

	
  import { page } from '$app/stores';
	// console.log($page);
</script>

<Breadcrumb aria-label="Breadcrumbs for users" class="mb-4">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
  <BreadcrumbItem href={"/users/" + data.uprof.id}>{data.uprof.user.name}</BreadcrumbItem>
	
</Breadcrumb>

<div class="flex items-center gap-3 mb-4">
	<Avatar size="md" src={data.uprof.user?.image ?? ""}>{initials(data.uprof.user?.name ?? "?")}</Avatar>
	<Heading tag="h1" class="!w-auto">{data.uprof.user.name}</Heading>
	{#if data.profile.id == data.uprof.id}
		<A class="hover:after:content-['Edit'] hover:after:ml-1" href={`/users/${data.uprof.id}/edit`}>
			<Edit size={25} />
		</A>
	{/if}
</div>

<P color="text-gray-500 dark:text-gray-400" class="mb-4">Joined AMC Trainer on {data.uprof.createdAt.toLocaleDateString()}</P>

{#if data.uprof.description || data.uprof.grad}
	{#if data.uprof.description}
		<Heading tag="h3" class="mb-2">Description</Heading>
		<P class="mb-4">{data.uprof.description}</P>
	{/if}
	{#if data.uprof.grad}
		<P color="text-gray-500 dark:text-gray-500">Class of {data.uprof.grad}</P>
	{/if}
{:else}
<Heading tag="h3">This user has not customized their profile.</Heading>
{/if}

<!-- text-blue-600 dark:text-blue-500 -->