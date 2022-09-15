import { createSlice, current } from "@reduxjs/toolkit";
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
      if (state.content.length == 0) {
        console.log("0입니다");
        state.content = [...state.content, action.payload];
      } else {
        console.log("0이 아닙니다");
        state.content.map((item) =>
          item.cardNum === action.payload.cardNum
            ? { ...item, cardMemo: action.payload.cardMemo }
            : [...state.content, action.payload]
        );
      }

      // else if (state.content.includes(action.payload.cardNum)) {
      //   console.log("include_true");

      // } else if (!state.content.includes(action.payload.cardNum)) {
      //   console.log("include_false");
      //   state.content = [...state.content, action.payload];
      // }
    },
  },
  extraReducers: {},
});

export const { getMapData, getDayPlaceData, getConData } = MapSlice.actions;
export default MapSlice.reducer;
