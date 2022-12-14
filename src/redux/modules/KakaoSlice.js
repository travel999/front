import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";
import { toast } from "react-toastify";

const initialState = {
  userLogin: [],
  isLoading: false,
  error: [],
};

// 로그인 요청 및 유저 정보 가져오기
export const kakaoLogin = createAsyncThunk(
  "KakaoSlice/kakaoLogin",
  async (code, thunkAPI) => {
    try {
      console.log(code)
      const response = await instance.get(
        `kakao/callback?code=${code.code}`,
        code.code
      );
      console.log(response)
      const provider = response.data.user.provider;
      const token = response.data.user.token; // accessToken
      const nickname = response.data.user.userInfo.nickname; // 닉네임
      const profileImage = response.data.user.userInfo.profile_image; // 프로필 이미지
      localStorage.setItem("provider", provider);
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("image", profileImage);
      if (response) {
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
            code.navigate("/main");
          }, 1000)
        );
      }
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const KakaoSlice = createSlice({
  name: "socialLogin",
  initialState,
  reducers: {},
  extraReducers: {
    [kakaoLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [kakaoLogin.fulfilled]: (state, action) => {
      state.userLogin = action.payload;
    },
    [kakaoLogin.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default KakaoSlice.reducer;
