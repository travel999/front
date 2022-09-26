import React from "react";

const REST_API_KEY = "56b0ae6936317cb6d7059df454f97979"
const REDIRECT_URI = "https://oorigachi.com/kakao/callback"

const KakaoLogIn = () => {

    return (
        <div>KAKAOLOGIN</div>
    );
};
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export default KakaoLogIn