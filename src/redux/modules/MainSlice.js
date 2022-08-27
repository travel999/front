import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";

const initialState = {};

//청크
// export const ?? = createAsyncThunk(
//   "??",
//   async (payload, thunkAPI) => {
//     try {

//     } catch () {

//     }
//   }
// );

//슬라이스
export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {},
  extraReducers: {
    // [__getMovie.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__getMovie.fulfilled]: (state, action) => {
    //   state.lists = [...state.lists].concat(action.payload.pageData);
    //   state.isLoading = false;
    // },
  },
});

export const {} = mainSlice.actions;
export default mainSlice.reducer;
