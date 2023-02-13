<script lang="ts">
import { Breadcrumb, BreadcrumbItem, Heading, P, Select, Button, Toggle } from 'flowbite-svelte';

	export let data: PageData

	console.log(data);
</script>

<div class="flex flex-col h-full grow">
	<Breadcrumb aria-label="Breadcrumbs for trainer" class="mb-4">
	  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	  <BreadcrumbItem href="/trainer">Trainer</BreadcrumbItem>
	</Breadcrumb>
	
	
	<div class="flex flex-col items-center justify-center w-full text-center grow mb-4 border border-gray-200 dark:border-gray-700 rounded-lg p-10 gap-6">
		{#if !data.profile.curProblem}
			<Heading tag="h1">AMC Trainer</Heading>
			<Button>Start</Button>
		{/if}
		
	</div>

</div>