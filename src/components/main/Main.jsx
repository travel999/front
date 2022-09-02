import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../res/cookie";
import styles from "./Main.module.css";
import FirstBox from "./FirstBox";
import SecondBox from "./SecondBox";
import ThirdBox from "./ThirdBox";
import ProfileBox from "./ProfileBox";
import {
  getCards,
  infinitiscroll,
  searchInfiniti,
} from "../../redux/modules/MainSlice";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenValue = getCookie("jwtToken");

  const [page, setPage] = useState(1); //무한스크롤 페이지
  const obsRef = useRef(null);
  const [load, setLoad] = useState(1); //로딩스피너 추가용
  const [prevent, setPrevent] = useState(true); //특정 환경에서 옵저버 핸들러가 2~3번까지 중복으로 실행되는 경우 방지
  const [end, setEnd] = useState(false);
  const searched = useSelector((state) => state.main.searched);
  const state = useSelector((state) => state.main);

  // 토크없으면 로그인 페이지로
  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    // dispatch(getCards());
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    console.log("1");
    return () => {
      observer.disconnect();
      console.log("2");
    };
  }, []);

  const obsHandler = (entries) => {
    const target = entries[0];
    console.log("6");
    if (!end && target.isIntersecting && prevent) {
      setPrevent(false);
      console.log("7");
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    console.log("1.5");
    loadpost();
    console.log("5");
  }, [page]);

  const loadpost = useCallback(async () => {
    setPrevent(true);
    setLoad(true); //피젯
    console.log("2");
    if (searched === false) {
      dispatch(getCards(page));
      console.log("3");
    } else if (searched === true) {
      dispatch(searchInfiniti());
    }
    setLoad(false); //피젯
    setPrevent(false);
    console.log("4");
  }, [page]);

  return (
    <>
      <div className={styles.mainbox}>
        <ProfileBox />
        <FirstBox />
        <SecondBox />
        <ThirdBox page={page} setPage={setPage} obsRef={obsRef} />
      </div>
    </>
  );
};

export default Main;
