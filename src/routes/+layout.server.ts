import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (session?.user?.email) {
		const user = await prisma.user.findUnique({
			where: { email: session?.user?.email },
			include: { profile: true }
		});
		return {
			session,
			profile: user?.profile
		};
	}
	return {
		session
	};
};
