import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SURVER,
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "jwtToken"
    )}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
//  baseURL: process.env.REACT_APP_SURVER,
