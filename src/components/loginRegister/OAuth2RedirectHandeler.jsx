import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../../redux/modules/KakaoSlice"

const OAuth2RedirectHandler = (props) => {
    const dispatch = useDispatch();

    // 인가코드
    const code = new URL(window.location.href).searchParams.get("code");

    useEffect(
        async () => {
        await dispatch(kakaoLogin(code));
    }, []);

    return (
        <div>리다이렉트 핸들러</div>
    )
};

export default OAuth2RedirectHandler;
