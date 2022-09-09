import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from "../../res/instance"
import { setCookie } from "../../res/cookie";

const initialState = {
    userLogin: [],
    isLoading: false,
    error: [],
};

export const kakaoLogin = createAsyncThunk(
    "KakaoSlice/kakaoLogin",
    async (code, thunkAPI) => {
        try {
            console.log(code)
            const response = await instance.get(`kakao/callback?code=${code.code}`, code.code);
            console.log(response)
            const token = response.data.user.token //window.location.replace("/main");
            setCookie("token", `${token}`);
            localStorage.setItem('token', response.data.user.token);
            if (response.status === 200) {
                alert("반갑습니다!");
                await code.navigate("/main");
            }
            return thunkAPI.fulfillWithValue(response.data.user.token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

// 유저 정보 가져오기
// export const kakaoCallback = createAsyncThunk(
//     "KakaoSlice/kakaoCallback",
//     async (payload, thunkAPI) => {
//         console.log("dkdjf")
//         try {
//             const response = await instance.get("/kakao/callback")
//             console.log(response)
//             localStorage.setItem('token', response.user.token);
//             localStorage.setItem('email', response.user.userInfo.email);
//             localStorage.setItem('nickname', response.user.userInfo.nickname);
//             localStorage.setItem('nickprofile_imagename', response.user.userInfo.profile_image);
//             localStorage.setItem('provider', response.user.userInfo.provider);
//             return thunkAPI.fulfillWithValue(response.user.token);
//         } catch (error) {
//             console.error(error)
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// )

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
        // [kakaoCallback.fulfilled]: (state, action) => {
        //     state.userLogin = action.payload;
        // },
        // [kakaoCallback.rejected]: (state, action) => {
        //     state.error = action.payload;
        // },
    },
});

export default KakaoSlice.reducer;