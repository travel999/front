// import React, { useState } from "react";
// import styles from "./Chat.module.css";
// import { io } from "socket.io-client";
// import { useLocation } from "react-router-dom";

// export const socket = io("localhost:5000"); // link 필요
// export const SocketContext = React.createContext();

// const Chat = () => {
//   const location = useLocation();
//   const nickname = location.state.nickname;

//   const [chats, setChats] = useState([]);
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [message, setMessage] = useState(null);

//   const addChatMessage = (data) => {
//     let message = "";
//     if (data.numUsers === 1) {
//       message += `there's 1 participant`;
//     } else {
//       message += `there are ${data.numUsers} participants`;
//     }
//     setChats(chats.concat(message));
//   };

//   useEffect(async () => {
//     socket.emit("add user", nickname);

//     socket.on("login", (data) => {
//       setIsConnected(true);
//       addChatMessage(data);
//     });

//     socket.on("user joined", (data) => {
//       setChats(chats.concat(`${data.username} joined`));
//     });
//     socket.on("user left", (data) => {
//       setChats(chats.concat(`${data.username} left`));
//     });
//     socket.on("disconnect", () => {
//       setIsConnected(false);
//     });
//     socket.on("new message", (data) => {
//       setChats(chats.concat(`${data.username} : ${data.message}`));
//     });
//     return () => {
//       socket.off("login");
//       socket.off("disconnect");
//       socket.off("new message");
//     };
//   });

//   const sendMessage = () => {
//     console.log(Msg);
//     setChats(chats.concat(`${nickname} : ${Msg}`));
//     socket.emit("new message", Msg);
//     setMessage("");
//   };

//   const onChange = (e) => {
//     setMessage(e.target.value);
//   };

//   return (
//     <div>
//       <header>
//         <p>Connected: {"" + isConnected}</p>
//         <p>socket ID: {nickname + `(${socket.id})`}</p>
//         <div>
//           <ul>
//             {chats.map((val, index) => {
//               return <li key={index}>{val}</li>;
//             })}
//           </ul>
//         </div>
//         <div>
//           <input
//             onChange={onChange}
//             value={Msg}
//             placeholder="Type here..."
//             onKeyPress={(e) => {
//               if (e.key === "Enter") sendMessage();
//             }}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Chat;
