import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./Chatting.module.css";
import styled from "styled-components";
import ChatBox from "./ChatBox";
import { useSelector } from "react-redux";

const socket = io.connect("http://localhost:3001");

const Chatting = () => {
  const nickname = "익명";
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [room, setRoom] = useState("tatataroom"); // room 이름은 게시글의 id값을 쓰던가 해야할것 같음.
  const [users, setUsers] = useState([]); // 닉네임, 리덕스에서 구해옴, 누구누구 초대했는지 필요.
  const [showChat, setShowChat] = useState(true);

  console.log(socket);
  console.log(nickname);

  // 해당 게시글의 닉네임이 없으면, 채팅에 들어갈수 없음. 여기서 차단해야함.
  useEffect(() => {
    if (nickname !== "" && room !== "") {
      socket.emit("join_room", room);
      setIsConnected(true);
      setShowChat(true);
    }
  }, []);

  const hideChat = () => {
    setShowChat(!showChat);
  };

  return (
    <BicBox size={showChat}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "20px",
        }}
      >
        <div className={styles.chathead}>Chatting Room</div>
        <div
          className={styles.hidebtn}
          onClick={() => {
            hideChat();
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

const BicBox = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 18vw;
  min-width: 220px;
  height: ${(prop) => (prop.size ? "60vh" : "0vh")};
  min-height: ${(prop) => (prop.size ? "270px" : "40px")};
  margin-bottom: 40px;
  background-color: rgb(255, 255, 255);
`;

export default Chatting;

// 게시글에 들어가면,
