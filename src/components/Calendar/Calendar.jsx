import React, { useCallback, useState } from "react";
import styles from "./Calendar.module.css";

// const cx = classNames.bind(styles);

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
        <div
          key={value}
          //   className={cx(
          //     { weekday: true },
          //     { sunday: value === "일" },
          //     { saturday: value === "토" }
          //   )} Props로 처리 필요
        >
          {value}
        </div>
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
            <div
              key={i + 1}
              //   className={cx(
              //     {
              //       //오늘 날짜일 때 표시할 스타일 클라스네임
              //       today:
              //         today.year === selectedYear &&
              //         today.month === selectedMonth &&
              //         today.date === i + 1,
              //     },
              //     { weekday: true }, //전체 날짜 스타일
              //     {
              //       //전체 일요일 스타일
              //       sunday:
              //         new Date(
              //           selectedYear,
              //           selectedMonth - 1,
              //           i + 1
              //         ).getDay() === 0,
              //     },
              //     {
              //       //전체 토요일 스타일
              //       saturday:
              //         new Date(
              //           selectedYear,
              //           selectedMonth - 1,
              //           i + 1
              //         ).getDay() === 6,
              //     }
              //   )}
            >
              {i + 1}
            </div>
          );
        }
      } else {
        dayArr.push(<div className={styles.weekday}></div>);
      }
    }

    return dayArr;
  }, [selectedYear, selectedMonth, dateTotalCount]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>
          {yearControl()}년 {monthControl()}월
        </h3>
        <div className={styles.pagination}>
          <button onClick={prevMonth}>◀︎</button>
          <button onClick={nextMonth}>▶︎</button>
        </div>
      </div>
      <div className={styles.week}>{returnWeek()}</div>
      <div className={styles.date}>{returnDay()}</div>
    </div>
  );
};

export default Calendar;
