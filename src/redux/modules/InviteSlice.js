import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../res/instance";

// 초기 상태값
const initialState = {
  result: "",
  message: "",
};
//액션

//액션 함수

//청크
export const saveNickName = createAsyncThunk(
  "invite/saveNickName",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.patch(
        `post/invite/${payload.postId}`,
        payload.nickname2
      );
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//슬라이스
export const InviteSlice = createSlice({
  name: "invite",
  initialState,
  reducers: {},
  extraReducers: {
    [saveNickName.pending]: (state) => {
      state.isLoading = true;
    },
    [saveNickName.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.result = action.payload.result;
      state.message = action.payload.message;
    },
    [saveNickName.rejected]: (state, action) => {
      console.log(current(state), action);
    },
  },
});

// export const {} = ScheduleSlice.actions;
export default InviteSlice.reducer;
