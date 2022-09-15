import React from "react";
import { useDispatch, useSelector } from "react-redux";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import ScheduleInput from "./ScheduleInput";
// import { useEffect } from "react";
// import { dateISOString } from "react-s3/lib/Date";
// import { DRAFT_STATE } from "immer/dist/internal";

const ScheduleCard = ({ data }) => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state?.schedule?.postId);

  //state

  //함수

  //이벤트 함수

  //일정의 컨텐츠 저장
  const onSaveStorage = () => {

    // dispatch(getConData(conData));

  };

  // const newContent = content.filter((item) => item.day !== data.day);
  // setContent(newContent);

  // useEffect(() => {
  //   let filterPinData = data.pin.filter((item) => item.day === data.day);
  //   let filterContentData = [];
  //   if (data.content.length !== 0) {
  //     filterContentData = data.content.filter((item) => item.day === data.day);
  //   } else {
  //     filterContentData = "";
  //   }

  //   setResult({ pin: filterPinData, con: filterContentData });
  // }, []);

  //입력한 값

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
                content={data.content}
              />
            </div>
          );
        })}

      <Btn onClick={onSaveStorage}>{data.day}일차 전체 일정 저장</Btn>
    </div>
  );
};

export default ScheduleCard;
