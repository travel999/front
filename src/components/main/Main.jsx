import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import minitravelduck from "../../res/img/travelduck-1.png";
import bottomcloud from "../../res/img/cloud1.png";
import topcloud from "../../res/img/cloud.png";
import FirstBox from "./FirstBox";
import SecondBox from "./SecondBox";
import ThirdBox from "./ThirdBox";
import ProfileBox from "./ProfileBox";
import {
  firstsearch,
  getCards,
  searchText,
} from "../../redux/modules/MainSlice";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searched = useSelector((state) => state.main.searched); // true false

  const input_ref = useRef(null); // 검색ref
  const [page, setPage] = useState(1); // 무한스크롤 페이지
  const [searchPage, setSearchPage] = useState(1); // 검색했을때 무한스크롤 페이지
  const obsRef = useRef(null); // 스크롤 바닥 ref
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
      const observer = new IntersectionObserver(obsHandler, { threshold: 0.6 });
      if (obsRef.current) observer.observe(obsRef.current);
      return () => {
        observer.disconnect();
      };
    } else if (searched) {
      const observer = new IntersectionObserver(searchedObsHandler, {
        threshold: 0.6,
      });
      if (obsRef.current) observer.observe(obsRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [searched]);

  // obs보이면 page + 1 검색전 내부에서 if문이 써지질 않아 두개로 쪼갬
  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && prevent) {
      setPrevent(false);
      setPage((prev) => prev + 1);
    }
  };

  // obs보이면 page + 1 검색후
  const searchedObsHandler = () => {
    setPrevent(false);
    setSearchPage((prev) => prev + 1);
  };

  useEffect(() => {
    loadpost();
  }, [page, searchPage]);

  // const loadpost = useCallback(() => {
  //   setPrevent(true);
  //   setLoad(true);
  //   if (searched === false) {
  //     dispatch(getCards(page));
  //   } else if (searched === true) {
  //     if (
  //       beforeSearched === null ||
  //       beforeSearched == input_ref.current.value
  //     ) {
  //       // 첫 검색
  //       console.log("11111");
  //       setBeforeSearched(input_ref.current.value);
  //       OneSearch();
  //     } else {
  //       // 검색 후 다른것을 검색할때
  //       console.log("2222");
  //       setBeforeSearched(input_ref.current.value);
  //       setSearchPage(1);
  //       twoSearch();
  //     }
  //   }
  //   setLoad(false);
  //   setPrevent(false);
  // }, [page, searchPage]);

  const loadpost = async () => {
    setPrevent(true);
    setLoad(true);
    if (searched === false) {
      await dispatch(getCards(page));
    } else if (searched === true) {
      await OneSearch();
    }
    setLoad(false);
    setPrevent(false);
  };

  // 처음 검색하고, 계속 볼때 실행됌. 한번만.
  const OneSearch = () => {
    dispatch(searchText([input_ref.current.value, searchPage]));
  };

  // 첫검색과 다를때 실행되야 할것. 한번만 실행되어야 한다.
  const twoSearch = () => {
    dispatch(searchText([input_ref.current.value, searchPage]));
    // dispatch(firstsearch([input_ref.current.value, searchPage]));
  };

  return (
    <>
      <div className={styles.backcolor}>
        <div className={styles.mainbox}>
          <ProfileBox />
          <FirstBox />
          <SecondBox />
          <ThirdBox
            searchPage={searchPage}
            setSearchPage={setSearchPage}
            input_ref={input_ref}
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
    </>
  );
};

export default Main;
