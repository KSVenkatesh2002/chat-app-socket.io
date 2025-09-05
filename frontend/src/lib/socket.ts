// lib/socket.ts
import { io, Socket } from "socket.io-client";

const BASE_URL = "http://localhost:3000";

// Store socket on the global object (safe across hot reloads)
let socket: Socket;

export const connectSocket = (): Socket => {
  if (!socket) {
    socket = io(BASE_URL, {
      transports: ["websocket"],
      autoConnect: false,
    });

    // Prevent duplicate listeners during HMR
    if (import.meta.hot) {
      import.meta.hot.dispose(() => {
        if (socket?.connected) socket.disconnect();
        socket = undefined as any;
      });
    }
  }

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

export const getSocket = (): Socket => socket;

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
  }
};
