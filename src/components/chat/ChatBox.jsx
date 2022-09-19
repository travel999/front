import React, { useEffect, useRef, useState } from "react";
import styles from "./Chatting.module.css";
import styled from "styled-components";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatBox = ({ socket, room, nickname }) => {
  const [messageList, setMessageList] = useState([]);
  const CurrentMessageRef = useRef("");

  const OnsendMsg = () => {
    if (CurrentMessageRef.current.value !== "") {
      const messageData = {
        room: room,
        author: nickname,
        message: CurrentMessageRef.current.value,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      CurrentMessageRef.current.value = "";
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <div>
        <ScrollToBottom className={styles.scrollBottom}>
          {messageList?.map((value) => {
            return (
              <div>
                <MegWrap justify={value.author == nickname ? true : false}>
                  <Message border={value.author == nickname ? true : false}>
                    <p>{value.message}</p>
                  </Message>
                  <Time>{value.time}</Time>
                </MegWrap>
                <AuthorWrap author={value.author == nickname ? true : false}>
                  <Author>{value.author}</Author>
                </AuthorWrap>
              </div>
            );
          })}
        </ScrollToBottom>
        <ChatInput>
          <InputBox
            type="text"
            ref={CurrentMessageRef}
            onKeyPress={(e) => {
              if (e.key === "Enter") OnsendMsg();
            }}
          />
          <PushBtn onClick={OnsendMsg}>전송</PushBtn>
        </ChatInput>
      </div>
    </div>
  );
};

const MegWrap = styled.div`
  display: flex;
  flex-direction: ${(prop) => (prop.justify ? "row" : "row-reverse")};
  align-items: flex-end;
`;

const Message = styled.div`
  width: auto;
  height: auto;
  width: max-content;
  display: flex;
  align-items: center;
  max-width: 180px;
  padding: 1% 4%;
  border-radius: 5px;
  margin: 7px;
  border: ${(prop) =>
    prop.border ? "1px solid #ffc51c" : "1px solid #595cff"};
  border-radius: 15px;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const ChatInput = styled.div`
  height: 7vh;
  margin: 1vh 1vw 0vh 1vw;
  border: 1px solid #ffc51c;
  background-color: white;
  display: flex;
  align-items: center;
`;

const InputBox = styled.input`
  width: 69%;
  height: 70%;
  border: 0px solid transparent;
  margin-left: 4%;
`;

const PushBtn = styled.button`
  background-color: #ffc51c;
  border: 0px solid #ffc51c;
  height: 70%;
  width: 18%;
  border-radius: 10px;
  margin-left: 5%;
`;

const AuthorWrap = styled.div`
  display: flex;
  justify-content: ${(prop) => (prop.author ? "flex-start" : "flex-end")};
  margin: 0px 10px;
`;

const Time = styled.p`
  font-size: 0.7em;
  /* margin-top: 6%; */
`;

const Author = styled.p`
  font-size: 0.7em;
`;

export default ChatBox;
