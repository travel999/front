import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../redux/modules/KakaoSlice";
import styles from "../module.css/Mobile.module.css";
import { useMediaQuery } from "react-responsive";
import BeatLoader from "react-spinners/BeatLoader";
import mobileDuckLogo from "../../res/img/mobileDuckLogo.png"

// 카카오 로그인시 인가코드를 받고 백엔드에 넘겨주는 과정을 위해 필요한 로딩 페이지
const Loading = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 인가코드 추출
  const code = new URL(window.location.href).searchParams.get("code");
  //  모바일 일때 보여지는 화면 다르게
  const MobileSize = useMediaQuery({ maxWidth: 430 });

  useEffect(() => {
    dispatch(kakaoLogin({ code, navigate }));
  }, []);

  return (
    <div>
      {MobileSize ? (
        <div className={styles.background} >
          <img src={mobileDuckLogo} alt="" className={styles.logoImage} />
          <div className={styles.loading}>
            <BeatLoader
              color="#ffc51c"
              cssOverride={{}}
              margin={20}
              size={25}
              speedMultiplier={1}
            />
          </div>
        </div >
      ) : (
        <div className={styles.loadingGround}>
          <p className={styles.loadingPage}>로그인 중입니다🐣 <br /><br />
            잠깐만 기다려주세요!</p>
          <BeatLoader
            color="#ffc51c"
            cssOverride={{}}
            margin={20}
            size={25}
            speedMultiplier={1}
          />
        </div>)}
    </div>
  );
};

export default Loading;
