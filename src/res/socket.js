import io from "socket.io-client";

export default io.connect(process.env.REACT_APP_SERVER, {
  path: "/socket.io",
  transports: ["websocket"],
});

// export default io.connect(`http://localhost:3001/`, {
//   path: "/socket.io",
//   transports: ["websocket"],
// });
