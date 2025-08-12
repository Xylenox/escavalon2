<script lang="ts">
	import { io } from 'socket.io-client';
	function test() {
		const socket = io('http://localhost:5051', {
			query: {
				createLobby: true
			}
		});
		console.log(socket);
	}
</script>

<button onclick={test}> hello </button>
