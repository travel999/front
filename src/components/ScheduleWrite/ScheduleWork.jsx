import React, { useState } from "react";

const ScheduleWrite = ({ day }) => {
  //state
  const [cardNum, setCardNum] = useState([1]);

  //일정추가 버튼
  const addWork = () => {
    const newWork = Number(cardNum.slice(-1)[0]) + 1;
    setCardNum([...cardNum, newWork]);
  };

  return (
    <div className="worksWrap">
      <h2>{day}일차 우리가 갈 곳..!</h2>
      {cardNum.map((num) => (
        <div className="work" cardNum={num}>
          <h3>{num}.</h3>
          <input type="text" name="work_title" />
          <textarea name="work_cont"></textarea>
        </div>
      ))}
      <button onClick={addWork}>일정 추가</button>
    </div>
  );
};

export default ScheduleWrite;
