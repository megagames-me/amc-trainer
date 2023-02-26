import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		throw redirect(307, '/?error=auth');
		return {};
	}

	const contests = await prisma.contest.findMany({
		select: {
			year: true,
			title: true,
			formattedTitle: true,
			type: true
		}
	});
	return {
		contests
	};
}) satisfies PageServerLoad;
