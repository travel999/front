import React, { useEffect, useState } from "react";

const ChatBox = ({ socket, username, room }) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  const OnsendMsg = async () => {
    if (currentMsg !== "") {
      // 서버에 보낼 정보
      const messageData = {
        room: room,
        username: username,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_msg", messageData);
      setMsgList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    // 메세지 받기
    socket.on("receive_msg", (data) => {
      setMsgList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <div>
        헤더<p>Live Chat</p>
      </div>
      <div>바디</div>
      {msgList.map((msg) => {
        return <div>{msg}</div>;
      })}
      <div>
        푸터
        <input
          type="text"
          placeholder="Hey... meg"
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button onClick={OnsendMsg}>►</button>
      </div>
    </div>
  );
};

export default ChatBox;
