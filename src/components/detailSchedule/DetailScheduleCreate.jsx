import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DetailSchduleList from "./DetailSchduleList";
import { modifySchedule } from "../../redux/modules/ScheduleSlice";
import Btn from "../elements/Btn";
import styles from "../module.css/DetailSchedule.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const DetailScheduleCreate = ({ data, setKey }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const members = useSelector((state) => state.kakaoMap.members);

  const [title, setTitle] = useState(data.title);
  const [startDate, setSartDate] = useState(data.date[0]);
  const [endDate, setEndDate] = useState(data.date[1]);
  const [scheduleSave, setScheduleSave] = useState({});
  const [fixDay, setFixDay] = useState();

  const nickname = localStorage.getItem("nickname");

  useEffect(() => {
    setTitle(data.title);
    setSartDate(data.date[0]);
    setEndDate(data.date[1]);
    onGetDateDiff();
  }, [data]);

  //playload등록시 title 제일 끝에 형태소 안찍히는 오류 수정
  useEffect(() => {
    dispatch(modifySchedule({ data: scheduleSave, postId: id }));
    navigate(`/schedulDetail/${id}`);
  }, [scheduleSave]);

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
    if (members.includes(nickname)) {
      if (startDate === "" || endDate === "" || fixDay === undefined) {
        toast.error("여행날짜가 비어있어 일정을 수정할 수 없습니다.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (title === "") {
        toast.error("여행 이름이 비어있어 일정을 생성할 수 없습니다!", {
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
        console.log(title);
        setScheduleSave({
          title: title,
          date: [startDate, endDate],
        });
        toast.success("일정이 수정되었습니다.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate(`/schedulDetail/${id}`); //window.location.reload
      }
    } else {
      toast.success("권한이 없습니다.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className={styles.createWrap}>
      <input
        type="date"
        id="startDay"
        name="startDay"
        value={startDate || " "}
        onChange={onSetData}
      />
      <input
        type="date"
        id="endDay"
        name="endDay"
        value={endDate || " "}
        onChange={onSetData}
      />
      <input
        type="text"
        name="title"
        value={title || " "}
        onChange={onSetData}
        placeholder="일정의 제목을 입력해주세요"
      />
      {members.includes(nickname) ? (
        <Btn
          color="#fff"
          backgroundColor="#ffc51c"
          height="36px"
          width="80%"
          marginLeft="8%"
          onClick={onModifySchdule}
        >
          일정 수정
        </Btn>
      ) : null}
      <DetailSchduleList
        fixDay={fixDay}
        id={id}
        defalutDay={1}
        setKey={setKey}
      />
    </div>
  );
};

export default DetailScheduleCreate;
