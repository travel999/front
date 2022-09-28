import React, { useState, useEffect, memo, useRef } from "react";
import { useDispatch } from "react-redux";
import { getConData } from "../../redux/modules/MapSlice";
import socket from "../../res/socket";
import Btn from "../elements/Btn";
import styles from "../module.css/Schedule.module.css";

const ScheduleInput = ({ room, day, index }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [sendValue, setSendValue] = useState("");
  const [getShowing, setGetShowing] = useState("");
  const [conData, setConData] = useState({});

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
      // alert("메인페이지에");
    }
  }, [sendValue]);

  useEffect(() => {
    setConData({
      day: day,
      cardNum: `${day}${index}`,
      cardMemo: getShowing,
    });
  }, [getShowing]);

  const onDeleteLastText = (key) => {
    if (key == 8 && getShowing.length == 1) {
      const resetmsg = { msg: "", room: `${room}${day}${index}` };
      setGetShowing("");
      socket.emit("test_send", resetmsg);
    }
  };

  const onSaveCard = () => {
    if (inputRef.current.value == "") {
      alert("일정을 넣어주세요.");
    } else {
      dispatch(getConData(conData));
    }
  };

  return (
    <div className={styles.inputWrap}>
      <>
        <div>{getShowing}</div>
        <input
          ref={inputRef}
          key={index}
          placeholder="일정 입력"
          onChange={(e) => setSendValue(e.target.value)}
          onKeyDown={(e) => onDeleteLastText(e.keyCode)}
          required
        />
        <Btn color="#fffff" backgroundColor="#ffc51c" onClick={onSaveCard}>
          일정 저장
        </Btn>
      </>
    </div>
  );
};

export default memo(ScheduleInput);
