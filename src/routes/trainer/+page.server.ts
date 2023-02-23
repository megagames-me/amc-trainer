import prisma from "$lib/server/prisma"
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async ({params, locals}) => {
	const session = await locals.getSession();
  if (!session?.user || !session?.user?.email) {
		throw redirect(307, '/?error=auth');
		return {};
	}
	
	const profile = await prisma.user.findUnique({
		where: {
			email: session.user?.email 
		},
		
		select: {
			id: true,
			profile: {
				select: {
					id: true,
					curProblem: {
						select: {
							id: true,
							title: true,
							formattedTitle: true,
							contestId: true,
							problem: true,
							contest : {
								select: {
									title: true,
									formattedTitle: true
								}
							}
						}	
					},
					curProblemId: true,
					problemsRight: true,
					problemsWrong: true,
					problemsSkip: true,
					preference: true
				}
			}
		}
	});


  return {
    profile: profile?.profile
  };
}) satisfies PageServerLoad;