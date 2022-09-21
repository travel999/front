import axios from "axios";

console.log("인스턴스");

const instance = axios.create({
  baseURL: "http://52.78.142.77/",
  // headers: { token: localStorage.getItem("jwtToken") },
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    config.headers = { token : localStorage.getItem("jwtToken") };
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;

// 소켓 : "http://13.209.12.128:3000/"
// http://52.78.142.77/
