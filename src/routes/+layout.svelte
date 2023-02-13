<script>
	import '../app.postcss';

	import { DarkMode } from 'flowbite-svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
	import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-svelte';

	import { page } from '$app/stores';
	import { initials } from '$lib/helpers';

	import { signIn, signOut } from '@auth/sveltekit/client';

</script>

<div class="flex flex-col min-h-screen">
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<img src="/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				AMC Trainer
			</span>
		</NavBrand>
		<div class="flex md:order-2">
			<DarkMode class="mr-3" />
			{#if $page.data.session}
				<div class="h-0">
					<Button id="nav-user-drop" pill color="light" class="!p-0 !border-0" outline={false}>
						<Avatar src={$page.data.session.user?.image ?? ""}
							>{initials($page.data.session.user?.name ?? "?")}</Avatar
						>
					</Button>
					<Dropdown triggeredBy="button#nav-user-drop">
						<DropdownHeader>
							<span class="block text-sm">{$page.data.session.user?.name}</span>
							<span class="block truncate text-sm font-medium">
								{$page.data.session.user?.email}
							</span>
						</DropdownHeader>
						<DropdownItem href={`/users/${$page.data.profile.id}`}>Profile</DropdownItem>
						<DropdownDivider />
						<DropdownItem on:click={() => {signOut()}}>Sign out</DropdownItem>
					</Dropdown>
				</div>
			{:else}
				<!-- 			<Button size="sm" href="/auth/signin" data-sveltekit-preload-data="off">Sign in</Button>	 -->
				<Button
					size="sm"
					on:click={() => {
						signIn('google', { callbackUrl: 'https://amc.grapecoder.repl.co/' });
					}}>Sign in</Button
				>
			{/if}
			<NavHamburger on:click={toggle} />
		</div>
		<NavUl {hidden} class="order-1">
			<NavLi href="/" active={$page.url.pathname == '/'}>Home</NavLi>
			<NavLi href="/contests" active={$page.url.pathname == '/contests'}>Contests</NavLi>
			<NavLi href="/trainer">Trainer</NavLi>
			<NavLi href="/pricing">Pricing</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</Navbar>
	<!--text-slate-900 dark:text-slate-100  -->
	<div class="flex flex-col my-5 lg:mx-40 md:mx-20 mx-10 grow">
		<slot />
	</div>
</div>
