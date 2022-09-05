import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";

// 초기 상태값
const initialState = [
  { id: 1, title: "테스트 ", content: "테스트1 ", isDone: false },
];

//액션
const CREATE = "todo/CREATE";


//액션 함수
export const createTodo = (todo) => {
  return { type: CREATE, todo };
};

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
export const SceduleWriteSlice = createSlice({
  name: "SceduleWriteSlice",
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

export const {} = SceduleWriteSlice.actions;
export default SceduleWriteSlice.reducer;
