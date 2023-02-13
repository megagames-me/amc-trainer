import prisma from "$lib/server/prisma"
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async ({params, locals}) => {
	const session = await locals.getSession();
  if (!session?.user) {
		throw redirect(307, '/?error=auth');
		return {};
	}
	
	const contest = await prisma.contest.findFirst({
		select: {
			year: true,
			title: true,
			formattedTitle: true,
			type: true,
			link: true,
			problems: {
				select: {
					formattedTitle: true,
					link: true,
					answer: true,
					problem: true,
					solutions: true,
					problemNum: true
				},
				orderBy: {
					problemNum: "asc"
				}
			}
		},
		where: {
			title: params.contest
		}
	});
	if (contest) return { contest };
  else {
		throw error(404, {
      message: 'This contest does not exist.',
			expected: true
    });
	}
}) satisfies PageServerLoad;