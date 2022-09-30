import React, { useCallback, useState, memo } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Calendar = () => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  };
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
  const [clickcount, setClickCount] = useState(0);
  const [travelDay, setTravelDay] = useState({
    start: "0000-00-00",
    end: "0000-00-00",
  });

  //state에서 이름을 가져와 사용함으로 이곳에 배치함
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜
  const startSchedule = travelDay?.start?.split("-");
  const endSchedule = travelDay?.end?.split("-");

  //이전 달 보기 보튼
  const prevMonth = useCallback(() => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth, clickcount]);

  //다음 달 보기 버튼
  const nextMonth = useCallback(() => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth, clickcount]);

  //달 선택박스에서 고르기
  const monthControl = useCallback(() => {
    let monthArr = [];
    for (let i = 0; i < 12; i++) {
      monthArr.push(
        <option key={"month" + i + 1} value={i + 1}>
          {i + 1}월
        </option>
      );
    }
    return (
      <Selectbox onChange={onchangeSelectMonth} value={selectedMonth}>
        {monthArr}
      </Selectbox>
    );
  }, [selectedMonth, clickcount]);

  // onchange로 선택하면 월 바꿔줌
  const onchangeSelectMonth = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  //연도 선택박스에서 고르기
  const yearControl = useCallback(() => {
    let yearArr = [];
    const startYear = today.year - 5; //현재 년도부터 5년전 까지만
    const endYear = today.year + 5; //현재 년도부터 5년후 까지만
    for (let i = startYear; i < endYear + 1; i++) {
      yearArr.push(
        <option key={"year" + i} value={i}>
          {i}년
        </option>
      );
    }
    return (
      <Selectbox onChange={onchangeSelectYear} value={selectedYear}>
        {yearArr}
      </Selectbox>
    );
  }, [selectedYear, clickcount]);

  // onchange로 선택하면 연도 바뀜
  const onchangeSelectYear = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  //요일 반환 함수
  const returnWeek = useCallback(() => {
    let weekArr = [];
    week.forEach((value) => {
      weekArr.push(
        <WeekDay
          key={"week" + value}
          Redcolor={value === "일" ? true : false}
          Bluecolor={value === "토" ? true : false}
        >
          {value}
        </WeekDay>
      );
    });
    return weekArr;
  }, []);

  //선택된 달의 날짜들 반환 함수
  const returnDay = useCallback(() => {
    let dayArr = [];
    for (const nowDay of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      if (week[day] === nowDay) {
        for (let i = 0; i < dateTotalCount; i++) {
          dayArr.push(
            <DayDay
              key={"day" + i + 1}
              Bluecolor={
                new Date(selectedYear, selectedMonth - 1, i + 1).getDay() === 6
                  ? true
                  : false
              }
              Redcolor={
                new Date(selectedYear, selectedMonth - 1, i + 1).getDay() === 0
                  ? true
                  : false
              }
              Orangecolor={
                today.year === selectedYear &&
                today.month === selectedMonth &&
                today.date === i + 1
                  ? true
                  : false
              }
              schedule={
                startSchedule[0] == selectedYear &&
                startSchedule[1] == selectedMonth &&
                startSchedule[2] == i + 1
                  ? true
                  : false
              }
              schedule2={
                endSchedule[0] == selectedYear &&
                endSchedule[1] == selectedMonth &&
                endSchedule[2] == i + 1
                  ? true
                  : false
              }
              onClick={() => {
                OnCountPlus(i + 1);
              }}
            >
              {i + 1}
            </DayDay>
          );
        }
      } else {
        dayArr.push(<div key={"excepDay" + nowDay}></div>);
      }
    }
    return dayArr;
  }, [selectedYear, selectedMonth, dateTotalCount, clickcount]);

  const OnCountPlus = (day) => {
    setClickCount((prev) => prev + 1);

    // day
    if (clickcount % 2 == 0) {
      if (Number(selectedMonth) < 10 && Number(day) >= 10) {
        setTravelDay({
          ...travelDay,
          start: `${selectedYear}-0${selectedMonth}-${day}`,
        });
      } else if (Number(selectedMonth) < 10 && Number(day) < 10) {
        setTravelDay({
          ...travelDay,
          start: `${selectedYear}-0${selectedMonth}-0${day}`,
        });
      } else if (Number(day) < 10 && Number(selectedMonth) >= 10) {
        setTravelDay({
          ...travelDay,
          start: `${selectedYear}-${selectedMonth}-0${day}`,
        });
      }
    } else {
      if (Number(selectedMonth) < 10 && Number(day) >= 10) {
        setTravelDay({
          ...travelDay,
          end: `${selectedYear}-0${selectedMonth}-${day}`,
        });
      } else if (Number(selectedMonth) < 10 && Number(day) < 10) {
        setTravelDay({
          ...travelDay,
          end: `${selectedYear}-0${selectedMonth}-0${day}`,
        });
      } else if (Number(day) < 10 && Number(selectedMonth) >= 10) {
        setTravelDay({
          ...travelDay,
          end: `${selectedYear}-${selectedMonth}-0${day}`,
        });
      }
    }
  };

  return (
    <Container>
      <Title>
        <div>
          {yearControl()}년 {monthControl()}월
        </div>
        <Pagination>
          <ArrowBtn onClick={prevMonth} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </ArrowBtn>
          <ArrowBtn onClick={nextMonth} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faAngleRight} />
          </ArrowBtn>
        </Pagination>
      </Title>
      <WeekDayBox>
        <WeekBox>{returnWeek()}</WeekBox>
        <DayBox>{returnDay()}</DayBox>
      </WeekDayBox>
    </Container>
  );
};

const Container = styled.div`
  width: 280px;
  height: 27vh;
  background-color: white;
  border-radius: 20px;
  overflow: auto;
  margin-left: 0px;
  @media screen and (min-height: 900px) {
    height: 21vh;
  }
`;

const Title = styled.div`
  display: flex;
  margin-left: 20px;
  margin-top: 10px;
`;

const Pagination = styled.div`
  margin-left: 40px;
  margin-top: 0px;
`;

const WeekDayBox = styled.div`
  margin-left: 25px;
`;

const WeekBox = styled.div`
  display: flex;
  margin-top: 3px;
  div {
    width: calc(252px / 7);
  }
`;

const DayBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  line-height: 24px;
  div {
    width: calc(250px / 7);
    height: calc(150px / 6);
    vertical-align: middle;
  }
`;

const ArrowBtn = styled.button`
  background: none;
  border: none;
`;

const Selectbox = styled.select`
  border: 1px solid #e2e2e2;
  padding: 1px;
  border-radius: 10px;
  margin-right: 3px;
`;

const WeekDay = styled.div`
  color: ${function (prop) {
    if (prop.Bluecolor) {
      return "blue";
    } else if (prop.Redcolor) {
      return "red";
    }
  }};
`;

const DayDay = styled.div`
  text-align: center;
  color: ${function (prop) {
    if (prop.Orangecolor) {
      return "#fff";
    } else if (prop.Redcolor) {
      return "red";
    } else if (prop.Bluecolor) {
      return "blue";
    }
  }};

  /* border-bottom: ${(prop) => (prop.schedule ? "1px solid black" : null)};
  border-bottom: ${(prop) => (prop.schedule2 ? "1px solid black" : null)}; */

  font-weight: ${(prop) => (prop.Orangecolor ? "700" : "500")};
  background-color: ${(prop) => (prop.Orangecolor ? "#ffc51c;" : null)};
  border-radius: ${(prop) => (prop.Orangecolor ? "100px" : null)};
`;

export default memo(Calendar);
