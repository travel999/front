import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styels from "./Schedule.module.css";
import { toast } from "react-toastify";
import io from "socket.io-client";

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

  const nickname = localStorage.getItem("nickname");
  const [meaningless, setMeaningless] = useState(0);

  const createData = useSelector((state) => state.schedule);
  const mapData = useSelector((state) => state.kakaoMap);

  const socket = io.connect("http://52.78.142.77/", {
    path: "/socket.io",
    transports: ["websocket"],
  });

  //DB 가져오기
  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    } else {
      dispatch(getSchedule(id));
    }
  }, []);

  const SendOtherPeople = () => {
    // 카드마다 달려있는 버튼이랑 연결 일정저장버튼 누르면 실행됌.
    setMeaningless((prev) => prev + 1);
    const data = {
      room: "123",
      author: nickname,
    };

    socket.emit("SaveDone_data", data);
  };

  useEffect(() => {
    socket.on("SaveGet_data", (data) => {
      setMeaningless((prev) => prev + 1);
      toast.success(`${data.author} 님이 저장하였습니다.`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }, [socket]);
  // chatting에 필요한것들 >> 초대된사람들 리스트, 게시글 id.

  return (
    <div className={styels.wrap}>
      <div className={styels.wrapLeft}>
        <DetailScheduleCreate data={mapData} />
        <ScheduleCard
          data={mapData}
          postId={id}
          socket={socket}
          SendOtherPeople={SendOtherPeople}
        />
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
