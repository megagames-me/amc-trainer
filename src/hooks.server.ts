import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/core/providers/google"
import { GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private"

let handlerFunc = SvelteKitAuth({
	//@ts-expect-error issue https://github.com/nextauthjs/next-auth/issues/6174
	providers: [Google({
		clientId: GOOGLE_ID,
		clientSecret: GOOGLE_SECRET,
	})],
	useSecureCookies: true,
	trustHost: true,
	debug:true,
	
});

export const handle = ({event, resolve}: any) => {
	event.url.protocol = "https:";
	
	const symbol = Object.getOwnPropertySymbols(event.request)[1];
	
	event.request[symbol].url.protocol = "https:";
	for (let i = 0; i < event.request[symbol].urlList.length; i++) {
		event.request[symbol].urlList[i].protocol = "https:";
	}

	return handlerFunc({event, resolve});		
};
