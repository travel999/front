import React, { useState, useRef } from "react";
import ScheduleWork from "../ScheduleWrite/ScheduleWork";

const ScheduleList = () => {
  //state
  const numVal = useRef(0);
  const [index, setIndex] = useState(0);
  const [dayNum, setDayNum] = useState([]);

  //일차추가 버튼
  const addDay = () => {
    const newDay = numVal;
    console.log(newDay);
    // const newDay = Number(dayNum.slice(-1)[0]) + 1;
    setDayNum([...dayNum, newDay]);
  };
  //일차삭제 버튼
  const removeDay = (targetDay) => {
    if (targetDay === 1) {
      alert("1일차 일정은 삭제할 수 없습니다.");
    }
    setDayNum(dayNum.filter((day) => day !== targetDay));
  };

  return (
    <section className="dayWrap">
      <ul className="dayContent">
        {dayNum.map((item) => (
          <li
            key={item}
            className={index === item ? "active" : null}
            onClick={() => setIndex(item)}
          >
            {item} 일차
            {item === 1 ? null : (
              <button id="removeBtn" onClick={() => removeDay(item)}>
                X
              </button>
            )}
          </li>
        ))}
      </ul>
      {dayNum
        .filter((item) => index === item)
        .map((item) => (
          <ScheduleWork key={item} day={item} />
        ))}
      <input type="number" name="dayText" placeholder="일차지정" ref={numVal} />
      <button onClick={addDay}>일자 추가</button>
    </section>
  );
};

export default ScheduleList;
