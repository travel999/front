import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import { getConData } from "../../redux/modules/MapSlice";
import ScheduleInput from "./ScheduleInput";
// import { useEffect } from "react";
// import { dateISOString } from "react-s3/lib/Date";
// import { DRAFT_STATE } from "immer/dist/internal";

const ScheduleCard = ({ data }) => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state?.schedule?.postId);

  // day2:[ pin:[~],content:[~]]

  //state
  const [conData, setConData] = useState([]);
  const [result, setResult] = useState([]);

  //함수

  //이벤트 함수

  const onGetContent = (e) => {
    const { name, value } = e.target;
    setConData([...conData, { day: data.day, [name]: value }]);
  };

  //일정의 컨텐츠 저장
  const onSaveStorage = () => {
    dispatch(getConData(conData));
    setConData([]);
  };

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

  console.log(data);
  //입력한 값

  return (
    <div className={styels.worksWrap}>
      <h2>
        우리들의 "<span className={styels.workDay}>{data.day}일차</span>" 일정
      </h2>
      <div></div>
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
                setConData={setConData}
                conData={conData}
                room={room}
                day={item.day}
                index={index + 1}
              />
            </div>
          );
        })}

      <Btn onClick={onSaveStorage}>일정 저장</Btn>
    </div>
  );
};

export default ScheduleCard;
