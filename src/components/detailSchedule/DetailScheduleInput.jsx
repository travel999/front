import React, { useState, useEffect, memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getConData } from "../../redux/modules/MapSlice";
import socket from "../../res/socket";
import Btn from "../elements/Btn";
import styles from "../module.css/DetailSchedule.module.css";
import { toast, ToastContainer } from "react-toastify";
import $ from "jquery";

const DetailScheduleInput = ({ day, index, dayMemo, key }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.kakaoMap.members);
  const inputRef = useRef(null);
  const { id } = useParams();

  const [sendValue, setSendValue] = useState("");
  const [conData, setConData] = useState({});
  const [colorChange, setColorChange] = useState(true);

  const nickname = localStorage.getItem("nickname");
  const liveText = $(`#${id}${day}${index}`).text();

  // 받아온 day마다의 카드에 값을 넣어준다.
  useEffect(() => {
    $(`#${id}${day}${index}`).text(dayMemo);
  }, [dayMemo]);

  // socket 방 입장.
  useEffect(() => {
    if (members?.includes(nickname)) {
      socket.emit("join_box", `${id}${day}${index}`);
      socket.emit("join_save", `${id}${day}${index}save`);
      inputRef.current.value = " ";
    }
  }, []);

  // 실시간으로 바뀌는 값을 소켓에 보낸다.
  useEffect(() => {
    if (members?.includes(nickname)) {
      if (sendValue !== "") {
        const msg = { msg: sendValue, room: `${id}${day}${index}` };
        $(`#${id}${day}${index}`).text(msg.msg);
        socket.emit("liveText_send", msg);
      }
    }
  }, [sendValue]); // 의존성 배열에 어떤 값을 넣어야 렌더링 될지.. 애매해서 렌더링 될 때마다 useEffect 실행되게 배열 빼놨슴다.

  // 소켓에서 실시간 데이터를 받아온다.
  useEffect(() => {
    socket.on("liveText_receive", (data) => {
      $(`#${data.room}`).text(data.msg); // 받아온 id에다가 값을 준다.
    });

    socket.on("SaveGet_data", (data) => {
      // setColorChange(false);
      $(`#${data.btnId}`).css("background-color", "#ffc51c");
    });
  }, [socket]);

  // 콘데이터가 만들어지는곳
  useEffect(() => {
    setConData({
      day: day,
      cardNum: `${day}${index}`,
      cardMemo: liveText,
    });
  }, [liveText]);

  // 마지막 한글자 지워주는 함수
  const onDeleteLastText = (key) => {
    if (members?.includes(nickname)) {
      if (key == 8 && liveText.length == 1) {
        const resetmsg = { msg: "", room: `${id}${day}${index}` };
        $(`#${id}${day}${index}`).text(" ");
        socket.emit("liveText_send", resetmsg);
      }
    }
  };

  // 카드 일정 저장
  const onSaveCard = (e) => {
    if (e.target.id === `${id}${day}${index}daySaveBtn`) {
      if (members?.includes(nickname)) {
        if (inputRef.current.value == "") {
          alert("일정을 넣어주세요.");
        } else {
          // 콘데이터 전송.
          dispatch(getConData(conData));
          // 다른사람들에게도 토스트가 간다.
          sendOtherPeople();
          inputRef.current.value = " ";
          // setColorChange(false);
          $(`#${id}${day}${index}daySaveBtn`).css(
            "background-color",
            "#ffc51c"
          );
        }
      } else {
        toast.success(`권한이 없습니다.`, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const sendOtherPeople = () => {
    const data = {
      room: `${id}${day}${index}save`,
      author: nickname,
      btnId: `${id}${day}${index}daySaveBtn`,
    };

    socket.emit("SaveDone_data", data);
    toast.success(`일정 내용이 저장되었습니다.`, {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className={styles.inputWrap}>
      <p id={`${id}${day}${index}`}></p>
      {members?.includes(nickname) ? (
        <div className={styles.inputContent}>
          <input
            ref={inputRef}
            key={index}
            name={`${id}${day}${index}input`}
            placeholder="일정 입력"
            onChange={(e) => setSendValue(e.target.value)}
            onKeyDown={(e) => onDeleteLastText(e.keyCode)}
            required
            className={styles.inputBox}
            maxLength="60"
          />
          <Btn
            id={`${id}${day}${index}daySaveBtn`}
            color="#fffff"
            backgroundColor="lightgray"
            onClick={onSaveCard}
          >
            내용
            <br />
            저장
          </Btn>
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default memo(DetailScheduleInput);
