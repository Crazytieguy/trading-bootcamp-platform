import {
	PUBLIC_KINDE_CLIENT_ID,
	PUBLIC_KINDE_DOMAIN,
	PUBLIC_KINDE_REDIRECT_URI
} from '$env/static/public';
import createKindeClient from '@kinde-oss/kinde-auth-pkce-js';

export const kindeClient = await createKindeClient({
	audience: 'trading-server-api',
	client_id: PUBLIC_KINDE_CLIENT_ID,
	domain: PUBLIC_KINDE_DOMAIN,
	redirect_uri: PUBLIC_KINDE_REDIRECT_URI
});
