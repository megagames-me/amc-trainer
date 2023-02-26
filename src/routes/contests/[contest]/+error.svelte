<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Heading, P } from 'flowbite-svelte';
	import { page } from '$app/stores';
</script>

<Breadcrumb aria-label="Breadcrumbs for contests" class="mb-4">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem href="/contests">Contests</BreadcrumbItem>
</Breadcrumb>

<Heading tag="h1" class="mb-4">{$page?.error?.code ?? 'Unknown'} Error</Heading>
<P>{$page?.error?.message}</P>
