import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

import ScheduleList from "./SchduleList";
import { saveSchedule } from "../../redux/modules/ScheduleSlice";

const ScheduleCreate = () => {
  //Hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //State
  const [title, setTitle] = useState("");
  const [startDate, setSartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [scheduleSave, setScheduleSave] = useState({});
  const [fixDay, setFixDay] = useState();

  const createData = useSelector((state) => state.schedule);

  //시작일-종료일-타이틀 지정
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

  //일정생성하기
  const onSaveSchdule = () => {
    if (startDate === "" && endDate === "" && fixDay === undefined) {
      alert("여행날짜가 비어있어 일정을 생성할 수 없습니다.");
    } else {
      dispatch(saveSchedule(scheduleSave));
      navigate("/write");
    }
  };
  return (
    <div className={styels.createWrap}>
      <input
        type="date"
        id="startDay"
        name="startDay"
        value={startDate}
        onChange={onSetData}
      />
      <input
        type="date"
        id="endDay"
        name="endDay"
        value={endDate}
        onChange={onSetData}
      />
      <input
        type="text"
        name="title"
        value={title}
        onChange={onSetData}
        placeholder="일정의 제목을 입력해주세요"
      />
      {createData.title !== "" ? (
        <Btn color="#fff" backgroundColor="#FF8C0A" height="36px">
          일정 수정
        </Btn>
      ) : (
        <Btn
          color="#fff"
          backgroundColor="#ffc51c"
          height="36px"
          onClick={onSaveSchdule}
        >
          일정 생성
        </Btn>
      )}
      {createData.title !== "" ? (
        <ScheduleList fixDay={fixDay} id={createData.postId} />
      ) : null}
    </div>
  );
};

export default ScheduleCreate;
