import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ScheduleCreate from "./ScheduleCreate";
import ScheduleCard from "./ScheduleCard";
import ScheduleMap from "./ScheduleMap";
import styles from "../module.css/Schedule.module.css";
import NoDateDuckImg from "../../res/img/duck/noDateDuck.png";

const Schedule = () => {
  const navigate = useNavigate();
  const createData = useSelector((state) => state.schedule);
  const mapData = useSelector((state) => state.kakaoMap);
  const postId = useSelector((state) => state.schedule.postId);

  const tokenValue = localStorage.getItem("jwtToken"); // 토크없으면 로그인 페이지로

  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.wrapLeft}>
        {}
        <ScheduleCreate />
        {mapData.pin.length !== 0 ? (
          <ScheduleCard data={mapData} postId={createData.postId} />
        ) : null}
      </div>
      {mapData.day !== "" ? (
        <div className={styles.wrapCenter}>
          <ScheduleMap nowDay={mapData.day} />
        </div>
      ) : (
        <div className={styles.wrapCenter}>
          <img src={NoDateDuckImg} alt="등록일정 없음 이미지" />
          <div className={styles.noDate}>여행갈 날짜를 먼저 지정해주세요!</div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
