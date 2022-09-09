import { configureStore } from "@reduxjs/toolkit";
import Main from "../modules/MainSlice";
import LogInSlice from "../modules/LogInSlice";
import JoinSlice from "../modules/JoinSlice";
import KakaoSlice from "../modules/KakaoSlice";
import ProfileSlice from "../modules/ProfileSlice";

const store = configureStore({
  reducer: {
    main: Main,
    login: LogInSlice,
    join: JoinSlice,
    kakao: KakaoSlice,
    profile: ProfileSlice,
  },
  // 배포 환경일때, devTools가 false가 됩니다.
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
