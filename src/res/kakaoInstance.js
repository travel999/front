import axios from "axios";
// import { getCookie, removeCookie, setCookie } from "./cookie";

console.log("카카오인스턴스")
// const accessToken = localStorage.getItem('token');

// console.log(getCookie("accessToken")) // 카카오 로그인
// removeCookie("accessToken")

const kakaoInstance = axios.create({
  baseURL: "http://52.78.142.77/",
  headers: { token: localStorage.getItem('token') },
  withCredentials: true,
});


export default kakaoInstance;
//token: getCookie("jwtToken") // localStorage.getItem('token');
// instance.defaults.headers.common["token"] = `${accessToken}`
