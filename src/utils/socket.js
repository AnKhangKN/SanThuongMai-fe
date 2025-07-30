import { io } from "socket.io-client";
//     `${process.env.REACT_APP_API_URL_SOCKET}`
const socket = io("http://192.168.2.233:3000", {
  transports: ["websocket"],
  autoConnect: true,
}); // URL socket server
export default socket;
