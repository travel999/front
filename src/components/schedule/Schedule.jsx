import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styels from "./Schedule.module.css";
import NoDateDuckImg from "../../res/img/duck/noDateDuck.png";

import ScheduleCreate from "./ScheduleCreate";
import ScheduleCard from "./ScheduleCard";
import ScheduleMap from "./ScheduleMap";
import Chatting from "../chat/Chatting";

const Schedule = () => {
  const tokenValue = localStorage.getItem("jwtToken"); // 토크없으면 로그인 페이지로
  const navigate = useNavigate();
  const createData = useSelector((state) => state.schedule);
  const mapData = useSelector((state) => state.kakaoMap);

  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    }
  }, []);

  return (
    <div className={styels.wrap}>
      <div className={styels.wrapLeft}>
        <ScheduleCreate />
        {mapData.pin.length !== 0 ? (
          <ScheduleCard data={mapData} postId={createData.postId} />
        ) : null}
      </div>
      {mapData.day !== "" ? (
        <div className={styels.wrapCenter}>
          <ScheduleMap nowDay={mapData.day} />
        </div>
      ) : (
        <div className={styels.wrapCenter}>
          <img src={NoDateDuckImg} alt="등록일정 없음 이미지" />
          <div className={styels.noDate}>여행갈 날짜를 먼저 지정해주세요!</div>
        </div>
      )}
      <Chatting />
    </div>
  );
};

export default Schedule;
