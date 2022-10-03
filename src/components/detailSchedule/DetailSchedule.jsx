import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { history } from "../../res/history";
import { confirmAlert } from "react-confirm-alert"; // Import
import DetailScheduleCreate from "./DetailScheduleCreate";
import DetailScheduleCard from "./DetailScheduleCard";
import DetailScheduleMap from "./DetailScheduleMap";
import MobileDetailScheduleMap from "./MobileDetailScheduleMap";
import Chatting from "../chat/Chatting";
import Btn from "../elements/Btn";
import { getSchedule } from "../../redux/modules/MapSlice";
import styles from "../module.css/DetailSchedule.module.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

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

  useEffect(() => {
    const listenBackEvent = () => {
      confirmAlert({
        title: "뒤로가기 이벤트 감지",
        message:
          "뒤로가기를 누르시면 저장되지않은 데이터들은 날아갈 수 있습니다.그래도 돌아가시겠습니까?",
        buttons: [
          {
            label: "Yes",
            onClick: () => navigate("/main"),
          },
          {
            label: "No",
            // onClick: () => alert("Click No"),
          },
        ],
        overlayClassName: "overlay-custom",
      });
    };

    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action === "POP") {
        listenBackEvent();
      }
    });

    return unlistenHistoryEvent;
  }, [history]);

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
      {MobileSize ? (
        <button className={styles.topBtn} onClick={onHomeClick}>
          Top
        </button>
      ) : null}
    </div>
  );
};

export default DetailSchedule;
