import axios from "axios";
import { getCookie, removeCookie } from "./cookie";

// const accessToken = localStorage.getItem('token');

const instance = axios.create({
  baseURL: "http://52.78.142.77/",
  headers: { token: getCookie("jwtToken") },
  withCredentials: true,
});
removeCookie("token");
removeCookie("kakaoToken");
removeCookie("accessToken");
console.log("인스턴스");
console.log(instance.defaults.headers.common["token"]); // 헤더에 있는 토큰값
console.log(getCookie("jwtToken")); // 일반 로그인
console.log(getCookie("kakaoToken")); // 카카오 소셜로그인
export default instance;

// instance.defaults.headers.common["token"] = `${accessToken}`
