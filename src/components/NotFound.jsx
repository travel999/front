import React from "react";
import Chatting from "./chat/Chatting";
import RealTimeFuc from "./RealTimeFuc";

const NotFound = () => {
  return (
    <div>
      페이지를 찾을수 없습니다.
      <Chatting />
      <RealTimeFuc />
    </div>
  );
};

export default NotFound;
