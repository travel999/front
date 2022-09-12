import React, { useState, useRef } from "react";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

// import ScheduleMap from "./ScheduleMap";

const ScheduleCard = ({ data }) => {
  //초기화 값
  const initState = {
    placeName: "",
    locate: "",
    content: "",
  };
  //Hool
  const divRef = useRef();

  //state
  const [conData, setConData] = useState("");
  const [conList, setConList] = useState([]);
  const [listData, setListData] = useState(initState);

  //함수

  //이벤트 함수

  const onGetContent = (e) => {
    setConData(e.target.value);
  };
  //onChange 후 포커싱 아웃될때 제일 최종 값만 가지고 와서 리스트 배열 생성
  const onGetContentList = () => {
    setConList([...conList, conData]);
  };

  //일정 저장
  const onSaveStorage = () => {};
  //입력한 값
  console.log(data.pin.pin);
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
            name="content"
            className={styels.content}
            placeholder="일정 입력"
            ref={divRef}
            onChange={onGetContent}
            onBlur={onGetContentList}
            required
          />
        </div>
      ))}
      <Btn onClick={onSaveStorage}>일정저장하기</Btn>
    </div>
  );
};

export default ScheduleCard;
