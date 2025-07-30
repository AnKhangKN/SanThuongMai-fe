import { io } from "socket.io-client";
//     `${process.env.REACT_APP_API_URL_SOCKET}`
const socket = io("http://192.168.2.233:8080", {
  transports: ["websocket"],
  autoConnect: true,
}); // URL socket server
export default socket;
