import React, { useState } from "react";
import ChatBox from "./ChatBox";
import socket from "../../res/socket";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteMemory, getChatMemory } from "../../redux/modules/ChatSlice";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons";

const Chatting = ({ id }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.kakaoMap.members) || [null];
  const address = useParams();

  const [showChat, setShowChat] = useState(false);
  const [firstEnter, setFirstEnter] = useState(true);

  const nickname = localStorage.getItem("nickname");
  const room = "roomIdIs" + id;

  const enterRoom = () => {
    setShowChat(!showChat);
    if (firstEnter) {
      if (members?.includes(nickname)) {
        enter();
      } else if (address.id && members?.includes(nickname)) {
        enter();
      }
    }
    if (address.id && members?.includes(nickname)) {
      dispatch(getChatMemory(id));
    }
    if (address.id !== id) {
      dispatch(deleteMemory());
    }
  };

  const enter = () => {
    socket.emit("join_room", room);
    setFirstEnter(false);
  };

  return (
    <BicBox Bsize={showChat}>
      <HeadText>
        <ChatHaed>Chatting Room</ChatHaed>
        <HideBtn onClick={enterRoom}>
          {showChat ? (
            <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
          ) : (
            <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
          )}
        </HideBtn>
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
    width: 96vw;
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
  font-weight: 700;
  margin-top: 12px;
  margin-right: 2%;
`;
export default Chatting;
