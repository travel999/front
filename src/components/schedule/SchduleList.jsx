import React, { useState } from "react";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import ScheduleMap from "./ScheduleMap";
import MemberAddModal from "./modal/MemberAddModal";

const ScheduleList = ({ fixDay, id }) => {
  //Hook
  //state
  const [index, setIndex] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  //함수
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const showSchedule = () => {
    //반복문 내에서 state를 사용할 수 없으므로 대체함
    const dayArr = [];
    for (let i = 1; i <= fixDay; i++) {
      dayArr.push(i);
    }
    return (
      <div className={styels.schedulDay}>
        <ul>
          {dayArr.map((item, i) => (
            <li
              key={i}
              className={index === i ? "active" : null}
              onClick={() => setIndex(i)}
            >
              {i + 1}일
            </li>
          ))}
        </ul>
        {dayArr
          .filter((item, i) => index === i)
          .map((item) => (
            <ScheduleMap key={item} day={index} />
          ))}
      </div>
    );
  };

  //이벤트 함수
  return (
    <div className={styels.dayWrap2}>
      <div className={styels.invite}>
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
          header={"이 일정에 맴버 추가하기"}
        />
      </div>
      {showSchedule()}
    </div>
  );
};

export default ScheduleList;
