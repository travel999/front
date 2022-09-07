import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../res/instance";

export const getCards = createAsyncThunk("main/get", async (page, thunkAPI) => {
  try {
    const res = await instance.get(`post/main/${page}`);
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error) {
    return error;
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
      const MyPostCards2 = { data3: [] };
      // 데이터 1
      MyPostCards2.data1 = action.payload.data1;
      // 데이터 2
      MyPostCards2.data2 = action.payload.data2;
      // 데이터 3 걸러주기
      MyPostCards2.data3 = action.payload?.data3?.filter((value) => {
        let result = true;
        action.payload.data2?.forEach((value2) => {
          if (value2._id === value._id && value2._id === value._id) {
            result = false;
          }
        });
        return result;
      });

      state.MyPostCards = MyPostCards2;
    },
    [getCards.rejected]: (state, action) => {
      console.log(state, action);
    },

    [searchText.fulfilled]: (state, action) => {
      state.searched = true;
      const otherPeopleCards2 = action.payload.data.filter((value) => {
        let result = true;
        state.MyPostCards.data2.forEach((value2) => {
          if (value2._id === value._id && value2._id === value._id) {
            result = false;
          }
        });
        return result;
      });
      state.otherPeopleCards = { data: otherPeopleCards2 };
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
        const MyPostCards2 = {};
        // 데이터 1 만듬
        MyPostCards2.data1 = state.MyPostCards.data1;
        // 데이터 2 만듬
        const forData2 = state.MyPostCards.data2.filter(
          (value) => value._id !== actionData._id
        );
        MyPostCards2.data2 = forData2;
        // 데이터 3 만듬
        const copyData3 = state.MyPostCards.data3.slice();
        copyData3.push(actionData);
        MyPostCards2.data3 = copyData3;
        // 붙여넣기
        state.MyPostCards = MyPostCards2;
      } else if (action.payload.isLike.message === "일정에 좋아요를 했습니다") {
        const actionData = action.payload.isLike.existLikes;
        const MyPostCards2 = {};
        // 데이터 1 만듬
        MyPostCards2.data1 = state.MyPostCards.data1;
        // 데이터 2 만듬 맨위에 추가
        const copyData2 = state.MyPostCards.data2.slice();
        copyData2.unshift(actionData);
        MyPostCards2.data2 = copyData2;
        // 데이터 3 만듬 제거
        const forData3 = state.MyPostCards.data3.filter(
          (value) => value._id !== actionData._id
        );
        MyPostCards2.data3 = forData3;
        // 붙여넣기
        state.MyPostCards = MyPostCards2;
      }
    },
    [toLike.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { refreshSearch } = mainSlice.actions;
export default mainSlice.reducer;
