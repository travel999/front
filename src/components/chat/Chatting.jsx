// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import styles from "./Chatting.module.css";
// import ChatBox from "./ChatBox";

// const socket = io.connect("http://localhost:3001");

// const Chatting = () => {
//   const [room, setRoom] = useState("타타타의 방"); // room 이름은 게시글의 id값을 쓰던가 해야할것 같음.
//   const [user, setUser] = useState("타타타"); // 닉네임, 리덕스에서 구해옴

//   // 해당 게시글의 닉네임이 없으면, 채팅에 들어갈수 없음. 여기서 차단해야함.
//   useEffect(() => {
//     if (user !== "" && room !== "") {
//       socket.emit("join_room", room);
//     }
//   }, []);

//   return (
//     <div className={styles.bicbox}>
//       <h3>Chatting Room</h3>
//       <ChatBox socket={socket} user={user} room={room} />
//     </div>
//   );
// };

// export default Chatting;

// // 게시글에 들어가면,
