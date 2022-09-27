import React, { useState } from "react";
import ChatBox from "./ChatBox";
import socket from "../../res/socket";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteMemory, getChatMemory } from "../../redux/modules/chatSlice";
import { useParams } from "react-router-dom";

const Chatting = ({ id }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.kakaoMap.members) || [null];
  const address = useParams();

  const [showChat, setShowChat] = useState(false);

  const nickname = localStorage.getItem("nickname");
  const room = "roomIdIs" + id;

  const enterRoom = () => {
    setShowChat(!showChat);
    if (members?.includes(nickname)) {
      socket.emit("join_room", room);
      dispatch(getChatMemory(id));
    } else if (address.id && members?.includes(nickname)) {
      socket.emit("join_room", address.id);
      dispatch(getChatMemory(address.id));
    }
    if (address.id !== id) {
      dispatch(deleteMemory());
    }
  };

  return (
    <BicBox Bsize={showChat}>
      <HeadText>
        <ChatHaed>Chatting Room</ChatHaed>
        <HideBtn onClick={enterRoom}>ㅡ</HideBtn>
      </HeadText>
      {showChat ? <ChatBox socket={socket} id={id} /> : null}
    </BicBox>
  );
};

const BicBox = styled.div`
  position: fixed;
  right: 0%;
  bottom: 0;
  width: 17vw;
  min-width: 220px;
  height: ${(prop) => (prop.Bsize ? "60vh" : "0vh")};
  min-height: ${(prop) => (prop.size ? "270px" : "40px")};
  background-color: rgb(255, 255, 255);
  z-index: 3;
  /* 모바일 반응형 430 x 844 : 아이폰 pro 도 접근할 수 있도록 처리함*/
  @media only screen and (max-width: 430px) {
    position: absolute;
    bottom: auto;
  }
`;

const HeadText = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 1vw;
`;

const ChatHaed = styled.div`
  height: 5vh;
  margin: 2vh 1vw 0vh 1vw;
`;

const HideBtn = styled.div`
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;
  margin-right: 4px;
`;

export default Chatting;
