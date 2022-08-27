import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "../modules/MainSlice";

const store = configureStore({
  reducer: {
    main: mainSlice,
  },
  // 배포 환경일때, devTools가 false가 됩니다.
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
