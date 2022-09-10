import axios from "axios";
import { getCookie } from "./cookie";

// const accessToken = localStorage.getItem('token');

const kakaoInstance = axios.create({
  baseURL: "http://54.180.131.25:3000/",
  headers: { token: getCookie("kakaoToken") },
  withCredentials: true,
});

console.log("카카오인스턴스")

export default kakaoInstance;