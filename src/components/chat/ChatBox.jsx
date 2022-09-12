import React, { useEffect, useRef, useState } from "react";
import styles from "./Chatting.module.css";
import styled from "styled-components";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatBox = ({ socket, users, room, isConnected, nickname }) => {
  const [messageList, setMessageList] = useState([]);
  const CurrentMessageRef = useRef("");

  const OnsendMsg = async () => {
    if (CurrentMessageRef.current.value !== "" && isConnected) {
      const messageData = {
        room: room,
        author: nickname,
        message: CurrentMessageRef.current.value,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      CurrentMessageRef.current.value = "";
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  // 실시간ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  const [live, setLive] = useState("");
  const [go, setGo] = useState(true);

  const sendmsg = () => {
    const msg = {
      msg: live,
      room: room,
    };
    socket.emit("test_send", msg);
  };

  useEffect(() => {
    if (live !== "" && go) {
      console.log("보내짐");
      sendmsg();
    }
  }, [live]);

  useEffect(() => {
    console.log("받음");
    socket.on("test_receive", (data) => {
      setLive(data.msg);
    });
  }, [socket]);

  // 실시간테스트버전 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  return (
    <div>
      <input onChange={(e) => setLive(e.target.value)} />
      <div>{live}</div>
      <div>
        <ScrollToBottom className={styles.chatpart}>
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
        <div className={styles.chatinput}>
          <input
            type="text"
            ref={CurrentMessageRef}
            className={styles.inputpart}
            onKeyPress={(e) => {
              if (e.key === "Enter") OnsendMsg();
            }}
          />
          <button className={`${styles.pushbtn}`} onClick={OnsendMsg}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

const MegWrap = styled.div`
  display: flex;
  flex-direction: ${(prop) => (prop.justify ? "row" : "row-reverse")};
  align-items: center;
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

const AuthorWrap = styled.div`
  display: flex;
  justify-content: ${(prop) => (prop.author ? "flex-start" : "flex-end")};
  margin: 0px 10px;
`;

const Time = styled.p`
  font-size: 0.8em;
  /* margin-top: 6%; */
`;

const Author = styled.p`
  font-size: 0.8em;
`;

export default ChatBox;
