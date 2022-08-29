import React, { useState } from "react";
import SceduleWork from "./SceduleWork";

const SceduleList = () => {
  //state
  const [numDay, setNumDay] = useState([1]);
  const [checkDiv, setCheckDiv] = useState(false);

  //일자추가
  const addDay = () => {
    const newDay = Number(numDay.slice(-1)[0]) + 1;
    setNumDay([...numDay, newDay]);
  };
  //선택한 일자의 일정만 보일 수 있도록 함
  const checkWork = (day) => {
    setCheckDiv(true);
    showWork(day);
  };
  const showWork = (day) => {
    console.log(day);
    return day;
  };

  return (
    <div className="wrap">
      {numDay.map((day) => (
        <div className="dayWrap">
          <div className="days" onClick={() => checkWork(day)}>
            {day}일 차
          </div>
          {showWork === day ? <SceduleWork day={day} key={day} /> : null}
        </div>
      ))}
      <button onClick={addDay}>일자 추가</button>
    </div>
  );
};

export default SceduleList;
