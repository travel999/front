import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kakaoLogin } from "../../redux/modules/KakaoSlice"
import { useNavigate } from "react-router-dom";

const Loading = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const login = useSelector((state) => state.kakao.userLogin)
    console.log(login)
    // 인가코드
    const code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        dispatch(kakaoLogin({ code, navigate }));
    }, []);


    return (
        <h1>Log In ...</h1>
    )
};

export default Loading;

// useEffect(
//     async () => {
//     await dispatch(kakaoLogin({ code, navigate }));
// }, []);

// useEffect(() => {
//     dispatch(kakaoLogin({ code, navigate }));
// }, []);