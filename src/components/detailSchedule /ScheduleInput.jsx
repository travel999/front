import React, { useState, useEffect, memo, useRef } from "react";
import { useDispatch } from "react-redux";

import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

import { getConData } from "../../redux/modules/MapSlice";
import { useParams } from "react-router-dom";

const ScheduleInput = ({
  room,
  day,
  index,
  content,
  dayMemo,
  SendOtherPeople,
  socket,
}) => {
  const [sendValue, setSendValue] = useState("");
  const [getShowing, setGetShowing] = useState(dayMemo);
  const [conData, setConData] = useState({});

  const inputRef = useRef(null);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    setGetShowing(dayMemo);
  }, [dayMemo]);

  useEffect(() => {
    socket.emit("join_box", `${id}${day}${index}`);
  }, []);

  useEffect(() => {
    socket.on("liveText_receive", (data) => {
      console.log("받음:" + data.msg);
      setGetShowing(data.msg);
      //   setConData({ day: day, memo: getShowing });
    });
  }, [socket]);

  console.log(`${id}${day}${index}`);

  useEffect(() => {
    if (sendValue !== "") {
      const msg = { msg: sendValue, room: `${id}${day}${index}` };
      setGetShowing(sendValue);
      // slice
      //   setConData([...conData, { day: day, index: index, memo: getShowing }]);
      socket.emit("liveText_send", msg);
    }
  }, [sendValue]);

  useEffect(() => {
    setConData({
      day: day,
      cardNum: `${day}_${index}`,
      cardMemo: getShowing,
    });
  }, [getShowing]);

  //함수
  const deleteLastText = (key) => {
    if (key == 8 && getShowing.length == 1) {
      const resetmsg = { msg: "", room: `${id}${day}${index}` };
      setGetShowing("");
      socket.emit("liveText_send", resetmsg);
    }
  };

  const saveCard = () => {
    SendOtherPeople();
    if (inputRef.current.value == "") {
      alert("일정을 넣어주세요.");
    } else {
      dispatch(getConData(conData));
    }
  };
    console.log(getShowing)

  //   setConData({ ...conData, day: day, [index]: sendValue, });

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
