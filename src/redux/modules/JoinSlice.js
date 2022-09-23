import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";
import { toast } from 'react-toastify';

const initialState = {
  email: "",
  nickname: "",
  userImage: "",
  password: "",
  confirm: "",
};

// 회원가입 청크
export const addJoin = createAsyncThunk(
  "signUpSlice/addJoin",
  async (payload, thunkAPI) => {
    try {
      console.log(payload)
      const response = await instance.post("user/signup", payload)
      if (response) {
        toast.success('회원가입을 축하드립니다!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        },
          setTimeout(() => {
            // window.location.replace("/login")
            payload.navigate("/login")
          }, 1000)
        )
      }
      return response.data;
    } catch (error) {
      if (error) {
        toast.error('내용을 확인해 주세요.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
      }
      return thunkAPI.rejectWithValue(error)
    }
  }
);

// 이메일 중복확인 청크
export const doubleCheckEmail = createAsyncThunk(
  "signUpSlice/doubleCheckEmail",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const response = await instance.post("user/checkEmail", {
        signUp: payload,
      })
      if (response) {
        payload.setEmailMsg(response.data.message)
      }
      return thunkAPI.fulfillWithValue(response.result)
    } catch (error) {
      if (error) {
        payload.setEmailMsg(error.response.data.message)
        // 중복된 이메일입니다.
      }
      return thunkAPI.rejectWithValue(error)
    }
  }
);

// 닉네임 중복확인 청크
export const doubleCheckNickName = createAsyncThunk(
  "signUpSlice/doubleCheckNickName",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      const response = await instance.post("user/checkNickname", {
        signUp: payload,
      });
      if (response) {
        payload.setNickNameMsg(response.data.message)
      }
      return thunkAPI.fulfillWithValue(response.result)
    } catch (error) {
      if (error) {
        payload.setNickNameMsg(error.response.data.message)
      }
      return thunkAPI.rejectWithValue("")
    }
  }
);

// 리듀서
export const JoinSlice = createSlice({
  name: "JoinSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [addJoin.pending]: (state) => {
      state.isLoading = true;
    },
    [addJoin.fulfilled]: (state, action) => {
      state.result = action.payload;
      state.isLoading = false;
    },
    [addJoin.rejected]: (state) => {
      state.isLoading = false;
    },
    [doubleCheckEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [doubleCheckEmail.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [doubleCheckEmail.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [doubleCheckNickName.pending]: (state) => {
      state.isLoading = true;
    },
    [doubleCheckNickName.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [doubleCheckNickName.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {} = JoinSlice.actions;
export default JoinSlice.reducer;
