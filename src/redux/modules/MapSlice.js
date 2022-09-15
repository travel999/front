import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

// 초기 상태값
const initialState = {
  day: "",
  pin: [],
  content: [],
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
      state.day = action.payload;
    },
    getDayPlaceData(state, action) {
      state.pin = action.payload;
    },
    getConData(state, action) {
      console.log(action.payload);
      state.content.map(
        (item) => console.log(item.cardNum)
        // item.cardNum === action.payload.cardNum
        //   ? { ...state.content, content: action.payload }
        //   : it
      );
      // if (state.content.includes(action.payload.cardNum)) {
      //   console.log("payload는!!");

      // } else {
      //   state.content = [...state.content, action.payload];
      // }
    },
  },
  extraReducers: {},
});

export const { getMapData, getDayPlaceData, getConData } = MapSlice.actions;
export default MapSlice.reducer;
