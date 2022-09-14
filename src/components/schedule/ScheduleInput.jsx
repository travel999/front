import React, { useState, useRef, useEffect, memo } from "react";
import io from "socket.io-client";

const socket = io.connect("http://52.78.142.77/", {
  path: "/socket.io",
  transports: ["websocket"],
});

const ScheduleInput = (room, day = 1, index = 1, onGetContent) => {
  const [sendValue, setSendValue] = useState("");
  const [getShowing, setGetShowing] = useState("");
  const liveRef = useRef(null);

  console.log(room, day, index);

  useEffect(() => {
    socket.on("test_receive", (data) => {
      console.log("받음:" + data.msg);
      setGetShowing(data.msg);
    });
  }, []);

  useEffect(() => {
    if (sendValue !== "") {
      console.log("보내짐");
      const msg = { msg: sendValue, room: `${room} + ${day} + ${index}` };
      setGetShowing(sendValue);
      socket.emit("test_send", msg);
    }
  }, [sendValue]);

  const deleteLastText = (key) => {
    if (key == 8 && getShowing.length == 1) {
      const resetmsg = { msg: "", room: `${room} + ${day} + ${index}` };
      setGetShowing("");
      socket.emit("test_send", resetmsg);
    }
  };

  return (
    <>
      <div>{getShowing}</div>
      <input
        placeholder="일정 입력"
        onChange={(e) => setSendValue(e.target.value)}
        ref={liveRef}
        onKeyDown={(e) => deleteLastText(e.keyCode)}
        required
      />
    </>
  );
};

export default memo(ScheduleInput);
