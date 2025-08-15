<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { io } from 'socket.io-client';

	import { socket } from './socket.svelte';

	onMount(() => {
		socket.socket = io('ws://localhost:5051', {
			query: {
				createLobby: true
			}
		});
		socket.socket.on('joined_lobby', (lobbyId) => {
			goto(`/play/${lobbyId}`);
		});
		socket.socket.on('disconnect', () => {
			socket.socket = null;
		});
	});
</script>

<div class="flex h-full w-full items-center justify-center">Loading...</div>
