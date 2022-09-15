import React, { useState, useEffect, memo } from "react";
import io from "socket.io-client";
import styels from "./Schedule.module.css";

const socket = io.connect("http://52.78.142.77/", {
  path: "/socket.io",
  transports: ["websocket"],
});

const ScheduleInput = ({ room, day, index, conData, setConData, content }) => {
  const [sendValue, setSendValue] = useState("");
  const [getShowing, setGetShowing] = useState("");

  useEffect(() => {
    socket.on("test_receive", (data) => {
      console.log("받음:" + data.msg);
      setGetShowing(data.msg);
      //   setConData({ day: day, memo: getShowing });
    });
  }, []);

  useEffect(() => {
    if (sendValue !== "") {
      console.log("보내짐");
      const msg = { msg: sendValue, room: `${room}${day}${index}` };
      setGetShowing(sendValue);
      // slice
      //   setConData([...conData, { day: day, index: index, memo: getShowing }]);
      socket.emit("test_send", msg);
    }
  }, [sendValue]);

  const deleteLastText = (key) => {
    if (key == 8 && getShowing.length == 1) {
      const resetmsg = { msg: "", room: `${room}${day}${index}` };
      setGetShowing("");
      socket.emit("test_send", resetmsg);
    }
  };

  const SendConData = () => {
    setConData([...conData, { day, index, memo: sendValue }]);
  };

  //   setConData({ ...conData, day: day, [index]: sendValue, });

  console.log(content.length);

  return (
    <div className={styels.inputWrap}>
      {content.length !== 0 ? (
        content
          .filter((item) => item.day === day)
          .map((item, index) => {
            return (
              <>
                {/* <div>{item.memo}</div> */}
                <input
                  key={index}
                  placeholder="일정 입력"
                  onChange={(e) => setSendValue(e.target.value)}
                  onKeyDown={(e) => deleteLastText(e.keyCode)}
                  value={item.memo}
                  onBlur={() => SendConData()}
                  required
                />
              </>
            );
          })
      ) : (
        <>
          {console.log("hhi")}
          <input
            placeholder="일정 입력"
            onChange={(e) => setSendValue(e.target.value)}
            onKeyDown={(e) => deleteLastText(e.keyCode)}
            onBlur={() => SendConData()}
            required
          />
        </>
      )}
    </div>
  );
};

export default memo(ScheduleInput);
