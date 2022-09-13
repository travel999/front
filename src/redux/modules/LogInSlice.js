import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";
// import { setCookie,removeCookie,getCookie } from "../../res/cookie";

const initialState = {
  email: "",
  password: "",
};

export const addLogin = createAsyncThunk(
  "LoginSlice/addLogin",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("user/login", payload.login);
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("jwtToken", token);
      console.log("로그인");
      if (response.status === 200) {
        alert("반갑습니다!");
        await window.location.replace("/main");
        // await payload.navigate("/main");
      }
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("잘못된 아이디 또는 비밀번호 입니다.");
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
