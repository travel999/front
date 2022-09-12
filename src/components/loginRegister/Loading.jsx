import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kakaoLogin } from "../../redux/modules/KakaoSlice"
import { useNavigate } from "react-router-dom";
import styles from "./join.module.css"
import FadeLoader from "react-spinners/FadeLoader";

// 카카오 로그인시 인가코드를 받고 백엔드에 넘겨주는 과정을 위해 필요한 로딩 페이지
const Loading = () => {
    console.log("로딩")
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const login = useSelector((state) => state.kakao.userLogin)
    // 로그인 한 유저의 토큰
    console.log(login) 

    // 인가코드 추출
    const code = new URL(window.location.href).searchParams.get("code");
    
    useEffect(() => {
        dispatch(kakaoLogin({ code, navigate }));
    }, []);

    return (
        <div className={styles.loading}>
            <div>
                <FadeLoader
                    color="#4386FF"
                    height={15}
                    width={5}
                    radius={2}
                    margin={2}
                />
            </div>
        </div>
    )
};

export default Loading;
