import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kakaoLogin } from "../../redux/modules/KakaoSlice"
import { useNavigate } from "react-router-dom";
import styles from "./join.module.css"
import FadeLoader from "react-spinners/FadeLoader";

const Loading = () => {
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