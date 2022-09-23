import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveDayData } from "../../redux/modules/ResultSlice";
import DetailScheduleInput from "./DetailScheduleInput";
import socket from "../../res/socket";
import Btn from "../elements/Btn";
import styles from "./Schedule.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const DetailScheduleCard = ({ data, postId }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const room = useSelector((state) => state?.schedule?.postId);
  const members = useSelector((state) => state.kakaoMap.members);

  const [result, setResult] = useState([]);

  const nickname = localStorage.getItem("nickname");
  const dayRoom = `dayDone${postId}`; //소켓

  //저장 버튼 눌렀을때만 dispatch 동작하기
  useEffect(() => {
    //마지막 일정 일때, 메인페이지로 돌아가게 처리
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
      navigation("/main");
    } else {
      console.log("result", result);
      dispatch(saveDayData(result));
    }
  }, [result]);

  //소켓 통신용
  useEffect(() => {
    socket.emit("join_dayDone", dayRoom);
  }, []);

  // 받은 마커 표시해주는 부분
  useEffect(() => {
    socket.on("receive_dayDone", (person) => {
      toast.success(`${person}가 저장되었습니다.`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }, [socket]);

  //일정의 컨텐츠 저장
  const onSaveAllSchedule = () => {
    if (members?.includes(nickname)) {
      let filterPinData = data.pin.filter((item) => item.day === data.day);
      let filterContentData = data.content.filter(
        (item) => item.day === data.day
      );
      setResult([
        `${data.day}`,
        { pin: filterPinData, con: filterContentData },
        { postId },
      ]);
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

    // socket
    sendMarker();
  };

  //소켓에 마커보내기
  const sendMarker = () => {
    socket.emit("send_dayDone", dayRoom, "일차");
  };

  return (
    <div className={styles.worksWrap}>
      <h2>
        우리들의 "<span className={styles.workDay}>{data.day}일차</span>" 일정
      </h2>
      {data.pin
        .filter((item) => item.day === data.day)
        .map((item, index) => {
          return (
            <div
              id={`${item.day}-${index + 1}`}
              className={styles.work}
              key={index}
            >
              <div className={styles.workIndex}>
                {index + 1}.{item.title}
              </div>
              <DetailScheduleInput
                room={room}
                day={item.day}
                content={data.content}
                index={index + 1}
                dayMemo={
                  data.content.filter((item) => item.day === data.day)[index]
                    ?.cardMemo
                }
              />
            </div>
          );
        })}
      <Btn
        color="#fffff"
        width="100%"
        backgroundColor="#ffc51c"
        onClick={onSaveAllSchedule}
      >
        {data.day}일차 전체 일정 저장
      </Btn>
      <ToastContainer />
    </div>
  );
};

export default memo(DetailScheduleCard);
