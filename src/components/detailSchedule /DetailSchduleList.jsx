import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import MemberAddModal from "./modal/MemberAddModal";
import { getMapData } from "../../redux/modules/MapSlice";
import { toast } from "react-toastify";

const DetailScheduleList = ({ fixDay, id, defalutDay }) => {
  //Hook
  const dispatch = useDispatch();
  const members = useSelector((state) => state.kakaoMap.members);

  const nickname = localStorage.getItem("nickname");

  //state
  const [index, setIndex] = useState(defalutDay);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const dayArr = [];
    for (let i = 1; i <= fixDay; i++) {
      dayArr.push(i);
    }
    sendMapData(defalutDay, dayArr);
  }, []);

  //함수
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

  const closeModal = () => {
    setModalOpen(false);
  };

  const showSchedule = () => {
    //반복문 내에서 state를 사용할 수 없으므로 대체함
    const dayArr = [];
    for (let i = 1; i <= fixDay; i++) {
      dayArr.push(i);
    }
    console.log(dayArr);
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
