import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveDayData } from "../../redux/modules/ResultSlice";
import ScheduleInput from "./ScheduleInput";
import Btn from "../elements/Btn";
import styles from "./Schedule.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const ScheduleCard = ({ data, postId, SendOtherPeople }) => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state?.schedule?.postId);

  const [result, setResult] = useState([]);

  //저장 버튼 눌렀을때만 dispatch 동작하기.
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
      setTimeout(() => {
        window.location.replace("/main");
      }, 2000);
    } else {
      dispatch(saveDayData(result));
    }
  }, [result]);

  //일정의 컨텐츠 저장.
  const onSaveAllSchedule = () => {
    let filterPinData = data.pin.filter((item) => item.day === data.day);
    let filterContentData = data.content.filter(
      (item) => item.day === data.day
    );
    setResult([
      `${data.day}`,
      { pin: filterPinData, con: filterContentData },
      { postId },
    ]);
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
              id={`${item.day}-${index}`}
              className={styles.work}
              key={index}
            >
              <div className={styles.workIndex}>
                {index + 1}.{item.title}
              </div>
              <ScheduleInput
                room={room}
                day={item.day}
                content={data.content}
                SendOtherPeople={SendOtherPeople}
                index={index + 1}
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

export default ScheduleCard;
