<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { createLobby } from './game.svelte';

	afterNavigate(() => createLobby());
</script>

Loading...
