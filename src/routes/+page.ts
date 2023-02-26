import type { PageLoad } from './$types';

export const load = (async (event) => {
	return {
		error: event.url.searchParams.get('error')
	};
}) satisfies PageLoad;
