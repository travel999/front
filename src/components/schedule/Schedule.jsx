import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ScheduleCreate from "./ScheduleCreate";
import ScheduleCard from "./ScheduleCard";
import ScheduleMap from "./ScheduleMap";
import DescriptModal from "./modal/DescriptModal";
import styles from "../module.css/Schedule.module.css";
import NoDateDuckImg from "../../res/img/duck/noDateDuck.png";

const Schedule = () => {
  const navigate = useNavigate();
  const createData = useSelector((state) => state.schedule);
  const mapData = useSelector((state) => state.kakaoMap);
  const postId = useSelector((state) => state.schedule.postId);
  const [modalOpen, setModalOpen] = useState(false);
  const tokenValue = localStorage.getItem("jwtToken"); // 토큰없으면 로그인 페이지로

  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    }
  }, []);

    //모달 열기
  useEffect(() => {
      setModalOpen(true);
  }, [])

  //모달닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.wrapLeft}>
        <DescriptModal open={modalOpen} close={closeModal} />
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
