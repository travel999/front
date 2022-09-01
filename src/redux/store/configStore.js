import { configureStore } from "@reduxjs/toolkit";
import Main from "../modules/MainSlice";
import LogInSlice from "../modules/LogInSlice";
import JoinSlice from "../modules/JoinSlice";

const store = configureStore({
  reducer: {
    main: Main,
    login: LogInSlice,
    join: JoinSlice
  },
  // 배포 환경일때, devTools가 false가 됩니다.
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
