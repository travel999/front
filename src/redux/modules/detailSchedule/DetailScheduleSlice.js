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
      const res = await instance.get(`post/${payload}`);
      const response = {};
      response.createdAt = res.data.data.createdAt;
      response.isLiked = res.data.data.isLiked;
      response.like = res.data.data.like;
      response.openPublic = res.data.data.openPublic;
      response.title = res.data.data.title;
      response.__v = res.data.data.__v;
      response._id = res.data.data._id;

      let dayData;
      const newData = [];
      for (let i = 1; i <= 7; i++) {
        let days = "day" + i;
        newData.push(res.data.data[days]);
      }
      dayData = newData.filter((item) => item !== undefined);

      const con = [];
      const pin = [];
      dayData.map((value) => {
        value.pin.map((item) => {
          if (item?.title) {
            pin.push(item);
          }
        });
        value.con.map((item2) => {
          if (item2?.cardMemo) {
            con.push(item2);
          }
        });
      });
      response.pin = pin;
      response.con = con;
      console.log(response);

      return thunkAPI.fulfillWithValue(response);
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
