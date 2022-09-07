import React, { useState, useRef } from "react";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

// import ScheduleMap from "./ScheduleMap";

const ScheduleWrite = ({ day, name }) => {
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
  return (
    <div className={styels.worksWrap}>
      <h2>{day + 1}일차 우리가 갈 곳..!</h2>
      {name.map((item, index) => (
        <div className={styels.work} key={`${item.lat}-${item.lng}`}>
          <h3>{index + 1}번째 일정</h3>
          <input
            type="text"
            name="placeName"
            id="placeName"
            value={item.title}
            readOnly
          />
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
      {/* <Btn backgroundColor="gray" width="25px" onClick={onAddWork}>
        +
      </Btn> */}
      <Btn onClick={onSaveStorage}>일정저장하기</Btn>
    </div>
  );
};

export default ScheduleWrite;
