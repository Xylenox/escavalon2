import type { Socket } from 'socket.io-client';

export const socket: { socket: Socket | null } = $state({ socket: null });
