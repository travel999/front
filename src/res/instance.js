import axios from "axios";

console.log("인스턴스");

const instance = axios.create({
  baseURL: "http://52.78.142.77/",
  headers: { token: localStorage.getItem("jwtToken") },
  withCredentials: true,
});

export default instance;
