import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";

const initialState = {
    email: "",
    nickname: "",
    password: "",
    confirm: ""
}
// 회원가입 청크
export const addJoin = createAsyncThunk(
    "signUpSlice/addJoin",
    async (payload, thunkAPI) => {
        console.log(payload);
        try {
            // 처음에 내가 원하는 대로 보내고 싶었으면 payload.data 해서 벗겨내고 줬으면.. 됐는데... 이 바보
            const response = await instance.post("user/signup", payload);
            if (response) {
                alert("회원가입을 축하드립니다!");
                payload.navigate("/login");
            }
            console.log(response)
            return response;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
// 이메일 중복확인 청크
export const doubleCheckEmail = createAsyncThunk(
    "signUpSlice/doubleCheckEmail",
    async (payload, thunkAPI) => {
        try {
            console.log(payload.email)
            const response = await instance.post("user/checkEmail", {
                email: payload.email,
            });
            console.log(response.data)
            if (response.data == true) {
                payload.setEmailMsg("사용가능한 이메일 입니다.");
            }
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            if (error.response.data == false) {
                payload.setEmailMsg("중복된 이메일입니다.");
                console.log(error)
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
            console.log(payload.nickname)
            const response = await instance.post("user/checkNickname", {
                nickname: payload.nickname,
            });
            if (response.data == true) {
                payload.setNickNameMsg("사용가능한 닉네임입니다.");
            }
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            if (error.response.data == false) {
                payload.setNickNameMsg("중복된 닉네임입니다");
            }
            return thunkAPI.rejectWithValue(error);
        }
    }
);


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
    }
});

export const { } = JoinSlice.actions;
export default JoinSlice.reducer;