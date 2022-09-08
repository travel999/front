import React, { useCallback, useState, memo, useEffect } from "react";
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

  const [clickcount, setClickCount] = useState(0);
  const [travelDay, setTravelDay] = useState({
    start: "0000-00-00",
    end: "0000-00-00",
  });

  const startSchedule = travelDay?.start?.split("-");
  const endSchedule = travelDay?.end?.split("-");

  // const [travelDate, setTravelDate] = useState(0);

  // useEffect(() => {
  //   if (endSchedule[2] - startSchedule[2] > 0) {
  //     setTravelDate(Number(endSchedule[2]) - Number(startSchedule[2]));
  //   } else if (startSchedule[1] !== endSchedule[1]) {
  //     setTravelDate(
  //       Number(dateTotalCount) -
  //         Number(startSchedule[2]) +
  //         Number(endSchedule[2]) -
  //         1
  //     );
  //   }
  // }, [clickcount]);

  // console.log(Number(travelDate) + "박" + Number(travelDate + 1) + "일");

  // useEffect(() => {
  //   if (Number(travelDay.start) < Number(travelDay.end)) {
  //     console.log(Number(travelDay.start), Number(travelDay.end));
  //     console.log(Number(travelDay.end) - Number(travelDay.start));
  //   } else if (Number(travelDay.end) < Number(travelDay.start)) {
  //     console.log(Number(travelDay.start), Number(travelDay.end));
  //     console.log(Number(travelDay.start) - Number(travelDay.end));
  //   }
  // }, [travelDay, clickcount]);

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
      <Selectbox onChange={changeSelectMonth} value={selectedMonth}>
        {monthArr}
      </Selectbox>
    );
  }, [selectedMonth, clickcount]);

  // onchange로 선택하면 월 바꿔줌
  const changeSelectMonth = (e) => {
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
      <Selectbox onChange={changeSelectYear} value={selectedYear}>
        {yearArr}
      </Selectbox>
    );
  }, [selectedYear, clickcount]);

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
            ◀︎
          </ArrowBtn>
          <ArrowBtn onClick={nextMonth} style={{ cursor: "pointer" }}>
            ▶︎
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
  /* height: 207px; */
  height: 27vh;
  background-color: rgb(247, 255, 183);
  border: 1px solid rgb(247, 255, 183);
  border-radius: 20px;
  overflow: auto;
  margin-left: -10px;
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
    width: calc(250px / 7);
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
  border: 1px solid white;
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
  background-color: ${(prop) => (prop.Orangecolor ? "#fbc30d" : null)};
  border-radius: ${(prop) => (prop.Orangecolor ? "100px" : null)};
`;

export default memo(Calendar);
