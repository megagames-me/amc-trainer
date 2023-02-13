import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { GOOGLE_ID, GOOGLE_SECRET } from '$env/static/private';

import { PrismaAdapter } from "$lib/server/adapter";
import prisma from "$lib/server/prisma";

import type { HandleServerError } from '@sveltejs/kit';
 
 
export const handleError = ((throws) => {
  // example integration with https://sentry.io/
	console.error(throws.error);
  return {
    message: throws.error?.body?.expected ? throws.error?.body.message : "An internal error occurred.",
    code: throws.error?.status ?? 'Unknown'
  };
}) satisfies HandleServerError;


// console.log(prisma);
const handlerFunc = SvelteKitAuth({
	providers: [
		//@ts-expect-error issue https://github.com/nextauthjs/next-auth/issues/6174
		Google({
			clientId: GOOGLE_ID,
			clientSecret: GOOGLE_SECRET
		})
	],
	adapter: PrismaAdapter(prisma),
	useSecureCookies: true,
	trustHost: true,
	debug: true
});

export const handle = ({ event, resolve }: any) => {
	event.url.protocol = 'https:';

	const symbol = Object.getOwnPropertySymbols(event.request)[1];

	event.request[symbol].url.protocol = 'https:';
	for (let i = 0; i < event.request[symbol].urlList.length; i++) {
		event.request[symbol].urlList[i].protocol = 'https:';
	}

	return handlerFunc({ event, resolve });
};
