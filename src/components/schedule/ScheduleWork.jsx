import React, { useState, useRef } from "react";
//style & elements
import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

// import ScheduleMap from "./ScheduleMap";

const ScheduleWrite = ({ day }) => {
  //초기화 값
  const initState = {
    placeName: "",
    locate: "",
    content: "",
  };
  //Hool
  const divRef = useRef();

  //state
  const [cardNum, setCardNum] = useState([1]);
  const [conData, setConData] = useState("");
  const [conList, setConList] = useState([]);
  const [listData, setListData] = useState(initState);

  //함수

  //이벤트 함수
  //일정추가 버튼
  const onAddWork = () => {
    const newWork = Number(cardNum.slice(-1)[0]) + 1;
    setCardNum([...cardNum, newWork]);
  };

  const onGetContent = (e) => {
    setConData(e.target.value);
  };
  //onChange 후 포커싱 아웃될때 제일 최종 값만 가지고 와서 리스트 배열 생성
  const onGetContentList = () => {
    setConList([...conList, conData]);
  };

  //일정 저장
  const onSaveStorage = () => {
    //빈 일정 저장할 수 없게 만들어둠
    const filterConList = conList.filter((item) => item !== "");
    if (cardNum.length === filterConList.length) {
      alert(`${day + 1}` + "일차 일정을 저장합니다!");
      setListData({
        ...listData,
        placeName: "123",
        locate: "1234",
        content: filterConList,
      });

      localStorage.setItem(day, JSON.stringify(listData));
    } else {
      for (let i = 0; i <= cardNum.length; i++) {
        if (
          conList[i] === null ||
          conList[i] === undefined ||
          conList[i] === " "
        ) {
          alert("빈 일정은 저장할 수 없습니다.");
          //onBlue때문에 초기화 작업
          setConList([]);
          return divRef.current.focus();
        }
      }
    }
  };
  //입력한 값
  return (
    <div className={styels.worksWrap}>
      <h2>{day + 1}일차 우리가 갈 곳..!</h2>
      {cardNum.map((num) => (
        <div className={styels.work} key={num}>
          <h3>{num}번째 일정</h3>

          <div className="keywordSearchDiv">
            <div></div>
            <input type="text" name="placeName" id="placeName" />
            <textarea
              name="content"
              className={styels.content}
              placeholder="일정 입력"
              ref={divRef}
              onChange={onGetContent}
              onBlur={onGetContentList}
              required
            />
          </div>
        </div>
      ))}
      <Btn backgroundColor="gray" width="25px" onClick={onAddWork}>
        +
      </Btn>
      <Btn onClick={onSaveStorage}>일정저장하기</Btn>
    </div>
  );
};

export default ScheduleWrite;
