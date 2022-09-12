import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

// 초기 상태값
const initialState = {
  day: "",
  pin: [],
};
//액션

//액션 함수

//청크

//슬라이스
export const MapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    getMapData(state, action) {
      console.log("getMapData");
      state.day = action.payload;
      state.pin = [];
    },
    getDayPlaceData(state, action) {
      console.log("getDayPlaceData");
      state.pin = action.payload;
    },
  },
  extraReducers: {},
});

export const { getMapData, getDayPlaceData } = MapSlice.actions;
export default MapSlice.reducer;
