import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../res/instance";

// 초기 상태값
const initialState = {
  title: "",
  date: [],
  day: {
    pin: [],
    cottetn: [],
  },
};
//액션

//액션 함수

//청크
export const getResult = createAsyncThunk(
  "result/getResult",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.put(`post`, payload);
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
    [getResult.pending]: (state) => {
      state.isLoading = true;
    },
    [getResult.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.title = action.payload.title;
      state.date = action.payload.date;
      state.postId = action.payload.postId;
    },
    [getResult.rejected]: (state, action) => {
      console.log(current(state), action);
    },
  },
});

// export const {} = ScheduleSlice.actions;
export default ResultSlice.reducer;
