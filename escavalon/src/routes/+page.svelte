<script lang="ts">
	import { goto } from '$app/navigation';
	let lobby: string = $state('');
	function createLobby() {
		goto('/play');
	}
	function joinLobby() {
		goto(`/play/${lobby}`);
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-2">
	<div class="flex gap-2">
		<input bind:value={lobby} class="border" />
		<button onclick={joinLobby} class="rounded-lg border p-2">Join Lobby</button>
	</div>
	<div
		class="flex w-80 items-center text-center before:m-2 before:h-[0.5pt] before:flex-1 before:bg-black after:m-2 after:h-[0.5pt] after:flex-1 after:bg-black"
	>
		or
	</div>
	<button onclick={createLobby} class="rounded-lg border p-2">Create Lobby</button>
</div>
