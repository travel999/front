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

const DetailScheduleInput = ({ day, index, dayMemo }) => {
  const [sendValue, setSendValue] = useState("");
  const [conData, setConData] = useState({});
  const inputRef = useRef(null);
  const { id } = useParams();
  const nickname = localStorage.getItem("nickname");

  const dispatch = useDispatch();
  const liveText = $(`#${id}${day}${index}`).text();

  // 받아온 day마다의 카드에 값을 넣어준다.
  useEffect(() => {
    $(`#${id}${day}${index}`).text(dayMemo);
  }, [dayMemo]);

  // socket 방 입장.
  useEffect(() => {
    socket.emit("join_box", `${id}${day}${index}`);
    socket.emit("join_save", `${id}${day}${index}save`);
  }, []);

  // 실시간으로 바뀌는 값을 소켓에 보낸다.

  useEffect(() => {
    if (sendValue !== "") {
      const msg = { msg: sendValue, room: `${id}${day}${index}` };
      $(`#${id}${day}${index}`).text(msg.msg);
      socket.emit("liveText_send", msg);
    }
  }, [sendValue]); // 의존성 배열에 어떤 값을 넣어야 렌더링 될지.. 애매해서 렌더링 될 때마다 useEffect 실행되게 배열 빼놨슴다.

  // 소켓에서 실시간 데이터를 받아온다.
  useEffect(() => {
    socket.on("liveText_receive", (data) => {
      $(`#${data.room}`).text(data.msg); // 받아온 id에다가 값을 준다.
    });

    // socket.on("SaveGet_data", (data) => {
    //   toast.success(`${data.author} 님이 저장하였습니다.`, {
    //     position: "top-right",
    //     autoClose: 1500,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     limit: 1,
    //   });
    // });
  }, [socket]);

  // 콘데이터가 만들어지는곳
  useEffect(() => {
    setConData({
      day: day,
      cardNum: `${day}${index}`,
      cardMemo: liveText,
    });
  }, [liveText]);

  //함수

  // 마지막 한글자 지워주는 함수
  const deleteLastText = (key) => {
    if (key == 8 && liveText.length == 1) {
      const resetmsg = { msg: "", room: `${id}${day}${index}` };
      $(`#${id}${day}${index}`).text(" ");
      socket.emit("liveText_send", resetmsg);
    }
  };

  // 카드 일정 저장
  const saveCard = () => {
    if (inputRef.current.value == "") {
      alert("일정을 넣어주세요.");
    } else {
      // 콘데이터 전송.
      dispatch(getConData(conData));
      // 다른사람들에게도 토스트가 간다.
      SendOtherPeople();
    }
  };

  // 완료를 누르면 다른사람들에게도 토스트가 간다.
  const SendOtherPeople = () => {
    // 카드마다 달려있는 버튼이랑 연결 일정저장버튼 누르면 실행됌.
    const data = {
      room: `${id}${day}${index}save`,
      author: nickname,
    };
    console.log(data);
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

  return (
    <div className={styels.inputWrap}>
      <>
        <p id={`${id}${day}${index}`}></p>
        {/* <div>{getShowing}</div> */}
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

export default memo(DetailScheduleInput);
