<script>
	import '../app.postcss';
	
  import { DarkMode } from 'flowbite-svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input, P } from 'flowbite-svelte';
	import { page } from "$app/stores";
	import { signIn, signOut } from "@auth/sveltekit/client"
</script>

<div>
	<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      class="mr-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      AMC Trainer
    </span>
  </NavBrand>
  <div class="flex md:order-2">
		<DarkMode class="mr-3" />
		{#if $page.data.session}
			<P>Signed in as {$page.data.session.user?.name}</P>
		{:else}
			<Button size="sm" href="/auth/signin" data-sveltekit-preload-data="off">Sign in</Button>	
		{/if}
    <NavHamburger on:click={toggle} />
  </div>
  <NavUl {hidden} class="order-1">
    <NavLi href="/" active={$page.url.pathname == "/"}>Home</NavLi>
    <NavLi href="/about">About</NavLi>
    <NavLi href="/services">Services</NavLi>
    <NavLi href="/pricing">Pricing</NavLi>
    <NavLi href="/contact">Contact</NavLi>
  </NavUl>
</Navbar>
<!--text-slate-900 dark:text-slate-100  -->
<div class="my-5 lg:mx-40 md:mx-20 mx-10 ">
	<slot />
</div>

</div>