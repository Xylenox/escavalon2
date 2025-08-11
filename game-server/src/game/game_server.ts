import type { Server, Socket } from "socket.io";
import { Lobby } from "./lobby.js";

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomLobbyId(): string {
  let lobbyId = "";
  for (let i = 0; i < 4; i++) {
    lobbyId += ALPHA.charAt(Math.floor(Math.random() * ALPHA.length));
  }
  return lobbyId;
}

export class GameServer {
  lobbies: Map<string, Lobby>;

  getNewLobbyId(): string {
    let lobbyId: string;
    do {
      lobbyId = randomLobbyId();
    } while (this.lobbies.has(lobbyId));
    return lobbyId;
  }

  createLobby(socket: Socket): string {
    const lobbyId = this.getNewLobbyId();

    const lobby = new Lobby(lobbyId, socket, {
      onClose: () => {
        console.log(`cleaning up lobby ${lobbyId}`);
        this.lobbies.delete(lobbyId);
      },
    });

    this.lobbies.set(lobbyId, lobby);
    console.log(`created lobby ${lobbyId}`);

    return lobbyId;
  }

  constructor(io: Server) {
    this.lobbies = new Map();

    io.on("connect", (socket) => {
      let lobbyId: string;
      if (socket.handshake.query["createLobby"] === "true") {
        this.createLobby(socket);
      } else {
        const lobbyInput = socket.handshake.query["lobbyId"];
        if (typeof lobbyInput === "string" && this.lobbies.has(lobbyInput)) {
          lobbyId = lobbyInput;
          const lobby = this.lobbies.get(lobbyId)!;
          lobby.connect(socket);
        } else {
          socket.emit("invalid_lobby");
          socket.disconnect(true);
          return;
        }
      }
    });
  }
}
