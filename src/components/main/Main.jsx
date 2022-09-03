import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../res/cookie";
import styles from "./Main.module.css";
import FirstBox from "./FirstBox";
import SecondBox from "./SecondBox";
import ThirdBox from "./ThirdBox";
import ProfileBox from "./ProfileBox";
import { getCards, searchText } from "../../redux/modules/MainSlice";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenValue = getCookie("jwtToken");

  const input_ref = useRef(null); // 검색ref
  const [page, setPage] = useState(1); // 무한스크롤 페이지
  const [searchPage, setSearchPage] = useState(1); // 검색했을때 무한스크롤 페이지
  const obsRef = useRef(null); // 스크롤 바닥 ref
  const [load, setLoad] = useState(1); // 로딩스피너 추가용
  const [prevent, setPrevent] = useState(true); //특정 환경에서 옵저버 핸들러가 2~3번까지 중복으로 실행되는 경우 방지
  const [end, setEnd] = useState(false);
  const searched = useSelector((state) => state.main.searched); // true false

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
    return () => {
      observer.disconnect();
    };
  }, []);

  // obs보이면 page + 1
  const obsHandler = (entries) => {
    const target = entries[0];
    if (!end && target.isIntersecting && prevent) {
      setPrevent(false);
      if (searched === false) {
        setPage((prev) => prev + 1);
      } else if (searched === true) {
        setSearchPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    loadpost();
  }, [page]);

  const loadpost = useCallback(async () => {
    setPrevent(true);
    setLoad(true); //피젯
    if (searched === false) {
      dispatch(getCards(page));
    } else if (searched === true) {
      dispatch(searchText([input_ref.current.value, searchPage]));
    }
    setLoad(false); //피젯
    setPrevent(false);
  }, [page]);

  return (
    <>
      <div className={styles.mainbox}>
        <ProfileBox />
        <FirstBox />
        <SecondBox />
        <ThirdBox
          searchPage={searchPage}
          setSearchPage={setSearchPage}
          input_ref={input_ref}
          obsRef={obsRef}
        />
      </div>
    </>
  );
};

export default Main;
