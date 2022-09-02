import React, { useState } from "react";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

const ScheduleWrite = ({ day }) => {
  //초기화 값
  const initState = {
    placeName: "",
    locate: "",
    content: "",
  };

  //state
  const [cardNum, setCardNum] = useState([1]);
  const [conData, setConData] = useState("");
  const [listData, setListData] = useState(initState);

  //함수
  if (conData !== "") {
    setListData(...listData, {
      placeName: "123",
      locate: "1234",
      content: conData,
    });
    window.localStorage.setItem(day, listData);
  }

  //이벤트 함수
  //일정추가 버튼
  const onAddWork = () => {
    const newWork = Number(cardNum.slice(-1)[0]) + 1;
    setCardNum([...cardNum, newWork]);
  };

  //입력한 값
  return (
    <div className={styels.worksWrap}>
      <h2>{day + 1}일차 우리가 갈 곳..!</h2>
      {cardNum.map((num) => (
        <div className={styels.work} key={num}>
          <h3>{num}번째 일정</h3>
          <input
            type="text"
            name="work_title"
            className={styels.title}
            placeholder="장소 선택"
            required
          />
          <textarea
            name="content"
            className={styels.content}
            placeholder="일정 입력"
            onChange={(e) => setConData(e.target.value)}
            required
          />
        </div>
      ))}
      <Btn backgroundColor="gray" width="25px" onClick={onAddWork}>
        +
      </Btn>
    </div>
  );
};

export default ScheduleWrite;
