import {
	PUBLIC_KINDE_CLIENT_ID,
	PUBLIC_KINDE_DOMAIN,
	PUBLIC_KINDE_REDIRECT_URI
} from '$env/static/public';
import createKindeClient, { type KindeClient } from '@kinde-oss/kinde-auth-pkce-js';

import { browser } from '$app/environment';

let kindePromise: Promise<KindeClient>;

if (browser) {
	kindePromise = createKindeClient({
		audience: 'trading-server-api',
		client_id: PUBLIC_KINDE_CLIENT_ID,
		domain: PUBLIC_KINDE_DOMAIN,
		redirect_uri: PUBLIC_KINDE_REDIRECT_URI
	});
}

export const kinde = browser
	? {
			async login() {
				const kinde = await kindePromise;
				kinde.login();
			},
			async logout() {
				const kinde = await kindePromise;
				kinde.logout();
			},
			async isAuthenticated() {
				const kinde = await kindePromise;
				return kinde.isAuthenticated();
			}
		}
	: {
			login: () => {},
			logout: () => {},
			isAuthenticated: () => Promise.resolve(false)
		};
