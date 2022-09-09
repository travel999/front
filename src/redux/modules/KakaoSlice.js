import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from "../../res/instance"
import { setCookie } from "../../res/cookie";

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
            const response = await instance.get(`kakao/callback?code=${code.code}`, code.code);
            console.log(response)
            const token = response.data.user.token
            setCookie("jwtToken", `${token}`);
            console.log(token)
            // localStorage.setItem('token', response.data.user.token);
            if (response.status === 200) {
                alert("반갑습니다!");
                // await window.location.replace("/main")
                await code.navigate("/main")
            }
            return thunkAPI.fulfillWithValue(response.data.user.token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

const KakaoSlice = createSlice({
    name: 'socialLogin',
    initialState,
    reducers: {},
    extraReducers: {
        [kakaoLogin.pending]: (state) => {
            state.isLoading = true
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