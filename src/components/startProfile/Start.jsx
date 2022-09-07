import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./start.module.css"
import background from "../../res/img/background.png"

const Start = () => {
  const navigate = useNavigate();
  
  const REST_API_KEY = "56b0ae6936317cb6d7059df454f97979"
  const REDIRECT_URI = "http://localhost:3000/kakao/callback"
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  // const KAKAO_AUTH_URL = "http://localhost:3000/kakao"
  return (
    <div className={styles.startBox}>
      <div className={styles.wrap}>
        <h1 className={styles.title}>ORIGACHI</h1>
        <div className={styles.description}>
          오리같이에 오신걸 환영합니다! <br />
          실시간으로 의견을 공유하고 지도를 확인하며 <br />
          우리 다같이, 재미있게 여행 일정 세워봐요!
        </div>
        <div>
          <button className={styles.login}
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </button>
          <a href={KAKAO_AUTH_URL}>
            <button className={styles.socialLogin}
            // onClick={() => {
            //   navigate({KAKAO_AUTH_URL});
            // }}
            >
              카카오로 로그인
            </button></a>
          <button className={styles.join}
            onClick={() => {
              navigate("/join");
            }}
          >
            회원가입
          </button>
        </div>
        <div className={styles.backgroundImg}>
          <img src={background} alt="배경"></img>
        </div>
      </div>
    </div>
  );
};

export default Start;
