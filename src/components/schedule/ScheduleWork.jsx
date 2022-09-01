import React, { useState } from "react";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

const ScheduleWrite = ({ day }) => {
  //state
  const [cardNum, setCardNum] = useState([1]);

  //일정추가 버튼
  const addWork = () => {
    const newWork = Number(cardNum.slice(-1)[0]) + 1;
    setCardNum([...cardNum, newWork]);
  };

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
            placeholder="제목 입력"
            required
          />
          <textarea
            name="work_cont"
            className={styels.content}
            placeholder="일정 입력"
            required
          />
        </div>
      ))}
      <Btn backgroundColor="gray" width="25px" onClick={addWork}>
        +
      </Btn>
    </div>
  );
};

export default ScheduleWrite;
