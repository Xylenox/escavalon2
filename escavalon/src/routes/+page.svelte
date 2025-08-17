<script lang="ts">
	import { goto } from '$app/navigation';
	import { createLobby, status } from './play/game.svelte';
	let lobby: string = $state('');
	function joinLobby() {
		goto(`/play/${lobby}`);
	}
</script>

<div class="content">
	<div>
		<input bind:value={lobby} />
		<button onclick={joinLobby}>Join Lobby</button>
	</div>
	<div>or</div>
	<button onclick={createLobby}>Create Lobby</button>
	{#if status.loading}
		<div>Loading...</div>
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
