<script lang="ts">
	let lobby: string = $state('');
</script>

<div class="content">
	<div>
		<input bind:value={lobby} />
		<button>Join Lobby</button>
	</div>
	<div>or</div>
	<button>Create Lobby</button>
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
