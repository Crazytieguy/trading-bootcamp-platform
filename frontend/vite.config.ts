import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	plugins: [sveltekit(), mkcert()],
	server: {
		proxy: {
			'/api': {
				target: 'ws://localhost:8080',
				ws: true
			}
		},
		host: true,
		https: true
	},
	ssr: {
		noExternal: ['@kinde-oss/kinde-auth-pkce-js']
	},
	optimizeDeps: { include: ['schema-js'] },
	build: {
		commonjsOptions: {
			include: [/schema-js/, /node_modules/]
		}
	}
});
