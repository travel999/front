import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";
import { toast } from "react-toastify";

const initialState = {
  data: {},
  email: "",
  password: "",
};

export const addLogin = createAsyncThunk(
  "LoginSlice/addLogin",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("user/login", payload.login);
      const token = response.data.token;
      const nickname = response.data.nickname;
      const image = response.data.image;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("image", image);
      if (response.status === 200) {
        toast.success(
          "반갑습니다!",
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
            payload.navigate("/main");
          }, 1000)
        );
      }
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      toast.error("잘못된 아이디 또는 비밀번호 입니다.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      state.nickname = action.payload.nickname;
      state.image = action.payload.image;
      state.isLoading = false;
    },
    [addLogin.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { getUserInfo } = LogInSlice.actions;
export default LogInSlice.reducer;
