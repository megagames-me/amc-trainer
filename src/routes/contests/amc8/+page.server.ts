import prisma from '$lib/server/prisma';

export const load = async () => {
  const contests = await prisma.contest.findMany({
    where: {
      type: 'AMC8'
    },
    select: {
      title: true,
      formattedTitle: true
    },
    orderBy: {
      year: 'desc'
    }
  });

  return { contests };
};
