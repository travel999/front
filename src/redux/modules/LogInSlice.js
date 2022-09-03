import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";
import { setCookie } from "../../res/cookie";
import { Cookies } from "react-cookie";

const initialState = {
  email: "",
  password: "",
};

export const addLogin = createAsyncThunk(
  "LoginSlice/addLogin",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.post("user/login", payload.login);
      const token = res.data.token;
      console.log(res);
      console.log(res.data.token);
      setCookie("jwtToken", `${token}`);
      if (res) {
        alert("반갑습니다!");
        payload.navigate("/main");
      }
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      alert("잘못된 아이디 또는 비밀번호 입니다.");
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const LogInSlice = createSlice({
  name: "addLogin",
  initialState,
  reducers: {},
  extraReducers: {
    [addLogin.pending]: (state) => {},
    [addLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addLogin.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default LogInSlice.reducer;
