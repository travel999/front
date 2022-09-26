import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../redux/modules/KakaoSlice";
import styles from "./Join.module.css";
import FadeLoader from "react-spinners/FadeLoader";

// 카카오 로그인시 인가코드를 받고 백엔드에 넘겨주는 과정을 위해 필요한 로딩 페이지
const Loading = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 인가코드 추출
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(kakaoLogin({ code, navigate }));
  }, []);

  return (
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
    </div>
  );
};

export default Loading;
