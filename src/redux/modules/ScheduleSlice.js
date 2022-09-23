import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../res/instance";

// 초기 상태값
const initialState = {
  title: "",
  date: [],
  postId: "",
};

export const saveSchedule = createAsyncThunk(
  "schedule/saveSchedule",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.post(`post`, payload);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const modifySchedule = createAsyncThunk(
  "schedule/modifySchedule",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.put(
        `post/${payload.postId}/title`,
        payload.data
      );
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//리듀서
export const ScheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: {
    [saveSchedule.pending]: (state) => {
      state.isLoading = true;
    },
    [saveSchedule.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.title = action.payload.title;
      state.date = action.payload.date;
      state.postId = action.payload.postId;
    },
    [saveSchedule.rejected]: (state, action) => {
      console.log(current(state), action);
    },
    [modifySchedule.pending]: (state) => {
      state.isLoading = true;
    },
    [modifySchedule.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.title = action.payload.title;
      state.date = action.payload.date;
      state.postId = action.payload.postId;
    },
    [modifySchedule.rejected]: (state, action) => {
      console.log(current(state), action);
    },
  },
});

// export const {} = ScheduleSlice.actions;
export default ScheduleSlice.reducer;
