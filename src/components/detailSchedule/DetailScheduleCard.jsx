import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveDayData } from "../../redux/modules/ResultSlice";
import { moveOneCardPin } from "../../redux/modules/MoveMapSlice";
import DetailScheduleInput from "./DetailScheduleInput";
import socket from "../../res/socket";
import Btn from "../elements/Btn";
import styles from "../module.css/DetailSchedule.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteData, deleteDataForSocket } from "../../redux/modules/MapSlice";

const DetailScheduleCard = ({ data, postId, key }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const room = useSelector((state) => state?.schedule?.postId);
  const members = useSelector((state) => state.kakaoMap.members);

  const [result, setResult] = useState([]);
  const [colorChange, setColorChange] = useState(true);
  const [changeData, setChageData] = useState(data.pin);

  const nickname = localStorage.getItem("nickname");
  const dayRoom = `dayDone${postId}`; //소켓

  //저장 버튼 눌렀을때만 dispatch 동작하기.
  useEffect(() => {
    //마지막 일정 일때, 메인페이지로 돌아가게 처리
    if (result.length !== 0) {
      if (data.allDay.length === data.day) {
        dispatch(saveDayData(result));
        toast.success("모든 일정을 저장했습니다.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigation("/main");
        });
      } else {
        dispatch(saveDayData(result));
      }
    }
  }, [result]);

  useEffect(() => {
    // socket 일정 저장 받음
    socket.on("receive_dayDone", (person) => {
      // forToast(person);
      setColorChange(false);
    });
    socket.on("receive_delete", (idx, pins) => {
      dispatch(deleteDataForSocket({ idx, pins }));
    });
  }, [socket]);

  //삭제대비 data state
  useEffect(() => {
    setChageData(data.pin);
  }, [data]);

  useEffect(() => {
    // socket 입장
    socket.emit("join_dayDone", dayRoom);
  }, []);

  const forToast = (person) => {
    toast.success(`${person}님이 저장하었습니다.`, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  //등록된 일정 삭제하기
  const onDeleteSchedule = (idx, day) => {
    dispatch(deleteData({ idx, day }));
    // socket
    socket.emit("delete_card", dayRoom, idx, data.pin);
  };

  //일정의 컨텐츠 저장
  const onSaveAllSchedule = () => {
    if (members?.includes(nickname)) {
      let filterPinData = changeData.filter((item) => item.day === data.day);
      let filterContentData = data.content.filter(
        (item) => item.day === data.day
      );
      setResult([
        `${data.day}`,
        { pin: filterPinData, con: filterContentData },
        { postId },
      ]);
      setColorChange(false);
    } else {
      toast.success("권한이 없습니다.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // socket 일정 저장 보냄
    socket.emit("send_dayDone", dayRoom, nickname);
  };

  //카드 클릭시 해당 좌표로 지도 이동
  const onMovePin = () => {
    dispatch(moveOneCardPin);
  };

  return (
    <div
      className={
        members?.includes(nickname) ? styles.worksWrap : styles.noWorksWrap
      }
    >
      <h2>
        우리들의 "<span className={styles.workDay}>{data.day}일차</span>" 일정
      </h2>
      {changeData
        .filter((item) => item.day === data.day)
        .map((item, index) => {
          return (
            <div
              id={`${item.day}-${index + 1}`}
              className={styles.work}
              onClick={() => onMovePin(item.lat, item.lng)}
              key={index}
            >
              <div className={styles.workInline}>
                <div className={styles.workIndex}>
                  {index + 1}.{item.title}
                </div>
                {members?.includes(nickname) ? (
                  <div>
                    <button onClick={() => onDeleteSchedule(index, item.day)}>
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                ) : null}
              </div>
              <DetailScheduleInput
                room={room}
                day={item.day}
                content={data.content}
                index={index + 1}
                key={key}
                dayMemo={
                  data.content.filter((item) => item.day === data.day)[index]
                    ?.cardMemo
                }
              />
            </div>
          );
        })}
      <div className={styles.daySave}>
        {members?.includes(nickname) ? (
          <Btn
            class="saveBtn"
            color="#fffff"
            width="100%"
            backgroundColor={colorChange ? "lightgray" : "#ffc51c"}
            onClick={onSaveAllSchedule}
          >
            {data.day}일차 전체 일정 저장
          </Btn>
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DetailScheduleCard;
