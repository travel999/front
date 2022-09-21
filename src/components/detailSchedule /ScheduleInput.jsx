import React, { useState, useEffect, memo, useRef } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import $ from "jquery";

import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import { toast, ToastContainer } from "react-toastify";

import { getConData } from "../../redux/modules/MapSlice";
import { useParams } from "react-router-dom";

const socket = io.connect("http://52.78.142.77/", {
  path: "/socket.io",
  transports: ["websocket"],
});

// room 안들어옴.
const ScheduleInput = ({ room, day, index, content, value, title }) => {
  const [sendValue, setSendValue] = useState("");
  const [getShowing, setGetShowing] = useState(value);
  const [conData, setConData] = useState({});
  const inputRef = useRef(null);
  const { id } = useParams();
  const nickname = localStorage.getItem("nickname");

  const dispatch = useDispatch();

  useEffect(() => {
    setGetShowing(value);
  }, [value]);

  useEffect(() => {
    socket.emit("join_box", `${id}${day}${index}`);
    socket.emit("join_save", `${id}${day}${index}save`);
  }, []);

  useEffect(() => {
    if (sendValue !== "") {
      const msg = { msg: sendValue, room: `${id}${day}${index}` };
      // setGetShowing(sendValue); ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      $(`#${id}${day}${index}`).text(msg.msg); //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      // slice
      //   setConData([...conData, { day: day, index: index, memo: getShowing }]);
      socket.emit("liveText_send", msg);
    }
  }, [sendValue]);

  useEffect(() => {
    socket.on("liveText_receive", (data) => {
      // setGetShowing(data.msg);
      //   setConData({ day: day, memo: getShowing });
      $(`#${data.room}`).text(data.msg); //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    });

    socket.on("SaveGet_data", (data) => {
      toast.success(`${data.author} 님이 저장하였습니다.`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        limit: 1,
      });
    });
  }, [socket]);

  const deleteLastText = (key) => {
    if (key == 8 && getShowing.length == 1) {
      const resetmsg = { msg: "", room: `${id}${day}${index}` };
      setGetShowing("");
      socket.emit("liveText_send", resetmsg);
    }
  };

  const saveCard = () => {
    if (inputRef.current.value == "") {
      alert("일정을 넣어주세요.");
    } else {
      dispatch(getConData(conData));
      SendOtherPeople();
    }
  };

  useEffect(() => {
    setConData({
      day: day,
      cardNum: `${day}_${index}`,
      cardMemo: getShowing,
    });
  }, [getShowing]);

  //   setConData({ ...conData, day: day, [index]: sendValue, });

  const SendOtherPeople = () => {
    // 카드마다 달려있는 버튼이랑 연결 일정저장버튼 누르면 실행됌.
    const data = {
      room: `${id}${day}${index}save`,
      author: nickname,
    };

    socket.emit("SaveDone_data", data);
    toast.success(`${data.author} 님이 저장하였습니다.`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // const getValue = document.getElementById(`${title}`);
  // getValue.innerHTML = `<div>${getShowing}</div>`;

  return (
    <div className={styels.inputWrap}>
      <>
        <p id={`${id}${day}${index}`}></p>
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
        <ToastContainer />
      </>
    </div>
  );
};

export default memo(ScheduleInput);
