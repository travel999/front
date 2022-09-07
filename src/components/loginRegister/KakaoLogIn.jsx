import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../redux/modules/KakaoSlice";

const KakaoLogIn = () => {
    // const dispatch = useDispatch();
    // const location = useLocation();
    // const navigate = useNavigate();
    // const KAKAO_CODE = location.search.split('=')[1]

    // const REST_API_KEY = "56b0ae6936317cb6d7059df454f97979"
    // const REDIRECT_URI = "http://localhost:3000/kakao/callback"

    // const getKaKaoToken = () => {
    //     fetch(`https://kauth.kakao.com/oauth/token`)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.access_token) {
    //                 localStorage.setItem('token', data.access_token);
    //             } else {
    //                 navigate('/');
    //             }
    //         });
    // };

    // useEffect(() => {
    //     if (!location.search) return;
    //     getKaKaoToken();
    //     dispatch(kakaoLogin({ KAKAO_CODE }))
    // }, []);

    return (
        <div>KAKAOLOGIN</div>
    );
};
export default KakaoLogIn
// , {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
// }