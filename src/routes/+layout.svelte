<script lang="ts">
	import '../app.postcss';

	import {
		Avatar,
		Button,
		DarkMode,
		Dropdown,
		DropdownDivider,
		DropdownHeader,
		DropdownItem,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl
	} from 'flowbite-svelte';

	import { page } from '$app/stores';
	import { initials } from '$lib/helpers';

	import { PUBLIC_ORIGIN } from '$env/static/public';
	import Analytics from '$lib/Analytics.svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { setContext } from 'svelte';

	let conversion: (() => void) | undefined;

	$: if (conversion !== undefined) {
		console.log('Setting conversion function', conversion);
		setContext('conversionFunction', conversion);
	}
</script>

<Analytics bind:conversion />
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
						<Avatar src={$page.data.session.user?.image ?? ''}
							>{initials($page.data.session.user?.name ?? '?')}</Avatar
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
						<DropdownItem
							on:click={() => {
								signOut();
							}}>Sign out</DropdownItem
						>
					</Dropdown>
				</div>
			{:else}
				<!-- 			<Button size="sm" href="/auth/signin" data-sveltekit-preload-data="off">Sign in</Button>	 -->
				<Button
					size="sm"
					on:click={() => {
						signIn('google', { callbackUrl: PUBLIC_ORIGIN + '/' });
					}}>Sign in</Button
				>
			{/if}
			<NavHamburger on:click={toggle} />
		</div>
		<NavUl {hidden} class="order-1">
			<NavLi href="/" active={$page.url.pathname == '/'}>Home</NavLi>
			<NavLi href="/contests" active={$page.url.pathname == '/contests'}>Contests</NavLi>
			<NavLi href="/trainer" active={$page.url.pathname == '/trainer'}>Trainer</NavLi>
			<!--
			<NavLi href="/pricing">Pricing</NavLi>
			<NavLi href="/contact">Contact</NavLi>
										-->
		</NavUl>
	</Navbar>
	<!--text-slate-900 dark:text-slate-100  -->
	<div
		class="flex flex-col grow {$page.url.pathname === '/' ? '' : 'my-5 lg:mx-40 md:mx-20 mx-10'}"
	>
		<slot />
	</div>
	{#if $page.url.pathname == '/'}
		<div>
			<footer class="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-12">
				<div class="container mx-auto px-6">
					<div class="grid md:grid-cols-4 gap-8">
						<div>
							<div class="flex items-center gap-2 mb-4">
								<img src="/logo.svg" class="h-8 w-8" alt="Logo" />
								<span class="font-semibold text-lg dark:text-white">AMC Trainer</span>
							</div>
							<p class="text-gray-500 dark:text-gray-400 text-sm">
								The most comprehensive AMC preparation platform for middle and high school students.
							</p>
						</div>

						<div>
							<h4 class="font-semibold mb-4 dark:text-white">Resources</h4>
							<ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
								<li>
									<a
										href="/contests/amc8"
										class="hover:text-gray-900 dark:hover:text-white transition-colors"
									>
										AMC 8 Problems
									</a>
								</li>
								<li>
									<a
										href="/contests/amc10"
										class="hover:text-gray-900 dark:hover:text-white transition-colors"
									>
										AMC 10 Problems
									</a>
								</li>
								<li>
									<a
										href="/contests/amc12"
										class="hover:text-gray-900 dark:hover:text-white transition-colors"
									>
										AMC 12 Problems
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 class="font-semibold mb-4 dark:text-white">Platform</h4>
							<ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
								<li>
									<a
										href="/trainer"
										class="hover:text-gray-900 dark:hover:text-white transition-colors"
									>
										Trainer
									</a>
								</li>
								<li>
									<a
										href="/contests"
										class="hover:text-gray-900 dark:hover:text-white transition-colors"
									>
										Contests
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 class="font-semibold mb-4 dark:text-white">Legal</h4>
							<ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
								<li>
									<a
										href="https://github.com/megagames-me/amc-trainer"
										class="hover:text-gray-900 dark:hover:text-white transition-colors"
									>
										GNU AGPLv3
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div
						class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500 dark:text-gray-400"
					>
						© 2026 AMC Trainer. All rights reserved.
					</div>
				</div>
			</footer>
		</div>
	{/if}
</div>
