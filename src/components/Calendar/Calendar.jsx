import React, { useCallback, useState } from "react";
import styled from "styled-components";

const Calendar = () => {
  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };
  const week = ["일", "월", "화", "수", "목", "금", "토"]; //일주일
  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜

  //이전 달 보기 보튼
  const prevMonth = useCallback(() => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth]);

  //다음 달 보기 버튼
  const nextMonth = useCallback(() => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth]);

  //달 선택박스에서 고르기 <<<
  const monthControl = useCallback(() => {
    let monthArr = [];
    for (let i = 0; i < 12; i++) {
      monthArr.push(
        <option key={i + 1} value={i + 1}>
          {i + 1}월
        </option>
      );
    }
    return (
      <select onChange={changeSelectMonth} value={selectedMonth}>
        {monthArr}
      </select>
    );
  }, [selectedMonth]);

  // onchange로 선택하면 월 바꿔줌
  const changeSelectMonth = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  //연도 선택박스에서 고르기
  const yearControl = useCallback(() => {
    let yearArr = [];
    const startYear = today.year - 10; //현재 년도부터 10년전 까지만
    const endYear = today.year + 10; //현재 년도부터 10년후 까지만
    for (let i = startYear; i < endYear + 1; i++) {
      yearArr.push(
        <option key={i} value={i}>
          {i}년
        </option>
      );
    }
    return (
      <select onChange={changeSelectYear} value={selectedYear}>
        {yearArr}
      </select>
    );
  }, [selectedYear]);

  // onchange로 선택하면 연도 바뀜
  const changeSelectYear = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  //요일 반환 함수
  const returnWeek = useCallback(() => {
    let weekArr = [];
    week.forEach((value) => {
      weekArr.push(
        <WeekDay
          key={value}
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
              key={i + 1}
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
                today.year == selectedYear &&
                today.month == selectedMonth &&
                today.date == i + 1
                  ? true
                  : false
              }
            >
              {i + 1}
            </DayDay>
          );
        }
      } else {
        dayArr.push(<div></div>);
      }
    }

    return dayArr;
  }, [selectedYear, selectedMonth, dateTotalCount]);

  return (
    <Container>
      <Title>
        <div>
          {yearControl()}년 {monthControl()}월
        </div>
        <Pagination>
          <ArrowBtn onClick={prevMonth}>◀︎</ArrowBtn>
          <ArrowBtn onClick={nextMonth}>▶︎</ArrowBtn>
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
  width: 260px;
  /* height: 207px; */
  height: 27vh;
  background-color: rgb(247, 255, 183);
  border: 1px solid rgb(247, 255, 183);
  border-radius: 20px;
  overflow: auto;
`;

const Title = styled.div`
  display: flex;
  margin-left: 20px;
  margin-top: 10px;
`;

const Pagination = styled.div`
  margin-left: 15px;
  margin-top: 0px;
`;

const WeekDayBox = styled.div`
  margin-left: 20px;
`;

const WeekBox = styled.div`
  display: flex;
  margin-top: 3px;
  div {
    width: calc(235px / 7);
  }
`;

const DayBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  line-height: 22px;
  div {
    width: calc(235px / 7);
    height: calc(150px / 6);
    vertical-align: middle;
  }
`;

const ArrowBtn = styled.button`
  background: none;
  border: none;
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
  font-weight: ${(prop) => (prop.Orangecolor ? "700" : "500")};
  background-color: ${(prop) => (prop.Orangecolor ? "#fbc30d" : null)};
  border-radius: ${(prop) => (prop.Orangecolor ? "100px" : null)};
`;

export default Calendar;
