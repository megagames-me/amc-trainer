import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { AUTH_SECRET, GOOGLE_ID, GOOGLE_SECRET, PROTOCOL } from '$env/static/private';

import { PrismaAdapter } from '$lib/server/adapter';
import prisma from '$lib/server/prisma';

import type { HandleServerError, Handle } from '@sveltejs/kit';

export const handleError = (({ error }) => {
	// example integration with https://sentry.io/
	console.error(error);
	return {
		message: 'An internal error occurred.',
		code: 500
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
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	adapter: PrismaAdapter(prisma),
	trustHost: true,
	secret: AUTH_SECRET,
	debug: true,
});

export const handle = (({ event, resolve }) => {
	event.url.protocol = PROTOCOL;

	const symbol = Object.getOwnPropertySymbols(event.request)[1];

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	event.request[symbol].url.protocol = PROTOCOL;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	for (let i = 0; i < event.request[symbol].urlList.length; i++) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		event.request[symbol].urlList[i].protocol = PROTOCOL;
	}

	return handlerFunc({ event, resolve });
}) satisfies Handle;
