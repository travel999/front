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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const firstsearch = createAsyncThunk(
  "main/search/first",
  async (value, thunkAPI) => {
    try {
      const res = await instance.get(`post/search/${value[0]}/${value[1]}`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const toOpenPublic = createAsyncThunk(
  "main/open",
  async (request, thunkAPI) => {
    try {
      console.log(request.id, request.value);
      const res = await instance.patch(`post/public/${request.id}`, {
        openPublic: !request.value,
      });
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const DeletePost = createAsyncThunk(
  "main/delete",
  async (id, thunkAPI) => {
    try {
      const res = await instance.delete(`post/${id}`);
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
      if (action.payload?.data3?.message !== "공개된 일정이 없습니다.") {
        let MyPostCards2 = {};
        // 데이터 1 2 만들기
        MyPostCards2.data1 = action.payload.data1;
        MyPostCards2.data2 = action.payload.data2;
        // 데이터 3 만들기
        MyPostCards2.data3 = [];
        let mydata3 = [];
        if (state.MyPostCards?.data3 === undefined) {
          mydata3.push(...action.payload.data3);
          MyPostCards2.data3 = [...mydata3];
          state.MyPostCards = MyPostCards2;
        } else {
          mydata3.push(...state.MyPostCards?.data3);
          mydata3.push(...action.payload.data3);

          const newArray = mydata3.filter((item, i) => {
            return (
              mydata3.findIndex((item2, j) => {
                return item._id === item2._id;
              }) === i
            );
          });

          MyPostCards2.data3 = [...newArray];
          state.MyPostCards = MyPostCards2;
        }
      }
    },
    [getCards.rejected]: (state, action) => {
      state.error = true;
    },

    [searchText.fulfilled]: (state, action) => {
      // console.log("검색한게 여전히 똑같거나 처음이야");
      if (action.payload?.data?.message === "검색 결과가 존재하지 않습니다.") {
        // console.log("더이상 데이터가 존재하지 않습니다.");
      } else {
        state.searched = true;
        const mydata = [];
        if (state.otherPeopleCards.length === 0) {
          mydata.push(...action.payload.data);
        } else {
          // 다른것을 검색했을때 구분할수 있어야함.
          mydata.push(...state.otherPeopleCards);
          mydata.push(...action.payload.data);
        }
        // 중복 제거
        const newArray = mydata.filter((item, i) => {
          return (
            mydata.findIndex((item2, j) => {
              return item._id === item2._id;
            }) === i
          );
        });
        state.otherPeopleCards = newArray;
      }
    },
    [searchText.rejected]: (state, action) => {
      state.error = true;
      console.log("더이상 자료가 없습니다.");
    },

    [firstsearch.fulfilled]: (state, action) => {
      state.searched = true;
      state.otherPeopleCards = action.payload.data;
    },
    [firstsearch.rejected]: (state, action) => {
      state.error = true;
      console.log(action.payload);
    },

    [toOpenPublic.fulfilled]: (state, action) => {
      window.location.reload();
    },
    [toOpenPublic.rejected]: (state, action) => {
      state.error = true;
      console.log(action.payload);
    },

    [DeletePost.fulfilled]: (state, action) => {
      window.location.replace("/main");
    },
    [DeletePost.rejected]: (state, action) => {
      state.error = true;
      console.log(action.payload);
    },

    [toLike.fulfilled]: (state, action) => {
      // 검색한 파일중 좋아요------------------------------
      if (state.searched === true) {
        if (action.payload.isLike.message === "일정에 좋아요를 취소했습니다") {
          const actionData = action.payload.isLike.existLikes;
          let otherPeopleCards2 = {};
          const filtered = state.MyPostCards.data2.filter(
            (value) => value._id !== actionData._id
          );
          otherPeopleCards2.data = state.otherPeopleCards.map((value) => {
            if (value._id === actionData._id) {
              value.isLiked = false;
              value.like -= 1;
            }
            return value;
          });
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
      state.error = true;
    },
  },
});

export const { refreshSearch } = mainSlice.actions;
export default mainSlice.reducer;
