import React, { useState, useEffect, memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import socket from "../../res/socket";
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

import { getConData } from "../../redux/modules/MapSlice";

const ScheduleInput = ({ room, day, index, content }) => {
  const [sendValue, setSendValue] = useState("");
  const [getShowing, setGetShowing] = useState("");
  const [conData, setConData] = useState({});

  const [sendResult, setSendResult] = useState(false);
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("test_receive", (data) => {
      setGetShowing(data.msg);
    });
  }, []);

  // live부분
  useEffect(() => {
    if (sendValue !== "" || room !== undefined) {
      const msg = { msg: sendValue, room: `${room}${day}${index}` };
      setGetShowing(sendValue);
      socket.emit("test_send", msg);
    } else {
      alert("메인페이지에");
    }
  }, [sendValue]);

  // live부분
  const deleteLastText = (key) => {
    if (key == 8 && getShowing.length == 1) {
      const resetmsg = { msg: "", room: `${room}${day}${index}` };
      setGetShowing("");
      socket.emit("test_send", resetmsg);
    }
  };

  const saveCard = () => {
    if (inputRef.current.value == "") {
      alert("일정을 넣어주세요.");
    } else {
      dispatch(getConData(conData));
    }
  };

  useEffect(() => {
    setConData({
      day: day,
      cardNum: `${day}${index}`,
      cardMemo: getShowing,
    });
  }, [getShowing]);

  return (
    <div className={styels.inputWrap}>
      <>
        <div>{getShowing}</div>
        <input
          ref={inputRef}
          key={index}
          placeholder="일정 입력"
          onChange={(e) => setSendValue(e.target.value)}
          onKeyDown={(e) => deleteLastText(e.keyCode)}
          required
        />
        <Btn color="#fffff" backgroundColor="#ffc51c" onClick={saveCard}>
          일정 저장
        </Btn>
      </>
    </div>
  );
};

export default memo(ScheduleInput);
