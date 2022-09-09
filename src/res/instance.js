import axios from "axios";
import { getCookie } from "./cookie";

const accessToken = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://54.180.131.25:3000/",
  headers: { token: getCookie("jwtToken") },
  withCredentials: true,
});

// const instance = axios.create({
//   baseURL: "http://43.200.173.40:3000/",
//   headers: { token: (getCookie("jwtToken"), (`${accessToken}`)) },
//   withCredentials: true,
// });

// if (getCookie("jwtToken") === undefined) {
//   instance.defaults.headers.common["token"] = 500;
// } else {
//   instance.defaults.headers.common["token"] = getCookie("jwtToken");
// }

export default instance;
