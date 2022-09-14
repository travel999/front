import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import NoDateDuckImg from "../../res/img/duck/noDateDuck.png";

import ScheduleCreate from "./ScheduleCreate";
import ScheduleCard from "./ScheduleCard";
import ScheduleMap from "./ScheduleMap";
import Chatting from "../chat/Chatting";

const Schedule = () => {
  const tokenValue = localStorage.getItem("jwtToken"); // 토크없으면 로그인 페이지로
  const navigate = useNavigate();
  const mapData = useSelector((state) => state.kakaoMap);

  console.log("맵데이터", mapData);

  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    }
  }, []);

  return (
    <div className={styels.wrap}>
      <div className={styels.wrapLeft}>
        <ScheduleCreate />
        {mapData.pin.length !== 0 ? <ScheduleCard data={mapData} /> : null}
      </div>
      {mapData.day !== "" ? (
        <div className={styels.wrapCenter}>
          <ScheduleMap allDay={mapData.allDay} nowDay={mapData.day} />
        </div>
      ) : (
        <div className={styels.wrapCenter}>
          <img src={NoDateDuckImg} alt="등록일정 없음 이미지" />
          {/* <div>여행갈 날짜를 먼저 지정해주세요!</div> */}
        </div>
      )}
      <Chatting />
      {/* <div className={styels.wrapRight}></div> */}
    </div>
  );
};

export default Schedule;
