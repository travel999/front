import React from "react";
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL } from "../signup/KakaoLogIn";
import styles from "../module.css/Start.module.css";
import Background from "../../res/img/background.png";
import cloud from "../../res/img/cloud.png";
import cloud1 from "../../res/img/cloud1.png";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.startBox}>
        <div className={styles.imgBox}>
          <img
            src={Background}
            alt="title"
            id="Frame"
            className={styles.title}
          />
          <label htmlFor="Frame">
            <div className={styles.description}>
              &nbsp;&nbsp;&nbsp;같이 의견을 공유하고 여행 플랜을 확인하며 <br />
              우리 같이, 알차고 재미있는 여행 일정 세워봐요!
            </div>
          </label>
          <button
            className={styles.login}
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </button>
          <a href={KAKAO_AUTH_URL}>
            <button className={styles.socialLogin}>카카오톡 로그인</button>
          </a>
          <div className={styles.joinText}>우리가치 서비스가 처음이신가요?</div>
          <button
            className={styles.join}
            onClick={() => {
              navigate("/join");
            }}
          >
            회원가입
          </button>
          <img src={cloud} alt="cloud" className={styles.cloud} />
          <img src={cloud1} alt="cloud1" className={styles.cloud1} />
        </div>
      </div>
    </div>
  );
};

export default Start;
