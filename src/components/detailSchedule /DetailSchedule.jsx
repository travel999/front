import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import NoDateDuckImg from "../../res/img/duck/noDateDuck.png";
import { toast, ToastContainer } from "react-toastify";

import DetailScheduleCreate from "./DetailScheduleCreate";
import ScheduleCard from "./ScheduleCard";
import ScheduleMap from "./ScheduleMap";
import Chatting from "../chat/Chatting";

// import { getSchedule } from "../../redux/modules/detailSchedule/DetailScheduleSlice";
import { getSchedule } from "../../redux/modules/MapSlice";

const socket = io.connect("http://52.78.142.77/", {
  path: "/socket.io",
  transports: ["websocket"],
});

const DetailSchedule = () => {
  const tokenValue = localStorage.getItem("jwtToken"); // 토크없으면 로그인 페이지로
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const nickname = localStorage.getItem("nickname");
  const [meaningless, setMeaningless] = useState(0);

  //마운트 되기전에 저장된 DB 가져오기.
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
