import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../res/instance";

export const getCards = createAsyncThunk("main/get", async (page, thunkAPI) => {
  try {
    const res = await instance.get(`post/main/${page}`);
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const searchText = createAsyncThunk(
  "main/search",
  async (value, thunkAPI) => {
    try {
      const res = await instance.get(`post/search/${value[0]}/${value[1]}`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue("애러");
    }
  }
);

export const toOpenPublic = createAsyncThunk(
  "main/open",
  async (value, thunkAPI) => {
    try {
      const res = await instance.patch(`post/public/${value}`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const toLike = createAsyncThunk("main/like", async (value, thunkAPI) => {
  try {
    const res = await instance.post(`like/${value}`);
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  likeCards: [],
  MyPostCards: [],
  otherPeopleCards: [],
  searched: false,
  error: false,
};

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    refreshSearch(state, action) {
      state.searched = false;
      state.otherPeopleCards = [];
    },
  },
  extraReducers: {
    [getCards.fulfilled]: (state, action) => {
      state.MyPostCards = action.payload;
    },
    [getCards.rejected]: (state, action) => {
      console.log(state, action);
      state.error = true;
    },
    [searchText.fulfilled]: (state, action) => {
      state.searched = true;
      state.otherPeopleCards = action.payload.data;
    },
    [searchText.rejected]: (state, action) => {
      state.otherPeopleCards = [];
    },

    [toOpenPublic.fulfilled]: (state, action) => {
      console.log(current(state), action);
    },
    [toOpenPublic.rejected]: (state, action) => {
      console.log(action.payload);
    },

    [toLike.fulfilled]: (state, action) => {
      // 검색한 파일중 좋아요------------------------------
      if (state.searched === true) {
        if (action.payload.isLike.message === "일정에 좋아요를 취소했습니다") {
          console.log("취소");
          const actionData = action.payload.isLike.existLikes;
          let otherPeopleCards2 = {};
          const filtered = state.MyPostCards.data2.filter(
            (value) => value._id !== actionData._id
          );
          otherPeopleCards2.data = state.otherPeopleCards.map((value) => {
            if (value._id === actionData._id) {
              console.log("결러짐", value);
              value.isLiked = false;
              value.like -= 1;
            }
            return value;
          });
          console.log(filtered);
          state.MyPostCards.data2 = filtered;
          state.otherPeopleCards = otherPeopleCards2.data;
        } else if (
          action.payload.isLike.message === "일정에 좋아요를 했습니다"
        ) {
          const actionData = action.payload.isLike.existLikes;
          let otherPeopleCards2 = {};
          otherPeopleCards2.data = state.otherPeopleCards.map((value) => {
            if (value._id === actionData._id) {
              value.isLiked = true;
              value.like += 1;
            }
            return value;
          });
          state.MyPostCards.data2.unshift(actionData);
          state.otherPeopleCards = otherPeopleCards2.data;
        }
        // 추천 파일중 좋아요------------------------------
      } else if (state.searched !== true) {
        if (action.payload.isLike.message === "일정에 좋아요를 취소했습니다") {
          const actionData = action.payload.isLike.existLikes;
          actionData.isLiked = false; //
          actionData.like -= 1; //
          const MyPostCards2 = {};
          // data1 만들기
          MyPostCards2.data1 = state.MyPostCards.data1;
          // data2 만들기
          const forData2 = state.MyPostCards.data2.filter(
            (value) => value._id !== actionData._id
          );
          MyPostCards2.data2 = forData2;
          // data3 만들기
          MyPostCards2.data3 = state.MyPostCards.data3.map((value) => {
            if (value._id === actionData._id) {
              value.isLiked = false;
              value.like -= 1;
            }
            return value;
          });
          // 넣기
          state.MyPostCards = MyPostCards2;
        } else if (
          action.payload.isLike.message === "일정에 좋아요를 했습니다"
        ) {
          const actionData = action.payload.isLike.existLikes;
          actionData.isLiked = true; //
          actionData.like += 1; //
          const MyPostCards2 = {};
          // data1 만들기
          MyPostCards2.data1 = state.MyPostCards.data1;
          // data2 만들기
          let copyData2 = [];
          if (state.MyPostCards.data2?.result !== false) {
            copyData2 = [...state.MyPostCards.data2, actionData];
          } else {
            copyData2?.unshift(actionData);
          }
          MyPostCards2.data2 = copyData2;
          // data3 만들기
          MyPostCards2.data3 = state.MyPostCards.data3.map((value) => {
            if (value._id === actionData._id) {
              value.isLiked = true;
              value.like += 1;
            }
            return value;
          });
          // 넣기
          state.MyPostCards = MyPostCards2;
        }
      }
    },
    [toLike.rejected]: (state, action) => {
      console.log(state, action);
      state.error = true;
    },
  },
});

export const { refreshSearch } = mainSlice.actions;
export default mainSlice.reducer;
