import React, { useState, useRef } from "react";
import ScheduleWork from "../ScheduleWrite/ScheduleWork";

const ScheduleList = () => {
  //state
  const [index, setIndex] = useState();
  const [dayNum, setDayNum] = useState([true]);
  //일차추가 버튼
  const addDay = () => {
    // const newDay = Number(dayNum.slice(-1)[0]) + 1;
    setDayNum([...dayNum, true]);
  };
  //일차삭제 버튼
  const removeDay = (targetDay) => {
    if (targetDay === 0) {
      alert("1일차 일정은 삭제할 수 없습니다.");
    }
    //선택한 일정의 값만 수정해야한다.
    //useState의 불변성을 해칠 수 없어 복사배열을 생성 후 처리
    let copyArray = [...dayNum];
    copyArray[targetDay] = false;
    setDayNum(copyArray);
  };

  return (
    <section className="dayWrap">
      <ul className="dayContent">
        {dayNum
          .filter((item) => item === true)
          .map((item, i) => (
            <li
              key={i}
              className={index === i ? "active" : null}
              onClick={() => setIndex(i)}
            >
              {i + 1} 일차
              {i + 1 === 1 ? null : (
                <button id="removeBtn" onClick={() => removeDay(i)}>
                  X
                </button>
              )}
            </li>
          ))}
      </ul>
      {dayNum
        .filter((item, i) => item === true && index === i)
        .map((item) => (
          <ScheduleWork key={item} day={index} />
        ))}
      <button onClick={addDay}>일자 추가</button>
    </section>
  );
};

export default ScheduleList;
