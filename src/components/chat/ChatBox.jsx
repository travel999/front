// import React, { useEffect, useState } from "react";
// import styles from "./Chatting.module.css";

// const ChatBox = ({ socket, user, room }) => {

//   const [currentMsg, setCurrentMsg] = useState("");
//   const [msgList, setMsgList] = useState([]);

//   const OnsendMsg = async () => {
//     if (currentMsg !== "") {
//       // 서버에 보낼 정보
//       const messageData = {
//         room: room,

//         user: user,

//         message: currentMsg,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       };

//       await socket.emit("send_msg", messageData);
//       setMsgList((list) => [...list, messageData]);
//     }
//   };

//   useEffect(() => {
//     socket.on("receive_msg", (data) => {
//       setMsgList((list) => [...list, data]);
//     });
//   }, [socket]);

//   return (
//     <div>
//       <div className={styles.chatBox}>
//         {msgList.map((msg) => {
//           return <div>{msg}</div>;
//         })}
//       </div>
//       <div>
//         <input
//           type="text"
//           placeholder="Hey..."
//           onChange={(e) => setCurrentMsg(e.target.value)}
//         />
//         <button onClick={OnsendMsg}>►</button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
