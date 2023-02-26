import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import type { ContestType } from '@prisma/client';

type ContestJSON = {
	title: string;
	formattedTitle: string;
	link: string;
	type: ContestType;
	problems: {
		formattedTitle: string;
		problem: string;
		link: string;
		answer: string;
		solutions: Array<{ text: string; title: string }>;
		problemNum: number;
	}[];
	year: number;
} | null;

export const load = (async ({ params, locals }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		throw redirect(307, '/?error=auth');
		return {};
	}

	// @ts-expect-error prisma does not allow for typing of JSONValue
	const contest: ContestJSON = await prisma.contest.findFirst({
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
					problemNum: 'asc'
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
			code: 404
		});
	}
}) satisfies PageServerLoad;
