export interface ServerToClientEvents {
  joined_lobby: (lobbyId: string) => void;
  lobby_info: (players: number) => void;
}

export interface ClientToServerEvents {
  create_lobby: () => void;
  join_lobby: (lobbyId: string) => void;
}