// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Socket } from 'socket.io-client';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface PageState {
			socket?: Socket;
		}
		// interface Platform {}
	}
}

export {};
