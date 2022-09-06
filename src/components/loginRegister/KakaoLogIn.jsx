import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/KakaoSlice";

const REST_API_KEY = "56b0ae6936317cb6d7059df454f97979";
const REDIRECT_URI = "http://localhost:3000/kakao/callback";

const KakaoLogIn = () => {
    const dispatch = useDispatch();

    const href = window.location.href;
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");

    useEffect(() => {
    dispatch(userActions.KakaoLogInDB(code));
    }, []);
    // const code = new URL(window.location.href).searchParams.get("code");
    return (
        <div>
            <div>
                <div>잠시만 기다려 주세요! 로그인 중입니다.</div>
            </div>
        </div> 
    );
};
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export default KakaoLogIn