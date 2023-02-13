<script lang="ts">
	import { Heading, Avatar, P, Breadcrumb, BreadcrumbItem, A, Textarea, Label, Select, Button, Alert } from "flowbite-svelte";
	import { initials } from "$lib/helpers"
	import { goto } from "$app/navigation"
	
	export let data: PageData;

	let options = [{name: "Prefer not to say", value: null}]
	
	for (let i = 0; i <= 10; i++) {
		options.push({value: new Date().getFullYear() + i, name: `Class of ${new Date().getFullYear() + i}`})
	}

	export let form: ActionData;
	
	let selectedYear = form?.grad ?? data.uprof.grad;
	let descBind = form?.desc ?? data.uprof.description;

	
	
</script>

<Breadcrumb aria-label="Breadcrumbs for users" class="mb-4">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
  <BreadcrumbItem href={"/users/" + data.uprof.id}>{data.uprof.user.name}</BreadcrumbItem>
  <BreadcrumbItem href={"/users/" + data.uprof.id + "/edit"}>Edit</BreadcrumbItem>
	
</Breadcrumb>

<div class="flex items-center gap-3 mb-4">
	<Avatar size="md" src={data.uprof.user?.image ?? ""}>{initials(data.uprof.user?.name ?? "?")}</Avatar>
	<Heading tag="h1" class="!w-auto">{data.uprof.user.name}</Heading>

	

</div>

<P color="text-gray-500 dark:text-gray-400" class="mb-4">Joined AMC Trainer on {data.uprof.createdAt.toLocaleDateString()}</P>

<Heading tag="h3" class="mb-4">Edit your Profile</Heading>

<form method="POST">
	{#if form?.success}
 <Alert color="green" class="mb-4" dismissable>
    <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    </span>
    Changes have been saved. Go back to <a href={"/users/" + data?.uprof?.id} class="font-semibold underline hover:text-green-800 dark:hover:text-green-900">your profile</a>. 
  </Alert>
	{/if}
	
	{#if form?.lengthDesc}
		  <Alert color="red" class="mb-2" dismissable>
    <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    </span>
    Make sure that the length of your description is no longer than 150 letters.
  </Alert>
	{/if}

	{#if form?.gradOut}
		  <Alert color="red" class="mb-2" dismissable>
    <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    </span>
    Make sure that your graduation year is within 10 years of the current year.
  </Alert>
	{/if}
	<Label for="desc" class="mb-2">Description</Label>
	<Textarea id="desc" name="desc" bind:value={descBind} rows="5" class="max-w-3xl mb-4" maxlength={150}>
	
	</Textarea>
	
	<Label for="grad" class="mb-4">Graduation Year
	
	<Select name="grad" id="grad" class="mt-2 max-w-3xl" placeholder="" bind:value={selectedYear} items={options} />
	</Label>

		<Button type="submit">Save Changes</Button>
</form>

<!-- text-blue-600 dark:text-blue-500 -->