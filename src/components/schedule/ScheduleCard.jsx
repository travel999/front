import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

import { getConData } from "../../redux/modules/MapSlice";

// import ScheduleMap from "./ScheduleMap";

const ScheduleCard = ({ data }) => {
  //Hool
  const divRef = useRef();
  const dispatch = useDispatch();

  //state
  const [conData, setConData] = useState({});

  //함수

  //이벤트 함수

  const onGetContent = (e) => {
    const { name, value } = e.target;
    setConData({ ...conData, [name]: value });
  };

  //일정의 컨텐츠 저장
  const onSaveStorage = () => {
    dispatch(getConData(conData));
  };

  //입력한 값
  return (
    <div className={styels.worksWrap}>
      <h2>
        우리들의 "<span className={styels.workDay}>{data.day}일차</span>" 일정
      </h2>

      {data.pin.pin.map((item, index) => (
        <div className={styels.work} key={`${item.lat}-${item.lng}`}>
          <div className={styels.workIndex}>
            {index + 1}.{item.title}
          </div>
          <textarea
            className={styels.content}
            name={index + 1}
            placeholder="일정 입력"
            ref={divRef}
            onChange={onGetContent}
            required
          />
        </div>
      ))}
      <Btn onClick={onSaveStorage}>일정 저장</Btn>
    </div>
  );
};

export default ScheduleCard;
