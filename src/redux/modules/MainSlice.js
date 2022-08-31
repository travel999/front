import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../res/instance";

const initialState = { likeCards: [], MyPostCards: [] };

export const getCards = createAsyncThunk(
  "main/get",
  async (value, thunkAPI) => {
    try {
      console.log(value);
      return thunkAPI.fulfillWithValue.apply("result.data");
    } catch (error) {
      return error;
    }
  }
);

export const searchText = createAsyncThunk(
  "main/search",
  async (value, thunkAPI) => {
    try {
      // /post/search/:keyword=검색어
      console.log(value);
    } catch (error) {
      return error;
    }
  }
);

export const GetShared = createAsyncThunk(
  "main/get/shared",
  async (value, thunkAPI) => {
    try {
      console.log(value);
    } catch (error) {
      return error;
    }
  }
);

//슬라이스
export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getCards.fulfilled]: (state, action) => {
      console.log(current(state), action);
    },
    [getCards.rejected]: (state, action) => {
      console.log(state, action);
    },

    [searchText.fulfilled]: (state, action) => {
      console.log(current(state), action);
    },
    [searchText.rejected]: (state, action) => {
      console.log(state, action);
    },

    [GetShared.fulfilled]: (state, action) => {
      console.log(current(state), action);
    },
    [GetShared.rejected]: (state, action) => {
      console.log(state, action);
    },
  },
});

export const {} = mainSlice.actions;
export default mainSlice.reducer;
