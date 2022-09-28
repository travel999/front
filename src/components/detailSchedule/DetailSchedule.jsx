import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import DetailScheduleCreate from "./DetailScheduleCreate";
import DetailScheduleCard from "./DetailScheduleCard";
import DetailScheduleMap from "./DetailScheduleMap";
import MobileDetailScheduleMap from "./MobileDetailScheduleMap";
import Chatting from "../chat/Chatting";
import Btn from "../elements/Btn";
import { getSchedule } from "../../redux/modules/MapSlice";
import styles from "../module.css/DetailSchedule.module.css";

const DetailSchedule = () => {
  const createData = useSelector((state) => state.schedule);
  const mapData = useSelector((state) => state.kakaoMap);
  const members = useSelector((state) => state.kakaoMap?.members);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const MobileSize = useMediaQuery({ maxWidth: 430 });
  const topRef = useRef(null);

  const [key, setKey] = useState(0);

  const tokenValue = localStorage.getItem("jwtToken"); // 토크없으면 로그인 페이지로

  //토큰값 여부로 get 요청 진행하기
  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    } else {
      dispatch(getSchedule(id));
    }
  }, []);

  //버튼 클릭스 최상단으로 이동(map탈출용)
  const onHomeClick = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.wrap} ref={topRef}>
      <div className={styles.wrapLeft}>
        <DetailScheduleCreate data={mapData} setKey={setKey} />
        <DetailScheduleCard data={mapData} postId={id} key={key} />
      </div>
      <div className={styles.wrapCenter}>
        {MobileSize ? (
          <MobileDetailScheduleMap
            nowDay={mapData.day}
            data={mapData}
            setKey={setKey}
          />
        ) : (
          <DetailScheduleMap
            nowDay={mapData.day}
            data={mapData}
            setKey={setKey}
          />
        )}
      </div>
      <Chatting id={id} members={members} />
      <button className={styles.topBtn} onClick={onHomeClick}>
        Top
      </button>
    </div>
  );
};

export default DetailSchedule;
