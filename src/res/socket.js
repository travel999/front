import io from "socket.io-client";

export default io.connect(process.env.REACT_APP_SURVER, {
  path: "/socket.io",
  transports: ["websocket"],
});
