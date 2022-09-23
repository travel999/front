import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SURVER,
  // headers: { token: localStorage.getItem("jwtToken") },
  // Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "jwtToken"
    )}`;
    // config.headers = { bearer : localStorage.getItem("jwtToken") };
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
