import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: 'ws://localhost:8080',
				ws: true
			}
		}
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
