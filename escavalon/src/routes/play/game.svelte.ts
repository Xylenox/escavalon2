import { goto } from '$app/navigation';
import { io, type Socket } from 'socket.io-client';

export const status: { loading: boolean; lobby?: string } = $state({
	loading: false
});

let socket: Socket | null = $state(null);

export function createLobby() {
	status.loading = true;
	socket = io('ws://localhost:5051');

	socket.emit('create_lobby');

	socket.on('joined_lobby', (lobbyId) => {
		status.lobby = lobbyId;
		goto(`/play/${lobbyId}`);
		status.loading = false;
	});
}

export function joinLobby() {}
