import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { ContestType } from '@prisma/client';

import type { PageServerLoad } from './$types';

interface TrainerProfile {
	id: string | null;
	profile: {
		curProblem: {
			id: number | null;
			title: string | null;
			formattedTitle: string | null;
			contestId: number | null;
			problem: string | null;
			answer?: string | null;
			solutions?: Array<{ text: string; title: string }> | null;
			contest: {
				title: string | null;
				formattedTitle: string | null;
			};
		} | null;
		curProblemId: number | null;
		problemsRight: number | null;
		problemsWrong: number | null;
		problemsSkip: number | null;
		preference: ContestType | null;
		id: number | null;
	};
}

export const load = (async ({ locals }) => {
	const session = await locals.getSession();
	if (!session?.user || !session?.user?.email) {
		throw redirect(307, '/?error=auth');
		return {};
	}

	const profile: TrainerProfile | null = await prisma.user.findUnique({
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
							contest: {
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
