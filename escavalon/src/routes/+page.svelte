<script lang="ts">
	import { io } from 'socket.io-client';

	let lobby: string = $state('');
	let players: number | undefined = $state(undefined);
	let joinedLobby = $state(false);

	let socket = io('ws://localhost:5051', {
		autoConnect: false
	});
	socket.on('joined_lobby', (lobbyId) => {
		lobby = lobbyId;
		joinedLobby = true;
	});
	socket.on('lobby_info', (player_count) => {
		players = player_count;
	});

	function joinLobby() {
		socket.emit('join_lobby', lobby);
	}

	function createLobby() {
		socket.emit('create_lobby');
	}
</script>

<div class="content">
	{#if !joinedLobby}
		<div>
			<input bind:value={lobby} />
			<button onclick={joinLobby}>Join Lobby</button>
		</div>
		<div>or</div>
		<button onclick={createLobby}>Create Lobby</button>
	{:else}
		<div>Lobby: {lobby}</div>
		<div>{players} player{players != 1 ? 's' : ''}</div>
	{/if}
</div>

<style>
	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;
		position: fixed;
	}
</style>
