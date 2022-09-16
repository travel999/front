import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../../res/instance";

// 초기 상태값
const initialState = {
  data: [],
};
//액션

//액션 함수

//청크
export const getSchedule = createAsyncThunk(
  "detailSchedule/getSchedule",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const res = await instance.get(`post/${payload}`);
      console.log(res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//슬라이스
export const DeatilScheduleSlice = createSlice({
  name: "detailSchedule",
  initialState,
  reducers: {},
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

// export const {} = ScheduleSlice.actions;
export default DeatilScheduleSlice.reducer;
