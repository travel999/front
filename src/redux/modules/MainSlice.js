import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../res/instance";

export const getCards = createAsyncThunk(
  "main/get",
  async (value, thunkAPI) => {
    try {
      const res = await instance.get(`post/main`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return error;
    }
  }
);

export const searchText = createAsyncThunk(
  "main/search",
  async (value, thunkAPI) => {
    try {
      const res = await instance.get(`post/search/${value}`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue("애러");
    }
  }
);

export const infinitiscroll = createAsyncThunk(
  "main/infiniti",
  async (value, thunkAPI) => {
    try {
      console.log("무한스크롤");
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  likeCards: [],
  MyPostCards: [],
  otherPeopleCards: [],
  existdata: false,
};

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    refreshSearch(state, action) {
      console.log("리듀서");
      state.existdata = false;
      state.otherPeopleCards = [];
    },
  },
  extraReducers: {
    [getCards.fulfilled]: (state, action) => {
      state.MyPostCards = action.payload;
    },
    [getCards.rejected]: (state, action) => {
      console.log(state, action);
    },

    [searchText.fulfilled]: (state, action) => {
      state.existdata = false;
      state.otherPeopleCards = action.payload;
    },
    [searchText.rejected]: (state, action) => {
      state.existdata = true;
      state.otherPeopleCards = [];
    },
  },
});

export const { refreshSearch } = mainSlice.actions;
export default mainSlice.reducer;
