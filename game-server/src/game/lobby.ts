import assert from "node:assert";
import type { Server, Socket } from "socket.io";

export type LobbyCallbacks = {
  onClose: () => void;
};

export class Lobby {
  lobbyId: string;
  sockets: Set<Socket>;
  callbacks: LobbyCallbacks;
  isClosed: boolean;
  server: Server;

  constructor(
    server: Server,
    lobbyId: string,
    socket: Socket,
    callbacks: LobbyCallbacks,
  ) {
    console.log(`creating lobby ${lobbyId}`);
    this.lobbyId = lobbyId;
    this.sockets = new Set();
    this.callbacks = callbacks;
    this.isClosed = false;
    this.server = server;

    this.connect(socket);
  }

  connect(socket: Socket) {
    assert(!this.isClosed);

    this.sockets.add(socket);
    socket.emit("joined_lobby", this.lobbyId);
    socket.join(this.lobbyId);
    this.server.in(this.lobbyId).emit("lobby_info", this.sockets.size);
    console.log(`joined lobby ${this.lobbyId}, ${this.sockets.size} socket(s)`);

    socket.on("disconnect", () => {
      this.sockets.delete(socket);
      this.server.in(this.lobbyId).emit("lobby_info", this.sockets.size);
      console.log(`left lobby ${this.lobbyId}, ${this.sockets.size} socket(s)`);

      if (this.sockets.size == 0) {
        console.log(`closing lobby ${this.lobbyId}`);
        this.isClosed = true;

        this.callbacks.onClose();
      }
    });
  }
}
