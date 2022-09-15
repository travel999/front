import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import io from "socket.io-client";
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

import { getConData } from "../../redux/modules/MapSlice";

const socket = io.connect("http://52.78.142.77/", {
  path: "/socket.io",
  transports: ["websocket"],
});

const ScheduleInput = ({ room, day, index, content }) => {
  const [sendValue, setSendValue] = useState("");
  const [getShowing, setGetShowing] = useState("");
  const [conData, setConData] = useState({});
  const [sendResult, setSendResult] = useState(false);

  const dispatch = useDispatch();

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

  const saveCard = () => {
    dispatch(getConData(conData));
  };
  console.log(conData);
  console.log(sendResult);

  useEffect(() => {
    setConData({
      day: day,
      cardNum: `${day}_${index}`,
      cardMemo: getShowing,
    });
  }, [getShowing]);

  console.log("input", content);
  //   setConData({ ...conData, day: day, [index]: sendValue, });

  return (
    <div className={styels.inputWrap}>
      <>
        <div>{getShowing}</div>
        <input
          key={index}
          placeholder="일정 입력"
          onChange={(e) => setSendValue(e.target.value)}
          onKeyDown={(e) => deleteLastText(e.keyCode)}
          required
        />
        <Btn onClick={saveCard}>일정 저장</Btn>
      </>
    </div>
  );
};

export default memo(ScheduleInput);
