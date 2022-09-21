import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import styels from "./Schedule.module.css";

import Btn from "../elements/Btn";
import NoDateDuckImg from "../../res/img/duck/noDateDuck.png";

import DetailScheduleCreate from "./DetailScheduleCreate";
import ScheduleCard from "./ScheduleCard";
import ScheduleMap from "./ScheduleMap";
import Chatting from "../chat/Chatting";

// import { getSchedule } from "../../redux/modules/detailSchedule/DetailScheduleSlice";
import { getSchedule } from "../../redux/modules/MapSlice";

const DetailSchedule = () => {
  const tokenValue = localStorage.getItem("jwtToken"); // 토크없으면 로그인 페이지로
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const createData = useSelector((state) => state.schedule);
  const mapData = useSelector((state) => state.kakaoMap);

  console.log(mapData);

  //DB 가져오기
  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    } else {
      dispatch(getSchedule(id));
    }
  }, []);
  // chatting에 필요한것들 >> 초대된사람들 리스트

  return (
    <div className={styels.wrap}>
      <div className={styels.wrapLeft}>
        <DetailScheduleCreate data={mapData} />
        <ScheduleCard data={mapData} postId={id} />
      </div>
      <div className={styels.wrapCenter}>
        <ScheduleMap nowDay={mapData.day} data={mapData} />
      </div>
      <Chatting id={id} />
      {/* <div className={styels.wrapRight}></div> */}
    </div>
  );
};

export default DetailSchedule;
