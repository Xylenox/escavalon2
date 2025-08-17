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
      socket.on("create_lobby", () => {
        this.createLobby(socket);
      });
      socket.on("join_lobby", (lobbyId: string) => {
        if (this.lobbies.has(lobbyId)) {
          this.lobbies.get(lobbyId)!.connect(socket);
        } else {
          socket.emit("invalid_lobby");
        }
      });
    });
  }
}
