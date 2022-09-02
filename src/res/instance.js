import axios from "axios";
import { getCookie } from "./cookie";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzBlZjY4ZGNlNzE4YTY0OGI0NTNhNDciLCJpYXQiOjE2NjE5OTg4MTF9.Vpsvgqn-ONV1tmp-t5d5FYGSVDylOy-xUaf64a-OD-o";

const instance = axios.create({
  baseURL: "http://43.200.173.40:3000/",
  headers: { token: getCookie("jwtToken") },
  withCredentials: true,
});

// if (getCookie("jwtToken") === undefined) {
//   instance.defaults.headers.common["token"] = 500;
// } else {
//   instance.defaults.headers.common["token"] = getCookie("jwtToken");
// }

export default instance;
