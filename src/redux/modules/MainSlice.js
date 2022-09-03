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

// 미사용중
export const infinitiscroll = createAsyncThunk(
  "main/infiniti",
  async (page, thunkAPI) => {
    try {
      console.log(page);
      const res = await instance.get(`post/main/${page}`);
      return thunkAPI.fulfillWithValue(res.data.data3);
    } catch (error) {
      return error;
    }
  }
);

// 미사용중
export const searchInfiniti = createAsyncThunk(
  "main/infiniti/search",
  async (value, thunkAPI) => {
    try {
      console.log("검색어 있을때 무한스크롤");
    } catch (error) {
      console.log(error);
    }
  }
);

export const toOpenPublic = createAsyncThunk(
  "main/open",
  async (value, thunkAPI) => {
    try {
      console.log("공개예정");
    } catch (error) {
      console.log(error);
    }
  }
);

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
      state.MyPostCards = action.payload;
    },
    [getCards.rejected]: (state, action) => {
      console.log(state, action);
    },

    [searchText.fulfilled]: (state, action) => {
      state.searched = true;
      state.otherPeopleCards = action.payload;
    },
    [searchText.rejected]: (state, action) => {
      state.otherPeopleCards = [];
    },
  },
});

export const { refreshSearch } = mainSlice.actions;
export default mainSlice.reducer;
