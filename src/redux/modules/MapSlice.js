import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import instance from "../../res/instance";

// 초기 상태값
const initialState = {
  day: "",
  allDay: [],
  pin: [],
  content: [],
  title: "",
  date: [],
  members: [],
  openPublic: null,
};
//액션

//액션 함수

//청크
export const getSchedule = createAsyncThunk(
  "map/getSchedule",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.get(`post/${payload}`);
      const response = {};
      response.createdAt = res.data.data.createdAt;
      response.isLiked = res.data.data.isLiked;
      response.like = res.data.data.like;
      response.openPublic = res.data.data.openPublic;
      response.title = res.data.data.title;
      response.date = res.data.data.date;
      response.__v = res.data.data.__v;
      response._id = res.data.data._id;
      response.nickname = res.data?.data.nickname;

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
      return thunkAPI.fulfillWithValue(response);
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
        newArr.sort((a, b) => a.cardNum - b.cardNum);

        // 씌워주기
        state.content = newArr;
      }
    },
    deleteData(state, action) {
      // console.log(current(state.pin), action.payload.day);
      const dataArr = state.pin.filter((item, index) => {
        return index !== action.payload.idx;
      });
      state.pin = dataArr;
    },
    deleteDataForSocket(state, action) {
      const dataArr = action.payload.pins.filter(
        (item, index) => index !== action.payload.idx
      );
      state.pin = dataArr;
    },
  },
  extraReducers: {
    [getSchedule.pending]: (state) => {
      state.isLoading = true;
    },
    [getSchedule.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.pin = action.payload.pin;
      state.content = action.payload.con;
      state.date = action.payload.date;
      state.title = action.payload.title;
      state.members = action.payload.nickname;
      state.openPublic = action.payload.openPublic;
    },
    [getSchedule.rejected]: (state, action) => {
      console.log(current(state), action);
    },
  },
});

export const {
  getMapData,
  getDayPlaceData,
  getConData,
  deleteData,
  deleteDataForSocket,
} = MapSlice.actions;
export default MapSlice.reducer;
