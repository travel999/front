import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../res/instance";

const initialState = { cards: [] };

export const _GetCards = createAsyncThunk(
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

export const _SearchText = createAsyncThunk(
  "main/search",
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
    [_GetCards.fulfilled]: (state, action) => {
      console.log(current(state.cards), action);
    },
    [_GetCards.rejected]: (state, action) => {
      console.log(state, action);
    },

    [_SearchText.fulfilled]: (state, action) => {
      console.log(current(state.cards), action);
    },
    [_SearchText.rejected]: (state, action) => {
      console.log(state, action);
    },
  },
});

export const {} = mainSlice.actions;
export default mainSlice.reducer;
