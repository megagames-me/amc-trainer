import prisma from "$lib/server/prisma"
import { redirect, error, fail } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
 
export const actions = {
  default: async (event) => {
		const session = await event.locals.getSession();
		const user = await prisma.profile.findUnique({where: {id: Number(event.params.userId)}, include: {user: true}});
		
    const data = await event.request.formData();
		let grad = Number(data.get("grad"));
		let desc = data.get("desc");

		if (!session?.user) {
			return fail(403, { grad, desc, authedFull: false });
		}
		
		if (!user) {
			return fail(404, { grad, desc, userExists: false });
		}

		if (user?.user?.email !== session?.user?.email) {
			return fail(403, { grad, desc, authed: false });
		}
		
		if (desc && desc?.length > 150) {
			return fail(400, { grad, desc, lengthDesc: true });
		}

		if (grad && (grad < new Date().getFullYear() || grad > new Date().getFullYear() + 10)) {
			return fail(400, { grad, desc, gradOut: true });
		}

		// let dataw: Record<string, any> = {};

		// if (isNaN(grad)) grad = {unset: true};
		// if (desc) dataw.description = desc;
		// if (grad) dataw.grad = grad;

		// if (isNaN(grad)) {
		// 	dataw.grad = {unset: true};
		// }
		// if (desc == "" || desc == " ") {
		// 	dataw.desc = {unset: true};
		// }
		
		try {
			const profile = await prisma.profile.update({
				where: {
					id: Number(event.params.userId)
				},
				data: {
					description: desc == "" || desc == " " ? null : desc,
					grad: isNaN(grad) ? null : grad
				}
			})
		} catch(e) {
			console.log("error", e);
			return fail(500, { message: "An error happened while editing your profile.", expected: true });
		}

		return {success: true};
  }
} satisfies Actions;

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
	if (profile?.user?.email !== session.user.email) {
		throw redirect(307, `/users/${params.userId}/`);
		return {};
	}
	if (profile) return { uprof: profile };
	else {
		throw error(404, {
      message: 'This user does not exist.'
    });
	}
}) satisfies PageServerLoad;