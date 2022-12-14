import { configureStore } from "@reduxjs/toolkit";
import Main from "../modules/MainSlice";
import LogInSlice from "../modules/LogInSlice";
import JoinSlice from "../modules/JoinSlice";
import KakaoSlice from "../modules/KakaoSlice";
import ProfileSlice from "../modules/ProfileSlice";
import ScheduleSlice from "../modules/ScheduleSlice";
import InviteSlice from "../modules/InviteSlice";
import MapSlice from "../modules/MapSlice";
import MoveMapSlice from "../modules/MoveMapSlice";
import ResultSlice from "../modules/ResultSlice";
import ChatSlice from "../modules/ChatSlice";

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
    moveMap: MoveMapSlice,
    result: ResultSlice,
    chat: ChatSlice,
  },
  // 배포 환경일때, devTools가 false가 됩니다.
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
