import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../redux/modules/KakaoSlice";
import styles from "../module.css/Mobile.module.css";
import { useMediaQuery } from "react-responsive";
import FadeLoader from "react-spinners/FadeLoader";
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
          <p className={styles.loadingText}>
          •••&#32;로그인 중입니다🐣&#32;  ••• 
          </p>
        </div >
      ) : (
        <div className={styles.background}>
          <div className={styles.loading}>
            <FadeLoader
              color="#4386FF"
              height={15}
              width={5}
              radius={2}
              margin={2}
            />
          </div>
        </div>)}
    </div>
  );
};

export default Loading;
