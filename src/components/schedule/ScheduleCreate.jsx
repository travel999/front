import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../res/cookie";

import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

import { saveSchedule } from "../../redux/modules/ScheduleSlice";
import ScheduleList from "./SchduleList";

const ScheduleCreate = () => {
  //Hook
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenValue = getCookie("jwtToken");
  //State
  const [title, setTitle] = useState("");
  const [startDate, setSartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [scheduleSave, setScheduleSave] = useState({});
  const [fixDay, setFixDay] = useState();

  const createData = useSelector((state) => state.schedule.saveSchedule);

  // 토크없으면 로그인 페이지로
  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    }
  }, []);

  //일정생성하기
  const onSaveSchdule = () => {
    if (startDate === "" && endDate === "" && fixDay === "") {
      alert("여행날짜가 비어있어 일정을 생성할 수 없습니다.");
      return;
    } else {
      dispatch(saveSchedule(scheduleSave));
    }
  };
  //시작일-종료일-타이을 지정
  const onSetData = (e) => {
    const { name, value } = e.target;

    if (name === "startDay") {
      setSartDate(value);
    } else if (name === "endDay") {
      setEndDate(value);
    } else if (name === "title") {
      setTitle(value);
    }
    //payload생성
    setScheduleSave({
      title: title,
      date: [startDate, endDate],
    });
    //일차 차 구하는 함수 호출
    onGetDateDiff();
  };
  //일차 차이 구하는 함수
  const onGetDateDiff = () => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    const diffDate = date1.getTime() - date2.getTime();
    const reulst = Math.abs(diffDate / (1000 * 60 * 60 * 24));

    setFixDay(reulst);
  };

  return (
    <div className={styels.dayContent}>
      <input
        type="date"
        name="startDay"
        value={startDate}
        onChange={onSetData}
      />
      ~
      <input type="date" name="endDay" value={endDate} onChange={onSetData} />
      <input type="text" name="title" value={title} onChange={onSetData} />
      {createData !== undefined ? (
        <Btn color="green">일정 수정하기</Btn>
      ) : (
        <Btn color="blue" onClick={onSaveSchdule}>
          일정 생성하기
        </Btn>
      )}
      {createData !== undefined ? (
        <ScheduleList startDate={startDate} endDate={endDate} fixDay={fixDay} />
      ) : (
        "여행갈 날짜를 먼저 지정해주세요!"
      )}
    </div>
  );
};

export default ScheduleCreate;
