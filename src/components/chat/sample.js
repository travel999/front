// var socket = io();

// /* 접속 되었을 때 실행 */
// socket.on("connect", function () {
//   /* 이름을 입력받고 */
//   var name = prompt("반갑습니다!", "");

//   /* 이름이 빈칸인 경우 */
//   if (!name) {
//     name = "익명";
//   }

//   /* 서버에 새로운 유저가 왔다고 알림 */
//   socket.emit("newUser", name);
// });

// /* 서버로부터 데이터 받은 경우 */
// socket.on("update", function (data) {
//   var chat = document.getElementById("chat");

//   var message = document.createElement("div");
//   var node = document.createTextNode(`${data.name}: ${data.message}`);
//   var className = "";

//   // 타입에 따라 적용할 클래스를 다르게 지정
//   switch (data.type) {
//     case "message":
//       className = "other";
//       break;

//     case "connect":
//       className = "connect";
//       break;

//     case "disconnect":
//       className = "disconnect";
//       break;
//   }

//   message.classList.add(className);
//   message.appendChild(node);
//   chat.appendChild(message);
// });

// /* 메시지 전송 함수 */
// function send() {
//   // 입력되어있는 데이터 가져오기
//   var message = document.getElementById("test").value;

//   // 가져왔으니 데이터 빈칸으로 변경
//   document.getElementById("test").value = "";

//   // 내가 전송할 메시지 클라이언트에게 표시
//   var chat = document.getElementById("chat");
//   var msg = document.createElement("div");
//   var node = document.createTextNode(message);
//   msg.classList.add("me");
//   msg.appendChild(node);
//   chat.appendChild(msg);

//   // 서버로 message 이벤트 전달 + 데이터와 함께
//   socket.emit("message", { type: "message", message: message });
// }

// // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

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
