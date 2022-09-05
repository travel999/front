import React, { useState } from "react";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import ScheduleWork from "./ScheduleWork";
const ScheduleList = () => {
  //state
  const [startDate, setSartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fixDay, setFixDay] = useState();
  const [index, setIndex] = useState();
  const [dayNum, setDayNum] = useState([]);

  //함수

  //여행기간을 선택하면 일정 보여주기
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
              <ScheduleWork key={item} day={index} />
            ))}
        </div>
      );
    } else {
      return <div>여행 일정을 먼저 선택해주세요</div>;
    }
  };

  //이벤트 함수
  const onSetDate = (e) => {
    const { name, value } = e.target;

    if (name === "startDay") {
      setSartDate(value);
    } else if (name === "endDay") {
      setEndDate(value);
    }
  };

  const onGetDateDiff = () => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    const diffDate = date1.getTime() - date2.getTime();
    const reulst = Math.abs(diffDate / (1000 * 60 * 60 * 24));

    setFixDay(reulst);
  };
  //초대버튼
  const onInvitePlane = () => {
    alert("초대 발송");
  };

  return (
    <div className={styels.dayContent}>
      <input
        type="date"
        name="startDay"
        value={startDate}
        onChange={onSetDate}
        onBlur={onGetDateDiff}
      />
      ~
      <input
        type="date"
        name="endDay"
        value={endDate}
        onChange={onSetDate}
        onBlur={onGetDateDiff}
      />
      <input type="text" name="title" />
      <Btn color="red" onClick={onInvitePlane}>
        일행 초대하기
      </Btn>
      {showSchedule()}
    </div>
  );
};

export default ScheduleList;
