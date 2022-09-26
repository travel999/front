import React, { useState } from "react";
import ChatBox from "./ChatBox";
import socket from "../../res/socket";
import styled from "styled-components";

const Chatting = ({ id }) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <BicBox Bsize={showChat}>
      <HeadText>
        <ChatHaed>Chatting Room</ChatHaed>
        <HideBtn
          onClick={() => {
            setShowChat(!showChat);
          }}
        >
          ㅡ
        </HideBtn>
      </HeadText>
      {showChat ? <ChatBox socket={socket} id={id} /> : null}
    </BicBox>
  );
};

const BicBox = styled.div`
  position: fixed;
  right: 1%;
  bottom: 0;
  width: 17vw;
  min-width: 220px;
  height: ${(prop) => (prop.Bsize ? "60vh" : "0vh")};
  min-height: ${(prop) => (prop.size ? "270px" : "40px")};
  background-color: rgb(255, 255, 255);
  z-index: 3;
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
  font-weight: 600;
  margin-top: 10px;
  margin-right: 4px;
`;

export default Chatting;
