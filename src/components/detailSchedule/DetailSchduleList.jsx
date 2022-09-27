import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMapData } from "../../redux/modules/MapSlice";
import MemberAddModal from "./modal/MemberAddModal";
import Btn from "../elements/Btn";
import styles from "./Schedule.module.css";
import { toast } from "react-toastify";

const DetailScheduleList = ({ fixDay, id, defalutDay, setKey }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.kakaoMap.members);

  const [index, setIndex] = useState(defalutDay);
  const [modalOpen, setModalOpen] = useState(false);

  const nickname = localStorage.getItem("nickname");

  useEffect(() => {
    const dayArr = [];
    for (let i = 1; i <= fixDay; i++) {
      dayArr.push(i);
    }
    sendMapData(defalutDay, dayArr);
  }, []);

  //모달 열기
  const openModal = () => {
    if (members?.includes(nickname)) {
      setModalOpen(true);
    } else {
      toast.success(`권한이 없습니다.`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  //모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  //일정보여주기
  const showSchedule = () => {
    //반복문 내에서 state를 사용할 수 없으므로 대체함
    const dayArr = [];
    for (let i = 1; i <= fixDay; i++) {
      dayArr.push(i);
    }
    return (
      <div className={`${styles.dayWrap}`}>
        <ul>
          {dayArr.map((item) => (
            <li
              key={item}
              className={index === item ? styles.active : styles.noActive}
              onClick={() => sendMapData(item, dayArr)}
            >
              {item}일
            </li>
          ))}
        </ul>
      </div>
    );
  };
  //일수 dispatch에 올려보내기
  const sendMapData = (day, dayArr) => {
    setIndex(day);
    dispatch(getMapData({ day: day, allDay: dayArr }));
    setKey((prev) => (prev += 1));
  };

  return (
    <div className={styles.dayWrap2}>
      <div className={styles.invite}>
        <Btn
          color="#ffff"
          backgroundColor="#9AB9FF"
          width="300px"
          height="36px"
          onClick={openModal}
        >
          일행 초대하기
        </Btn>
        <MemberAddModal
          open={modalOpen}
          close={closeModal}
          postId={id}
          header={"이 일정에 멤버 추가하기"}
        />
      </div>
      {showSchedule()}
    </div>
  );
};

export default DetailScheduleList;
