import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCards, searchText } from "../../redux/modules/MainSlice";
import FirstBox from "./FirstBox";
import SecondBox from "./SecondBox";
import ThirdBox from "./ThirdBox";
import ProfileBox from "./ProfileBox";
import styles from "./Main.module.css";
import minitravelduck from "../../res/img/travelduck-1.png";
import bottomcloud from "../../res/img/cloud1.png";
import topcloud from "../../res/img/cloud.png";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searched = useSelector((state) => state.main.searched); // true false
  const inputRef = useRef(null); // 검색ref
  const obsRef = useRef(null); // 스크롤 바닥 ref

  const [page, setPage] = useState(1); // 무한스크롤 페이지
  const [searchPage, setSearchPage] = useState(1); // 검색했을때 무한스크롤 페이지
  const [load, setLoad] = useState(1); // 로딩스피너 추가용
  const [prevent, setPrevent] = useState(true); //특정 환경에서 옵저버 핸들러가 2~3번까지 중복으로 실행되는 경우 방지
  const [beforeSearched, setBeforeSearched] = useState(null);

  const loginToken = localStorage.getItem("jwtToken");

  // 토크없으면 로그인 페이지로
  useEffect(() => {
    if (loginToken === "") {
      navigate("/");
    }
  }, []);

  // 감시 부분
  useEffect(() => {
    if (!searched) {
      const observer = new IntersectionObserver(observeTarget, {
        threshold: 0.6,
      });
      if (obsRef.current) observer.observe(obsRef.current);
      return () => {
        observer.disconnect();
      };
    } else if (searched) {
      const observer = new IntersectionObserver(searchedObserveTarget, {
        threshold: 0.6,
      });
      if (obsRef.current) observer.observe(obsRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [searched]);

  useEffect(() => {
    loadPost();
  }, [page, searchPage]);

  // obs보이면 page + 1 검색전 내부에서 if문이 써지질 않아 두개로 쪼갬
  const observeTarget = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && prevent) {
      setPrevent(false);
      setPage((prev) => prev + 1);
    }
  };

  // obs보이면 page + 1 검색후
  const searchedObserveTarget = () => {
    setPrevent(false);
    setSearchPage((prev) => prev + 1);
  };

  const loadPost = useCallback(() => {
    setPrevent(true);
    setLoad(true);
    if (searched === false) {
      dispatch(getCards(page));
    } else if (searched === true) {
      if (beforeSearched === null || beforeSearched == inputRef.current.value) {
        // 첫 검색
        setBeforeSearched(inputRef.current.value);
        oneSearch();
      } else {
        // 검색 후 다른것을 검색할때
        setBeforeSearched(inputRef.current.value);
        setSearchPage(1);
        twoSearch();
      }
    }
    setTimeout(() => {
      setLoad(false);
    }, 1500);
    setPrevent(false);
  }, [page, searchPage, searched]);

  // const loadpost = async () => {
  //   setPrevent(true);
  //   setLoad(true);
  //   if (searched === false) {
  //     await dispatch(getCards(page));
  //   } else if (searched === true) {
  //     await OneSearch();
  //   }
  //   setLoad(false);
  //   setPrevent(false);
  // };

  // 처음 검색하고, 계속 볼때 실행됌. 한번만.
  const oneSearch = () => {
    dispatch(searchText([inputRef.current.value, searchPage]));
  };

  // 첫검색과 다를때 실행되야 할것. 한번만 실행되어야 한다.
  const twoSearch = () => {
    dispatch(searchText([inputRef.current.value, searchPage]));
  };

  return (
    <div className={styles.backcolor}>
      <div className={styles.mainbox}>
        <ProfileBox />
        <FirstBox />
        <SecondBox />
        <ThirdBox
          searchPage={searchPage}
          setSearchPage={setSearchPage}
          inputRef={inputRef}
          obsRef={obsRef}
          load={load}
          beforeSearched={beforeSearched}
          setBeforeSearched={setBeforeSearched}
        />
      </div>
      <img src={minitravelduck} alt="miniduck" className={styles.miniduck} />
      <img src={bottomcloud} alt="cloud" className={styles.bottomcloud} />
      <img src={topcloud} alt="cloud-2" className={styles.topcloud} />
    </div>
  );
};

export default Main;
