import React, { useState } from "react";
import io from "socket.io-client";
import ChatBox from "./ChatBox";

const socket = io.connect("link받아야함");

const Chatting = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {};
  if (username !== "" && room !== "") {
    socket.emit("join이름 정해야함", room);
    //emit 데이터 전송
  }
  return (
    <div>
      <h3>chat</h3>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="room id"
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>join a room</button>
      <ChatBox socket={socket} username={username} room={room} />
    </div>
  );
};

export default Chatting;
