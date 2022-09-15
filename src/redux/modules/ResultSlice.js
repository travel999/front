import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../res/instance";

// 초기 상태값
const initialState = {
  message: "",
};

//청크
export const saveDayData = createAsyncThunk(
  "result/saveDayData",
  async (payload, thunkAPI) => {
    try {
      let type = "";
      if (payload[0] === "1") {
        type = "day1";
      } else if (payload[0] === "2") {
        type = "day2";
      } else if (payload[0] === "3") {
        type = "day3";
      } else if (payload[0] === "4") {
        type = "day4";
      } else if (payload[0] === "5") {
        type = "day5";
      } else if (payload[0] === "6") {
        type = "day6";
      } else if (payload[0] === "7") {
        type = "day7";
      }
      console.log(type);
      const res = await instance.put(`/post/${payload[2]}`, {
        type: payload[1],
      });
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//슬라이스
export const ResultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {},
  extraReducers: {
    [saveDayData.pending]: (state) => {
      state.isLoading = true;
    },
    [saveDayData.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.title = action.payload.title;
      // state.date = action.payload.date;
      // state.postId = action.payload.postId;
    },
    [saveDayData.rejected]: (state, action) => {
      console.log(current(state), action);
    },
  },
});

// export const {} = ScheduleSlice.actions;
export default ResultSlice.reducer;
