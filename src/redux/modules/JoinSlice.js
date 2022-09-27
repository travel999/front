import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  nickname: "",
  password: "",
  confirm: "",
};

// 회원가입 청크
export const addJoin = createAsyncThunk(
  "signUpSlice/addJoin",
  async (payload, thunkAPI) => {
    try {
      console.log(payload.data.get("img"));
      const response = await instance.post("user/test", payload.data);
      console.log(response);
      if (response) {
        toast.success(
          "회원가입을 축하드립니다!",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          },
          setTimeout(() => {
            payload.navigate("/login");
          }, 1000)
        );
      }
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 415) {
        toast.error("이메일을 인증해주세요.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("내용을 확인해 주세요!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 이메일 중복확인 청크
export const doubleCheckEmail = createAsyncThunk(
  "signUpSlice/doubleCheckEmail",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("user/checkEmail", {
        signUp: payload,
      });
      if (response) {
        payload.setEmailMsg(response.data.message);
      }
      return thunkAPI.fulfillWithValue(response.result);
    } catch (error) {
      if (error) {
        payload.setEmailMsg(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 닉네임 중복확인 청크
export const doubleCheckNickName = createAsyncThunk(
  "signUpSlice/doubleCheckNickName",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("user/checkNickname", {
        signUp: payload,
      });
      if (response) {
        payload.setNickNameMsg(response.data.message);
      }
      return thunkAPI.fulfillWithValue(response.result);
    } catch (error) {
      if (error) {
        payload.setNickNameMsg(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("");
    }
  }
);

// 유효 이메일 인증 메일 발송 청크
export const invalidEmail = createAsyncThunk(
  "signUpSilce/invalidEmail",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("user/sendEmail", payload);
      if (response.result === true) {
        toast.success("이메일이 전송되었습니다!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      if (error) {
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 유효 이메일 인증
export const invalidEmailCheck = createAsyncThunk(
  "signUpSilce/invalidEmailCheck",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("user/checkCode", payload);
      console.log(response);
      if (response) {
        toast.info("이메일이 인증되었습니다!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error");
      if (error) {
        toast.warn("이메일 인증에 실패했습니다!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return thunkAPI.rejectWithValue(error);
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
    [invalidEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [invalidEmail.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [invalidEmail.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [invalidEmailCheck.pending]: (state) => {
      state.isLoading = true;
    },
    [invalidEmailCheck.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.result = action.payload;
    },
    [invalidEmailCheck.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {} = JoinSlice.actions;
export default JoinSlice.reducer;
