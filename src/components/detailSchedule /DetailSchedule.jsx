import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import NoDateDuckImg from "../../res/img/duck/noDateDuck.png";

import DetailScheduleCreate from "./DetailScheduleCreate";
import ScheduleCard from "./ScheduleCard";
import ScheduleMap from "./ScheduleMap";
import Chatting from "../chat/Chatting";

import { getSchedule } from "../../redux/modules/detailSchedule/DetailScheduleSlice";
import { useLayoutEffect } from "react";

const DetailSchedule = () => {
  const tokenValue = localStorage.getItem("jwtToken"); // 토크없으면 로그인 페이지로
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // const createData = useSelector((state) => state.schedule);
  // const mapData = useSelector((state) => state.kakaoMap);

  //마운트 되기전에 저장된 DB 가져오기
  useLayoutEffect(() => {
    console.log("1");
    if (!tokenValue) {
      navigate("/");
    } else {
      dispatch(getSchedule(id));
    }
  }, []);

  useEffect(() => {
    makeDayArr();
  }, []);

  const dbData = useSelector((state) => state.detailSchedul);
  let dayData;

  const makeDayArr = () => {
    const newData = [];
    for (let i = 1; i <= 7; i++) {
      //dbData에서 key값 동적할당
      let days = "day" + i;
      newData.push(dbData.data.data[days]);
    }
    dayData = newData.filter((item) => item !== undefined);
  };

  return (
    <div className={styels.wrap}>
      <div className={styels.wrapLeft}>
        {dbData.data.data !== undefined ? (
          <DetailScheduleCreate dbData={dbData} />
        ) : null}

        {/* <ScheduleCard data={mapData} dbData={dayData} postId={id} /> */}
      </div>
      {/* {mapData.day !== "" ? (
        <div className={styels.wrapCenter}>
          <ScheduleMap nowDay={mapData.day} />
        </div>
      ) : (
        <div className={styels.wrapCenter}>
          <img src={NoDateDuckImg} alt="등록일정 없음 이미지" />
          <div>여행갈 날짜를 먼저 지정해주세요!</div>
        </div>
      )} */}
      {/* <Chatting /> */}
      {/* <div className={styels.wrapRight}></div> */}
    </div>
  );
};

export default DetailSchedule;