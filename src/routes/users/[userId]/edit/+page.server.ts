import prisma from '$lib/server/prisma';
import { redirect, error, fail } from '@sveltejs/kit';
import { ContestType } from '$lib/contesttype';
import type { ContestType as ContestTypeType } from '@prisma/client';

import type { PageServerLoad, Actions } from './$types';

export const actions = {
	default: async (event) => {
		const session = await event.locals.getSession();
		const user = await prisma.profile.findUnique({
			where: { id: Number(event.params.userId) },
			include: { user: true }
		});

		const data = await event.request.formData();
		let grad: number | null = Number(data.get('grad'));
		const desc = String(data.get('desc'));
		const pref = String(data.get('pref'));

		if (grad == 0) grad = null;

		if (!session?.user) {
			return fail(403, { grad, desc, pref, authedFull: false });
		}

		if (!user) {
			return fail(404, { grad, desc, pref, userExists: false });
		}

		if (user?.user?.email !== session?.user?.email) {
			return fail(403, { grad, desc, pref, authed: false });
		}

		if (desc && desc?.length > 150) {
			return fail(400, { grad, desc, pref, lengthDesc: true });
		}

		if (grad && (grad < new Date().getFullYear() || grad > new Date().getFullYear() + 10)) {
			return fail(400, { grad, desc, pref, gradOut: true });
		}

		if (pref && !Object.values(ContestType as Record<string, string>).includes(pref)) {
			return fail(400, { grad, desc, pref, prefInvalid: true });
		}

		try {
			await prisma.profile.update({
				where: {
					id: Number(event.params.userId)
				},
				data: {
					description: desc == '' || desc == ' ' ? null : desc,
					grad: isNaN(grad ?? 1) ? null : grad,
					preference: (pref ?? 'ANY') as ContestTypeType
				}
			});
		} catch (e) {
			console.log('error', e);
			return fail(500, {
				message: 'An error happened while editing your profile.',
				expected: true
			});
		}

		return { success: true };
	}
} satisfies Actions;

export const load = (async ({ params, locals }) => {
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
			preference: true,
			user: {
				select: {
					name: true,
					email: true,
					image: true
				}
			}
		}
	});
	if (profile?.user?.email !== session.user.email) {
		throw redirect(307, `/users/${params.userId}/`);
		return {};
	}
	if (profile) return { uprof: profile };
	else {
		throw error(404, {
			message: 'This user does not exist.',
			code: 404
		});
	}
}) satisfies PageServerLoad;
