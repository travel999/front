import { configureStore } from "@reduxjs/toolkit";
import main from "../modules/MainSlice";

const store = configureStore({
  reducer: {
    main,
  },
  // 배포 환경일때, devTools가 false가 됩니다.
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
