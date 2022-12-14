import React from "react";
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL } from "../signup/KakaoLogIn";
import styles from "../module.css/Mobile.module.css";
import mobileDuckLogo from "../../res/img/mobileDuckLogo.png";

const MobileStart = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.startBox}>
        <div>
          <img
            src={mobileDuckLogo}
            alt="title"
            id="Frame"
            className={styles.logoImage}
          />
          <p className={styles.mobileDescription}>우리같이 세우는 여행 일정</p>
          <button
            className={styles.mobileLogin}
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </button>
          <a href={KAKAO_AUTH_URL}>
            <button className={styles.kakaoLogin}>카카오톡 로그인</button>
          </a>
          <div className={styles.joinDescription}>우리가치가 처음이신가요?</div>
          <button
            className={styles.joinMobile}
            onClick={() => {
              navigate("/join");
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileStart;
