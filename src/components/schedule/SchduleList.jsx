import React, { useState } from "react";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import ScheduleMap from "./ScheduleMap";
import { useDispatch } from "react-redux";

const ScheduleList = ({ startDate, endDate, fixDay }) => {
  //Hook
  const dispatch = useDispatch();
  //state

  const [index, setIndex] = useState();
  const [dayNum, setDayNum] = useState([]);

  //함수

  const showSchedule = () => {
    if (startDate !== "" && endDate !== "") {
      //반복문 내에서 state를 사용할 수 없으므로 대체함
      const dayArr = [];
      for (let i = 1; i <= fixDay; i++) {
        dayArr.push(i);
      }
      return (
        <div>
          <ul>
            {dayArr.map((item, i) => (
              <li
                key={i}
                className={index === i ? "active" : null}
                onClick={() => setIndex(i)}
              >
                {i + 1}일
              </li>
            ))}
          </ul>
          {dayArr
            .filter((item, i) => index === i)
            .map((item) => (
              <ScheduleMap key={item} day={index} />
            ))}
        </div>
      );
    } else {
      return <div>여행 일정을 먼저 선택해주세요</div>;
    }
  };

  //이벤트 함수

  //초대버튼
  const onInvitePlane = () => {
    alert("초대 발송");
  };

  return (
    <div>
      <Btn color="red" onClick={onInvitePlane}>
        일행 초대하기
      </Btn>
      {showSchedule()}
    </div>
  );
};

export default ScheduleList;
