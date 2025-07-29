import { io } from "socket.io-client";
const socket = io(`${process.env.REACT_APP_API_URL_SOCKET}`, {
  transports: ["websocket"],
  autoConnect: true,
}); // URL socket server
export default socket;
