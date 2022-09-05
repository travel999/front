import React from "react";
import styles from "./Chat.module.css";

const Chat = () => {
  return (
    <div className={styles.bicbox}>
      <div>채팅부분</div>
      <div>내용</div>
      <input />
      <button>입력</button>
    </div>
  );
};

export default Chat;
