import { Server } from "socket.io";
import { createServer } from "http";
import { GameServer } from "./game/game_server.js";

const SOCKETIO_PORT = process.env.SOCKETIO_PORT || 5051;

function setupSocketIO() {
  const httpServer = createServer();
  const io = new Server(httpServer);

  new GameServer(io);

  httpServer.listen(SOCKETIO_PORT, () => {
    console.log(`Socket.IO server started on port ${SOCKETIO_PORT}`);
  });
}

setupSocketIO();
