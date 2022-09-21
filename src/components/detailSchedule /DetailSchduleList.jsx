import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import MemberAddModal from "./modal/MemberAddModal";
import { getMapData } from "../../redux/modules/MapSlice";

const DetailScheduleList = ({ fixDay, id, defalutDay }) => {
  //Hook
  const dispatch = useDispatch();

  //state
  const [index, setIndex] = useState(defalutDay);
  const [modalOpen, setModalOpen] = useState(false);

  //함수
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const dayArr = [];
    for (let i = 1; i <= fixDay; i++) {
      dayArr.push(i);
    }
    sendMapData(defalutDay, dayArr);
  }, []);

  const showSchedule = () => {
    //반복문 내에서 state를 사용할 수 없으므로 대체함
    const dayArr = [];
    for (let i = 1; i <= fixDay; i++) {
      dayArr.push(i);
    }
    console.log(dayArr)
    return (
      <div className={styels.dayWrap}>
        <ul>
          {dayArr.map((item) => (
            <li
              key={item}
              className={index === item ? styels.active : styels.noActive}
              onClick={() => sendMapData(item, dayArr)}
            >
              {item}일
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const sendMapData = (day, dayArr) => {
    setIndex(day);
    dispatch(getMapData({ day: day, allDay: dayArr }));
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

export default DetailScheduleList;
