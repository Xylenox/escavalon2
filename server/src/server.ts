import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { GameServer } from "./game/game_server.js";

const EXPRESS_PORT = process.env.EXPRESS_PORT || 5050;
const SOCKETIO_PORT = process.env.SOCKETIO_PORT || 5051;

function setupExpress() {
  const app = express();
  app.get("/", (_req, res) => {
    res.send("Hello World!");
  });

  app.listen(EXPRESS_PORT, () => {
    console.log(`Express server started on port ${EXPRESS_PORT}`);
  });
}

function setupSocketIO() {
  const httpServer = createServer();
  const io = new Server(httpServer);

  new GameServer(io);

  httpServer.listen(SOCKETIO_PORT, () => {
    console.log(`Socket.IO server started on port ${SOCKETIO_PORT}`);
  });
}

setupExpress();
setupSocketIO();
