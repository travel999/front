import React, { useState, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

  const [chage, setChange] = useState(false);
  //마운트 되기전에 저장된 DB 가져오기
  useLayoutEffect(() => {
    if (!tokenValue) {
      navigate("/");
    } else {
      dispatch(getSchedule(id));
    }
  }, []);

  const createData = useSelector((state) => state.schedule);
  const mapData = useSelector((state) => state.kakaoMap);
  console.log(mapData);

  // useEffect(() => {
  //   setTimeout(() => {
  //     makeDayArr();
  //   }, 0)
  // }, []);

  // let dayData;

  // const makeDayArr = () => {
  //   const newData = [];
  //   for (let i = 1; i <= 7; i++) {
  //     //dbData에서 key값 동적할당
  //     let days = "day" + i;
  //     newData.push(dbData.data.data[days]);
  //   }
  //   return (dayData = newData.filter((item) => item !== undefined));
  // };

  return (
    <div className={styels.wrap}>
      <div className={styels.wrapLeft}>
        <DetailScheduleCreate data={mapData} />
        <ScheduleCard data={mapData} postId={id} />
      </div>
      <div className={styels.wrapCenter}>
        <ScheduleMap nowDay={mapData.day} data={mapData} />
      </div>
      <Chatting />
      {/* <div className={styels.wrapRight}></div> */}
    </div>
  );
};

export default DetailSchedule;
