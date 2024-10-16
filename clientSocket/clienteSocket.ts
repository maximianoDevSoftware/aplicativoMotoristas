// src/socket/socketCliente.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const getSocket = () => {
  if (!socket) {
    socket = io("http://192.168.0.127:3000"); // Substitua pela URL do seu servidor
  }
  return socket;
};

export default getSocket;
