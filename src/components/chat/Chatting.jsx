import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import ChatBox from "./ChatBox";
import { useSelector } from "react-redux";

const socket = io.connect("http://52.78.142.77/", {
  path: "/socket.io",
  transports: ["websocket"],
});

const Chatting = () => {
  const room = useSelector((state) => state?.schedule?.postId);
  const nickname = "익명";
  const myNickname = useSelector((state) => state);
  const [users, setUsers] = useState(["익명", "익명이", "타타타"]); // 닉네임, 리덕스에서 구해옴, 누구누구 초대했는지 필요.
  const [showChat, setShowChat] = useState(null);

//   console.log(socket.connected);
//   console.log(nickname);

  // 해당 게시글의 닉네임이 없으면, 채팅에 들어갈수 없음. 여기서 차단해야함.
  useEffect(() => {
    if (nickname !== "" && room !== "" && users.includes(nickname)) {
      socket.emit("join_room", room);
      setShowChat(true);
    } else {
      setShowChat(false);
    }
  }, []);

  return (
    <BicBox Bsize={showChat}>
      <HeadText>
        <ChatHaed>Chatting Room</ChatHaed>
        <HideBtn
          onClick={() => {
            setShowChat(!showChat);
          }}
        >
          _
        </HideBtn>
      </HeadText>
      {showChat ? (
        <ChatBox
          socket={socket}
          users={users}
          room={room}
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
  width: 17vw;
  min-width: 220px;
  height: ${(prop) => (prop.Bsize ? "60vh" : "0vh")};
  min-height: ${(prop) => (prop.size ? "270px" : "40px")};
  background-color: rgb(255, 255, 255);
`;

const HeadText = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 2vw;
  margin-right: 1vw;
`;

const ChatHaed = styled.div`
  height: 5vh;
  margin: 2vh 1vw 0vh 1vw;
`;

const HideBtn = styled.div`
  cursor: pointer;
`;

export default Chatting;

// 게시글에 들어가면,
