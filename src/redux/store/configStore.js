import { configureStore } from "@reduxjs/toolkit";
import Main from "../modules/MainSlice";
import LogInSlice from "../modules/LogInSlice";
import JoinSlice from "../modules/JoinSlice";
import KakaoSlice from "../modules/KakaoSlice";
import ProfileSlice from "../modules/ProfileSlice";
import ScheduleSlice from "../modules/ScheduleSlice";
import InviteSlice from "../modules/InviteSlice";
import MapSlice from "../modules/MapSlice";

const store = configureStore({
  reducer: {
    main: Main,
    login: LogInSlice,
    join: JoinSlice,
    kakao: KakaoSlice,
    profile: ProfileSlice,
    schedule: ScheduleSlice,
    invite: InviteSlice,
    kakaoMap: MapSlice,
  },
  // 배포 환경일때, devTools가 false가 됩니다.
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
