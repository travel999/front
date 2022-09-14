import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import { getConData } from "../../redux/modules/MapSlice";
import ScheduleInput from "./ScheduleInput";

const ScheduleCard = ({ data }) => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state?.schedule?.postId);
  const [conData, setConData] = useState({});

  // const onGetContent = (e) => {
  //   const { name, value } = e.target;
  //   setConData({ ...conData, [name]: value });
  // };

  //일정의 컨텐츠 저장
  const onSaveStorage = () => {
    dispatch(getConData(conData));
    console.log(conData);
  };

  return (
    <div className={styels.worksWrap}>
      <h2>
        우리들의 "<span className={styels.workDay}>{data.day}일차</span>" 일정
      </h2>

      {data.pin
        .filter((item) => item.day === data.day)
        .map((item, index) => (
          <div
            id={`${item.day}-${index}`}
            className={styels.work}
            key={`${item.lat}-${item.lng}`}
          >
            <div className={styels.workIndex}>
              {index + 1}.{item.title}
            </div>
            <ScheduleInput
              setConData={setConData}
              conData={conData}
              room={room}
              day={item.day + 1}
              index={index + 1}
            />
          </div>
        ))}

      <Btn onClick={onSaveStorage}>일정 저장</Btn>
    </div>
  );
};

export default ScheduleCard;
