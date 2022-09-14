import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import NoDateDuckImg from "../../res/img/duck/noDateDuck.png";

import ScheduleCreate from "./ScheduleCreate";
import ScheduleCard from "./ScheduleCard";
import ScheduleMap from "./ScheduleMap";

const Schedule = () => {
  console.log("스케줄")
  const tokenValue = localStorage.getItem("jwtToken"); // 토크없으면 로그인 페이지로
  const navigate = useNavigate();
  const mapData = useSelector((state) => state.kakaoMap);

  const [result, setResult] = useState([]);

  console.log("맵데이터", mapData);
  // 원하는 형태
  // place = [{ 1, Array(2) }, { 2,Array(3) }]
  useEffect(() => {
    const data = {
      [mapData.day]: mapData.pin.pin,
    };
    setResult([data, ...result]);
  }, [mapData.day]);
  console.log("test", result);

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
        </div>
      )}

      <div className={styels.wrapRight}>채팅</div>
    </div>
  );
};

export default Schedule;
