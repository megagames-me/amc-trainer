import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import prisma from "$lib/server/prisma"


// Get current problem (or create new if starting)
export const GET = (async (event) => {
	const session = await event.locals.getSession();

	if (!session?.user) {
		throw error(400, {
			message: "Not authenticated",
			expected: true
		});
	}
	
	const profile = await prisma.user.findUnique({
		where: {
			email: String(session?.user?.email)
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

	if (!profile?.profile) {
		throw error(500, {
			message: "User profile record does not exist.",
			expected: true
		});
	}

	if (!profile.profile?.curProblem) {
		let randProb: Array<Record<string, any>>;
		if (profile.profile.preference !== "ANY") {
			randProb = await prisma.$queryRaw`SELECT "Problem".id, "Problem".title, "Problem"."formattedTitle", 
	"Problem"."contestId", "Problem".problem,
	"Contest".title AS "contestTitle",
	"Contest"."formattedTitle" AS "contestFormattedTitle"
	FROM "Problem"
	INNER JOIN "Contest" ON "Problem"."contestId" = "Contest".id
	ORDER BY random()
	WHERE type=${profile.profile.preference}
	LIMIT 1;`;
		} else {
			randProb = await prisma.$queryRaw`SELECT "Problem".id, "Problem".title, "Problem"."formattedTitle", 
	"Problem"."contestId", "Problem".problem,
	"Contest".title AS "contestTitle",
	"Contest"."formattedTitle" AS "contestFormattedTitle"
	FROM "Problem"
	INNER JOIN "Contest" ON "Problem"."contestId" = "Contest".id
	ORDER BY random()
	LIMIT 1;`;
		}
	
		if (!randProb[0]) {
			throw error(500, {
				message: "Random problem could not be found.",
				expected: true
			});
		}

		await prisma.profile.update({
			where: { id: profile.profile.id },
			data: {
				curProblemId: randProb[0].id
			}
		});

		randProb[0].contest = {
			title: randProb[0].contestTitle,
			formattedTitle: randProb[0].contestFormattedTitle
		};
	  return json(randProb[0]);
	} else {
		return json(profile.profile.curProblem)
	}
	
}) satisfies RequestHandler;

// Checking answer and sending related data back
export const POST = (async (event) => {
	const session = await event.locals.getSession();

	if (!session?.user) {
		throw error(400, {
			message: "Not authenticated",
			expected: true
		});
	}

	const profile = await prisma.user.findUnique({
		where: {
			email: String(session?.user?.email)
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
							answer: true,
							solutions: true,
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

	if (!profile?.profile) {
		throw error(500, {
			message: "User profile record does not exist.",
			expected: true
		});
	}

	if (!profile?.profile?.curProblem) {
		throw error(500, {
			message: "User doesn't have a problem assigned.",
			expected: true
		});
	}
	
	const { answer } = await event.request.json();

	if (answer == null) {
		await prisma.profile.update({
			where: {
				id: profile.profile.id
			},
			data: {
				curProblemId: null,
				problemsSkip: ++profile.profile.problemsSkip,
			}
		});
		return {
			result: "skipped",
			curProblem: profile.profile.curProblem,
			problemsRight: profile.profile.problemsRight,
			problemsWrong: profile.profile.problemsWrong,
			problemsSkip: profile.profile.problemsSkip
		}
	}
	
	if (profile.profile.curProblem.answer == answer) {
		await prisma.profile.update({
			where: {
				id: profile.profile.id
			},
			data: {
				curProblemId: null,
				problemsRight: ++profile.profile.problemsRight,
			}
		});

		return {
			result: "correct",
			curProblem: profile.profile.curProblem,
			problemsRight: profile.profile.problemsRight,
			problemsWrong: profile.profile.problemsWrong,
			problemsSkip: profile.profile.problemsSkip
		}
	} else {
		await prisma.profile.update({
			where: {
				id: profile.profile.id
			},
			data: {
				curProblemId: null,
				problemsWrong: ++profile.profile.problemsWrong,
			}
		});
		return {
			result: "wrong",
			curProblem: profile.profile.curProblem,
			problemsRight: profile.profile.problemsRight,
			problemsWrong: profile.profile.problemsWrong,
			problemsSkip: profile.profile.problemsSkip
		}
	}
}) satisfies RequestHandler;


										