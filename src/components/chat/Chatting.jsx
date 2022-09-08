import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./Chatting.module.css";
import ChatBox from "./ChatBox";

const socket = io.connect("link받아야함");

const Chatting = () => {
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 부모한테 porp으로 받을것들
  const [room, setRoom] = useState(""); // room 이름은 게시글의 id값을 쓰던가 해야할것 같음.

  // 작성페이지에서 받아올 예정
  const [userlist, setUserList] = useState([
    "jane",
    "michael",
    "peter",
    "tatata",
  ]);
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  useEffect(() => {
    if (userlist !== "" && room !== "") {
      userlist.map((member) => {
        //emit 데이터 전송
        socket.emit("join이름", room);
      });
    }
  }, [userlist]);

  return (
    <div className={styles.bicbox}>
      <h3>Chatting Room</h3>
      <ChatBox socket={socket} userlist={userlist} room={room} />
    </div>
  );
};

export default Chatting;
