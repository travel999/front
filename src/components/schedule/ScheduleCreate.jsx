import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveSchedule } from "../../redux/modules/ScheduleSlice";
import ScheduleList from "./SchduleList";
import AdviceModal from "../detailSchedule/modal/AdviceModal";
import Btn from "../elements/Btn";
import styles from "./Schedule.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const ScheduleCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createData = useSelector((state) => state.schedule);

  const [title, setTitle] = useState("");
  const [startDate, setSartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [scheduleSave, setScheduleSave] = useState({});
  const [fixDay, setFixDay] = useState();
  const [advModal, setAdvModal] = useState(false);

  //playload등록시 title 제일 끝에 형태소 안찍히는 오류 수정
  useEffect(() => {
    if (createData.postId === undefined || createData.postId === "") {
      if (startDate !== "" && endDate !== "" && title !== "") {
        dispatch(saveSchedule(scheduleSave));
        navigate("/write");
      }
    } else {
      // dispatch(
      //   modifySchedule({ data: scheduleSave, postId: createData.postId })
      // );
      navigate(`/schedulDetail/${createData.postId}`);
    }
  }, [scheduleSave, createData.postId]);

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

  //일정생성하기
  const onSaveSchdule = () => {
    if (startDate === "" && endDate === "" && fixDay === undefined) {
      toast.error("여행날짜가 비어있어 일정을 생성할 수 없습니다.!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (fixDay > 8) {
      toast.error("최대 여행일정은 7일까지만 가능합니다.", {
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
      toast.success("일행 일정이 생성되었습니다.", {
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

  const closeAdvModal = () => {
    setAdvModal(false);
  };

  return (
    <div className={styles.createWrap}>
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
        <Btn
          color="#fff"
          backgroundColor="#ffc51c"
          height="36px"
          onClick={onModifySchdule}
        >
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
      <FontAwesomeIcon
        icon={faCircleQuestion}
        onClick={() => {
          setAdvModal(true);
        }}
        className={styles.adviceBtn}
      />
      <AdviceModal advModal={advModal} close={closeAdvModal} />
      {createData.title !== "" ? (
        <ScheduleList fixDay={fixDay} id={createData.postId} />
      ) : null}
    </div>
  );
};

export default ScheduleCreate;
