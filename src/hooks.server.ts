import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/core/providers/google"
import { GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private"

export const handle = SvelteKitAuth({
	//@ts-expect-error issue https://github.com/nextauthjs/next-auth/issues/6174
	providers: [Google({
		clientId: GOOGLE_ID,
		clientSecret: GOOGLE_SECRET,
	})]
});
