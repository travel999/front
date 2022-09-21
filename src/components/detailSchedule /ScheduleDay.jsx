//이거 안쓴다!!!!!!!1>>2022.09.10 토 오전 3시 48분

import React, { useState } from "react";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
//컴포넌트
import ScheduleCard from "./ScheduleCard";
import ScheduleMap from "./ScheduleMap";

const ScheduleDay = () => {
  console.log("스케줄데이");
  //state
  const [index, setIndex] = useState();
  const [dayNum, setDayNum] = useState([true]);
  const [startDate, setSartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fixDay, setFixDay] = useState();

  //함수

  //이벤트 함수
  const onSetDate = (e) => {
    console.log(e.target);
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

  //일차추가 버튼
  const onAddDay = () => {
    // const newDay = Number(dayNum.slice(-1)[0]) + 1;
    if (fixDay !== undefined) {
      if (dayNum.length === fixDay) {
        alert(`${fixDay}` + "일차 까지만 입력할 수 있습니다.");
        return;
      } else {
        setDayNum([...dayNum, true]);
      }
    } else {
      alert("여행기간을 먼저 선택해주세요!");
    }
  };
  //일차삭제 버튼
  const onRemoveDay = (targetDay) => {
    if (targetDay === 0) {
      alert("1일차 일정은 삭제할 수 없습니다.");
    }
    //선택한 일정의 값만 수정해야한다.
    // 1) useState의 불변성을 해칠 수 없어 복사배열을 생성하여 false 처리
    // 2) 동일한 방법으로 filter를 거쳐 해당 배열에 true만 남기도록 함
    let copyArr = [...dayNum];
    copyArr[targetDay] = false;
    const newArr = copyArr.filter((item) => item === true);
    setDayNum(newArr);
  };
  //초대버튼
  const onInvitePlane = () => {
    alert("초대 발송");
  };

  return (
    <div className={styels.WriteWrap}>
      <div className={styels.dayWrap}>
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
                    onClick={() => onRemoveDay(i)}
                  >
                    x
                  </Btn>
                )}
              </li>
            ))}
          </ul>
          <Btn onClick={onAddDay} width="10%">
            +
          </Btn>
        </div>
        {dayNum
          .filter((item, i) => index === i)
          .map((item) => (
            <ScheduleCard key={item} day={index} />
          ))}
      </div>
      <div className={styels.mapWrap}>
        <ScheduleMap />
      </div>
    </div>
  );
};

export default ScheduleDay;
