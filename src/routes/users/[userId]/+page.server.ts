import prisma from "$lib/server/prisma"
import { redirect, error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async ({params, locals}) => {
	const session = await locals.getSession();
  if (!session?.user) {
		throw redirect(307, '/?error=auth');
		return {};
	}
	
	const profile = await prisma.profile.findUnique({
		where: {
			id: Number(params.userId)
		},
		select: {
			description: true,
			id: true,
			grad: true,
			createdAt: true,
			user: {
				select: {
					name: true,
					email: true,
					image: true
				}
			}
		}
	});
	if (profile) return { uprof: profile };
	else {
		throw error(404, {
      message: 'This user does not exist.',
			expected: true
    });
	}
}) satisfies PageServerLoad;