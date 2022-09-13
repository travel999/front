// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import styles from "./Chatting.module.css";
// import styled from "styled-components";
// import ChatBox from "./ChatBox";
// import { useSelector } from "react-redux";

const socket = io.connect("http://13.209.12.128:3000/");

const Chatting = () => {
  const nickname = "익명";
  const [room, setRoom] = useState("tatataroom"); // room 이름은 게시글의 id값을 쓰던가 해야할것 같음.
  const [users, setUsers] = useState(["익명", "익명이", "타타타"]); // 닉네임, 리덕스에서 구해옴, 누구누구 초대했는지 필요.
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [showChat, setShowChat] = useState(null);

  console.log(socket.connected);
  console.log(nickname);

  // 해당 게시글의 닉네임이 없으면, 채팅에 들어갈수 없음. 여기서 차단해야함.
  useEffect(() => {
    if (nickname !== "" && room !== "" && users.includes(nickname)) {
      socket.emit("join_room", room);
      setShowChat(true);
    } else {
      setIsConnected(false);
      setShowChat(false);
    }
  }, []);

  return (
    <BicBox size={showChat}>
      <div className={styles.chatheadtext}>
        <div className={styles.chathead}>Chatting Room</div>
        <div
          className={styles.hidebtn}
          onClick={() => {
            setShowChat(!showChat);
          }}
        >
          _
        </div>
      </div>
      {showChat ? (
        <ChatBox
          socket={socket}
          users={users}
          room={room}
          isConnected={isConnected}
          nickname={nickname}
        />
      ) : null}
    </BicBox>
  );
};

// const BicBox = styled.div`
//   position: fixed;
//   right: 0;
//   bottom: 0;
//   width: 18vw;
//   min-width: 220px;
//   height: ${(prop) => (prop.size ? "60vh" : "0vh")};
//   min-height: ${(prop) => (prop.size ? "270px" : "40px")};
//   margin-bottom: 40px;
//   background-color: rgb(255, 255, 255);
// `;

// export default Chatting;

// // 게시글에 들어가면,
