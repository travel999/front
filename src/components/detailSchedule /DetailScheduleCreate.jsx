import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DetailScheduleList from "./DetailSchduleList";
import {
  saveSchedule,
  modifySchedule,
} from "../../redux/modules/ScheduleSlice";

const DetailScheduleCreate = ({ dbData }) => {
  console.log(dbData);
  //Hook
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  //State
  const [title, setTitle] = useState(dbData.data.data.title);
  const [startDate, setSartDate] = useState(dbData.data.data.date[0]);
  const [endDate, setEndDate] = useState(dbData.data.data.date[1]);
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

    //일차 차 구하는 함수 호출
    onGetDateDiff();
  };

  //일차 차이 구하는 함수
  const onGetDateDiff = () => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    const diffDate = date1.getTime() - date2.getTime();

    const sum = Math.abs(diffDate / (1000 * 60 * 60 * 24));
    const result = sum + 1;

    setFixDay(result);
  };

  //일정수정하기
  const onModifySchdule = () => {
    if (startDate === "" && endDate === "" && fixDay === undefined) {
      toast.error("여행날짜가 비어있어 일정을 수정할 수 없습니다.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      //payload생성
      setScheduleSave({
        title: title,
        date: [startDate, endDate],
      });
      toast.success("일정제목 과 일자가 수정되었습니다.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  //playload등록시 title 제일 끝에 형태소 안찍히는 오류 수정
  useEffect(() => {
    if (createData.postId === "") {
      if (startDate !== "" && endDate !== "" && title !== "") {
        dispatch(saveSchedule(scheduleSave));
        navigate(`/schedulDetail/${id}`);
      }
    } else {
      dispatch(
        modifySchedule({ data: scheduleSave, postId: createData.postId })
      );
      navigate(`/schedulDetail/${id}`);
    }
  }, [scheduleSave]);

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
      <Btn
        color="#fff"
        backgroundColor="#ffc51c"
        height="36px"
        onClick={onModifySchdule}
      >
        일정 수정
      </Btn>
      {createData.title !== "" ? (
        <DetailScheduleList fixDay={fixDay} id={createData.postId} />
      ) : null}
    </div>
  );
};

export default DetailScheduleCreate;
