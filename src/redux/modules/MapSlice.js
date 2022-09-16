import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import instance from "../../res/instance";

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
export const getSchedule = createAsyncThunk(
  "map/getSchedule",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.get(`post/${payload}`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
  extraReducers: {
    [getSchedule.pending]: (state) => {
      state.isLoading = true;
    },
    [getSchedule.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [getSchedule.rejected]: (state, action) => {
      console.log(current(state), action);
    },
  },
});

export const { getMapData, getDayPlaceData, getConData } = MapSlice.actions;
export default MapSlice.reducer;
