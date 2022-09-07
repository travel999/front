import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from "../../res/instance"

const initialState = {
    userLogin: [],
    isLoading: false,
    error: [],
};

export const kakaoLogin = createAsyncThunk(
    "KakaoSlice/kakaoCallback",
    async (code, thunkAPI) => {
        try {
            const response = await instance.get(`http://localhost:3000/kakao/callback`,code); ///kakao?code=${code}
            const ACCESS_TOKEN = response.data.accessToken;
            // const data = await "http://localhost:3000/".get("/kakao", payload);
            localStorage.setItem('token', ACCESS_TOKEN );
            // localStorage.setItem('nickname', data.data.nickname);
            // localStorage.setItem('userKey', data.data.userKey);
            return thunkAPI.fulfillWithValue(ACCESS_TOKEN);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const KakaoSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: {
        [kakaoLogin.fulfilled]: (state, action) => {
            state.userLogin = action.payload;
        },
        [kakaoLogin.rejected]: (state, action) => {
            state.error = action.payload;
        },
    },
});

export default KakaoSlice;
