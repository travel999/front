import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../res/instance";

export const getCards = createAsyncThunk("main/get", async (page, thunkAPI) => {
  try {
    const res = await instance.get(`post/main/${page}`);
    console.log(res);
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
      console.log(res);
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
    //state.MyPostCards.data2에 아무것도 없을때 애러 처리
    [searchText.fulfilled]: (state, action) => {
      state.searched = true;
      console.log(action.payload);
      // const otherPeopleCards2 = action.payload.data.filter((value) => {
      //   let result = true;
      //   state.MyPostCards.data2.map((value2) => {
      //     if (value2._id === value._id) {
      //       result = false;
      //     }
      //   });
      //   return result;
      // });
      state.otherPeopleCards = action.payload;
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
      } else if (action.payload.isLike.message === "일정에 좋아요를 했습니다") {
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
    },
    [toLike.rejected]: (state, action) => {
      console.log(state, action);
      state.error = true;
    },
  },
});

export const { refreshSearch } = mainSlice.actions;
export default mainSlice.reducer;
