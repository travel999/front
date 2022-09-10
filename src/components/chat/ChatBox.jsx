// import React, { useEffect, useState } from "react";
// import styles from "./Chatting.module.css";

// const ChatBox = ({ socket, user, room }) => {
//   const [currentMsg, setCurrentMsg] = useState("");
//   const [msgList, setMsgList] = useState([]);

//   console.log(socket);
//   console.log(msgList);

//   const OnsendMsg = async () => {
//     if (currentMsg !== "") {
//       const messageData = {
//         room: room,
//         user: user,
//         message: currentMsg,
//         time:
//           new Date(Date.now()).getDate() +
//           "일 " +
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       };
//       console.log(messageData);
//       await socket.emit("send_msg", messageData);
//       setMsgList((list) => [...list, messageData]);
//     }
//   };

//   useEffect(() => {
//     socket.on("receive_msg", (data) => {
//       console.log("받음");
//       setMsgList((list) => [...list, data]);
//     });
//   }, [socket]);
//   //db에 저장한것을 받아야 할것 같다. 보냈으면 보낸것것까지 추가해

//   return (
//     <div>
//       <div className={styles.chatBox}></div>
//       <div>
//         {msgList?.map((value) => {
//           return <div>{value.message}</div>;
//         })}
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
