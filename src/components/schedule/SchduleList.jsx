import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getMapData } from "../../redux/modules/MapSlice";
import MemberAddModal from "./modal/MemberAddModal";
import Btn from "../elements/Btn";
import styles from "../module.css/Schedule.module.css";

const ScheduleList = ({ fixDay, id }) => {
  const dispatch = useDispatch();

  const [index, setIndex] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  //모달 열기
  const onOpenModal = () => {
    setModalOpen(true);
  };
  //모달닫기
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
      <div className={styles.dayWrap}>
        <ul>
          {dayArr.map((item) => (
            <li
              key={item}
              className={index === item ? styles.active : styles.noActive}
              onClick={() => onSendMapData(item, dayArr)}
            >
              {item}일
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const onSendMapData = (day, dayArr) => {
    setIndex(day);
    dispatch(getMapData({ day: day, allDay: dayArr }));
  };

  //이벤트 함수
  return (
    <div className={styles.dayWrap2}>
      <div className={styles.invite}>
        <Btn
          color="#ffff"
          backgroundColor="#9AB9FF"
          width="300px"
          height="36px"
          onClick={onOpenModal}
        >
          일행 초대하기
        </Btn>
        <MemberAddModal
          open={modalOpen}
          close={closeModal}
          postId={id}
          header={"이 일정에 맴버 추가하기"}
        />
      </div>
      {showSchedule()}
    </div>
  );
};

export default ScheduleList;
