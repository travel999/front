import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Main.module.css";
import SearchBar from "./SearchBar";
import { infinitiscroll } from "../../redux/modules/MainSlice";

const ThirdBox = () => {
  const dispatch = useDispatch();
  const searchdata = useSelector((state) => state.main.otherPeopleCards.data);
  const existdata = useSelector((state) => state.main.existdata);
  const recommendData = useSelector((state) => state.main.MyPostCards.data3);

  const input_ref = useRef(null); //검색ref

  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(1); //로딩스피너 추가용
  const preventRef = useRef(true); // preventRef는 특정 환경에서 옵저버 핸들러가 2~3번까지 중복으로 실행되는 경우 방지
  const obsRef = useRef(null);

  //page를 받아서 getDog실행
  useEffect(() => {
    loadpost();
  }, [page]);

  // obsRef가 50% 이상 보이면 불러오기
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  // IntersectionObserver에 들어갈 실행시킬 callback함수
  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };

  const loadpost = useCallback(async () => {
    //글 불러오기
    console.log("불러오기");
    setLoad(true); //스피너 돌고, 로딩 시작
    if (input_ref.current.value == "") {
      // 검색창에 아무것도 없을때
      dispatch(infinitiscroll());
    } else {
      //검색창에 뭔가 있을때
      console.log("검색창에 있을때");
    }
    preventRef.current = true;
    setLoad(false); //스피너 사라지고, 로딩 종료.
  }, [page]);

  return (
    <div>
      <div className={styles.bicbox}>
        <div className={styles.toptext}>다른사람의 일정</div>
        <SearchBar input_ref={input_ref} />
        {existdata ? (
          <div>정보가 존재하지 않습니다</div>
        ) : (
          recommendData?.map((value) => {
            return (
              <div className={styles.contentbox} key={value._id}>
                <div className={styles.bicimg}></div>
                <div className={styles.thirdtext}>
                  <div>{value.title}</div>
                  <div className={styles.day}>
                    {value.day.length - 1}박 {value.day.length}일
                  </div>
                </div>
              </div>
            );
          })
        )}
        {searchdata?.map((value) => {
          return (
            <div className={styles.contentbox} key={value._id}>
              <div className={styles.bicimg}></div>
              <div>
                <div>이름: {value.title}</div>
                <div>
                  {value.day.length - 1}박 {value.day.length}일
                </div>
              </div>
            </div>
          );
        })}
        <div ref={obsRef}></div>
      </div>
    </div>
  );
};

export default ThirdBox;
