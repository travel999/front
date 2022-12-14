import { createSlice } from "@reduxjs/toolkit";

// 초기 상태값
const initialState = {
  movePin: [],
};

//슬라이스
export const MoveMapSlice = createSlice({
  name: "moveMap",
  initialState,
  reducers: {
    moveOneCardPin(state, action) {
      state.movePin = [{ lat: action.payload.lat, lng: action.payload.lng }];
    },
  },
  extraReducers: {},
});

export const { moveOneCardPin } = MoveMapSlice.actions;
export default MoveMapSlice.reducer;
