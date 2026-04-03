import { io } from "socket.io-client";

const fallbackURL = "http://localhost:5000";
const socketURL =
  process.env.REACT_APP_SOCKET_URL ||
  process.env.REACT_APP_BACKEND_URL ||
  fallbackURL;

const socket = io(socketURL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

export default socket;
