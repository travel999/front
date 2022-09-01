import React, { useState } from "react";
import ScheduleWork from "./ScheduleWork";
import ScheduleMap from "./ScheduleMap";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

const ScheduleDay = () => {
  //state
  const [index, setIndex] = useState();
  const [dayNum, setDayNum] = useState([true]);
  //일차추가 버튼
  const addDay = () => {
    // const newDay = Number(dayNum.slice(-1)[0]) + 1;
    if (dayNum.length === 6) {
      alert("7일차 까지만 입력할 수 있습니다.");
      return;
    } else {
      setDayNum([...dayNum, true]);
    }
  };
  //일차삭제 버튼
  const removeDay = (targetDay) => {
    if (targetDay === 0) {
      alert("1일차 일정은 삭제할 수 없습니다.");
    }
    //선택한 일정의 값만 수정해야한다.
    // 1) useState의 불변성을 해칠 수 없어 복사배열을 생성하여 false 처리
    // 2) 동일한 방법으로 filter를 거쳐 해당 배열에 true만 남기도록 함
    let copyArray = [...dayNum];
    copyArray[targetDay] = false;
    const newArray = copyArray.filter((item) => item === true);
    setDayNum(newArray);
  };

  return (
    <div className={styels.WriteWrap}>
      <div className={styels.dayWrap}>
        <div className={styels.dayContent}>
          <ul>
            {dayNum.map((item, i) => (
              <li
                key={i}
                className={index === i ? "active" : null}
                onClick={() => setIndex(i)}
              >
                {i + 1}일
                {i + 1 === 1 ? null : (
                  <Btn
                    width="10%"
                    id="removeBtn"
                    className={styels.removeBtn}
                    onClick={() => removeDay(i)}
                  >
                    x
                  </Btn>
                )}
              </li>
            ))}
          </ul>
          <Btn onClick={addDay} width="10%">
            +
          </Btn>
        </div>
        {dayNum
          .filter((item, i) => index === i)
          .map((item) => (
            <ScheduleWork key={item} day={index} />
          ))}
      </div>
      <div className={styels.mapWrap}>
        <ScheduleMap />
      </div>
    </div>
  );
};

export default ScheduleDay;
