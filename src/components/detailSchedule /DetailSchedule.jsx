import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styels from "./Schedule.module.css";

import DetailScheduleCreate from "./DetailScheduleCreate";
import DetailScheduleCard from "./DetailScheduleCard";
import DetailScheduleMap from "./DetailScheduleMap";
import Chatting from "../chat/Chatting";

import { getSchedule } from "../../redux/modules/MapSlice";

const DetailSchedule = () => {
  const createData = useSelector((state) => state.schedule);
  const mapData = useSelector((state) => state.kakaoMap);
  const members = useSelector((state) => state.kakaoMap?.members);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const tokenValue = localStorage.getItem("jwtToken"); // 토크없으면 로그인 페이지로

  //DB 가져오기
  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    } else {
      dispatch(getSchedule(id));
    }
  }, []);

  return (
    <div className={styels.wrap}>
      <div className={styels.wrapLeft}>
        <DetailScheduleCreate data={mapData} />
        <DetailScheduleCard data={mapData} postId={id} />
      </div>
      <div className={styels.wrapCenter}>
        <DetailScheduleMap nowDay={mapData.day} data={mapData} />
      </div>
      <Chatting id={id} members={members} />
    </div>
  );
};

export default DetailSchedule;
