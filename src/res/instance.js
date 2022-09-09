import axios from "axios";
import { getCookie } from "./cookie";

// const accessToken = localStorage.getItem('token');

const instance = axios.create({
  baseURL: "http://54.180.131.25:3000/",
  headers: { token: getCookie("jwtToken") },
  withCredentials: true,
});

console.log(instance.defaults.headers.common["token"]) // 헤더에 있는 토큰값
console.log(getCookie("jwtToken")) // 일반 로그인
console.log(getCookie("token")) // 카카오 소셜로그인
export default instance;

// instance.defaults.headers.common["token"] = `${accessToken}`