import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../res/instance";
import { toast } from "react-toastify";

// 초기 상태값
const initialState = {
  message: "",
};

//청크
export const saveDayData = createAsyncThunk(
  "result/saveDayData",
  async (payload, thunkAPI) => {
    try {
      if (payload[0] === "1") {
        const res = await instance.put(`/post/${payload[2].postId}`, {
          day1: payload[1],
        });
        if (res.data) {
          toast("1일차가 저장되었습니다.", {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        return thunkAPI.fulfillWithValue(res.data);
      } else if (payload[0] === "2") {
        const res = await instance.put(`/post/${payload[2].postId}`, {
          day2: payload[1],
        });
        if (res.data) {
          toast("2일차가 저장되었습니다.", {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        return thunkAPI.fulfillWithValue(res.data);
      } else if (payload[0] === "3") {
        const res = await instance.put(`/post/${payload[2].postId}`, {
          day3: payload[1],
        });
        if (res.data) {
          toast("3일차가 저장되었습니다.", {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        return thunkAPI.fulfillWithValue(res.data);
      } else if (payload[0] === "4") {
        const res = await instance.put(`/post/${payload[2].postId}`, {
          day4: payload[1],
        });
        if (res.data) {
          toast("4일차가 저장되었습니다.", {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        return thunkAPI.fulfillWithValue(res.data);
      } else if (payload[0] === "5") {
        const res = await instance.put(`/post/${payload[2].postId}`, {
          day5: payload[1],
        });
        if (res.data) {
          toast("5일차가 저장되었습니다.", {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        return thunkAPI.fulfillWithValue(res.data);
      } else if (payload[0] === "6") {
        const res = await instance.put(`/post/${payload[2].postId}`, {
          day6: payload[1],
        });
        if (res.data) {
          toast("6일차가 저장되었습니다.", {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        return thunkAPI.fulfillWithValue(res.data);
      } else if (payload[0] === "7") {
        const res = await instance.put(`/post/${payload[2].postId}`, {
          day7: payload[1],
        });
        if (res.data) {
          toast("7일차가 저장되었습니다.", {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        return thunkAPI.fulfillWithValue(res.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//슬라이스
export const ResultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {},
  extraReducers: {
    [saveDayData.pending]: (state) => {
      state.isLoading = true;
    },
    [saveDayData.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [saveDayData.rejected]: (state, action) => {
      console.log(current(state), action);
    },
  },
});

// export const {} = ScheduleSlice.actions;
export default ResultSlice.reducer;
