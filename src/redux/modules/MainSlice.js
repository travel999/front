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
      console.log(value);
      const res = await instance.get(`post/search/${decodeURI(value)}`);
      console.log(res);
      // return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return error;
    }
  }
);

///post/search/:keyword=검색어

export const getgood = createAsyncThunk(
  "main/get/shared",
  async (value, thunkAPI) => {
    try {
      const res = await instance.get(`post/good`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return error;
    }
  }
);

const initialState = { likeCards: [], MyPostCards: [], otherPeopleCards: [] };

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getCards.fulfilled]: (state, action) => {
      state.MyPostCards = action.payload;
    },
    [getCards.rejected]: (state, action) => {
      console.log(state, action);
    },

    [searchText.fulfilled]: (state, action) => {
      console.log(current(state), action);
    },
    [searchText.rejected]: (state, action) => {
      state.otherPeopleCards = action.payload;
    },

    [getgood.fulfilled]: (state, action) => {
      state.likeCards = action.payload;
    },
    [getgood.rejected]: (state, action) => {
      console.log(state, action);
    },
  },
});

export const {} = mainSlice.actions;
export default mainSlice.reducer;
