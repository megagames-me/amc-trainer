<script lang="ts">
	import { navigating, page } from '$app/stores';

	export const conversion = () => {
		if (typeof gtag !== 'undefined') {
			gtag('event', 'conversion', { send_to: 'AW-16452438531/aj4OCInG2o4ZEIOUkaU9' });
		}
	};

	$: if ($navigating && $navigating.to !== null) {
		if (typeof gtag !== 'undefined') {
			console.log('converting!', $navigating);
			gtag('config', 'AW-16452438531', {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=AW-16452438531">
	</script>
	<script>
		if (NODE_ENV === 'production') {
			window.dataLayer = window.dataLayer || [];

			function gtag() {
				dataLayer.push(arguments);
			}

			gtag('js', new Date());
			gtag('config', 'AW-16452438531');
		}
	</script>
</svelte:head>
