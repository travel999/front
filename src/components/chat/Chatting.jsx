// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import styles from "./Chatting.module.css";
// import ChatBox from "./ChatBox";

// const socket = io.connect("link받아야함");

// const Chatting = () => {
//   const [room, setRoom] = useState(""); // room 이름은 게시글의 id값을 쓰던가 해야할것 같음.
//   const [user, setUser] = useState(""); // 게시글에서 받아옴, 닉네임?

//   if (user !== "" && room !== "") {
//     socket.emit("join이름", room);
//   }

//   return (
//     <div className={styles.bicbox}>
//       <h3>Chatting Room</h3>
//       <ChatBox socket={socket} user={user} room={room} />
//     </div>
//   );
// };

// export default Chatting;

// // 게시글에 들어가면,

