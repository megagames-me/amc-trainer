<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Heading, P, Select, Button, Toggle } from 'flowbite-svelte';
  import { page } from '$app/stores';
</script>

<Breadcrumb aria-label="Breadcrumbs for users" class="mb-4">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>

<Heading tag="h1" class="mb-4">{$page.error.code} Error</Heading>
<P>{$page.error.message}</P>