import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ScheduleInput from "./ScheduleInput";
import { saveDayData } from "../../redux/modules/ResultSlice";
import { useNavigate } from "react-router-dom";

const ScheduleCard = ({ data, postId }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const room = useSelector((state) => state?.schedule?.postId);
  //state
  const [result, setResult] = useState([]);
  //함수

  //이벤트 함수
  console.log(data.allDay.length, data.day);
  //일정의 컨텐츠 저장
  const onSaveStorage = () => {
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
      setTimeout(() => {
        window.location.replace("/main");
      }, 2000);
    } else {
      dispatch(saveDayData(result));
    }
  }, [result]);

  return (
    <div className={styels.worksWrap}>
      <h2>
        우리들의 "<span className={styels.workDay}>{data.day}일차</span>" 일정
      </h2>
      {data.pin
        .filter((item) => item.day === data.day)
        .map((item, index) => {
          return (
            <div
              id={`${item.day}-${index}`}
              className={styels.work}
              key={index}
            >
              <div className={styels.workIndex}>
                {index + 1}.{item.title}
              </div>
              <ScheduleInput
                room={room}
                day={item.day}
                content={data.content}
                index={index + 1}
              />
            </div>
          );
        })}
      <Btn
        color="#fffff"
        width="100%"
        backgroundColor="#ffc51c"
        onClick={onSaveStorage}
      >
        {data.day}일차 전체 일정 저장
      </Btn>
      <ToastContainer />
    </div>
  );
};

export default ScheduleCard;
