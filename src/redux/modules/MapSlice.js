import { createSlice } from "@reduxjs/toolkit";

// 초기 상태값
const initialState = {
  day: "",
  allDay: [],
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
      state.day = action.payload.day;
      state.allDay = action.payload.allDay;
    },
    getDayPlaceData(state, action) {
      state.pin = action.payload;
    },
    getConData(state, action) {
      if (state.content.length == 0) {
        state.content = [...state.content, action.payload];
      } else {
        let newArr = [];
        // 겹치는거 빼줌.
        newArr = state.content.filter((item) => {
          return item.cardNum !== action.payload.cardNum;
        });
        // 넣어줌
        newArr.push(action.payload);
        // 씌워주기
        state.content = newArr;
      }
    },
  },
  extraReducers: {},
});

export const { getMapData, getDayPlaceData, getConData } = MapSlice.actions;
export default MapSlice.reducer;
