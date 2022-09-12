import axios from "axios";

console.log("인스턴스");

const instance = axios.create({
  baseURL: "http://13.209.12.128:3000/",
  headers: { token: localStorage.getItem("jwtToken") },
  withCredentials: true,
});

export default instance;
