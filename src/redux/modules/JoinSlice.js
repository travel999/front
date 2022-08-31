import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";

const initialState = {
    email: "",
    nickName: "",
    // userImage: "",
    passWord: "",
    confirm: ""
}

export const addJoin = createAsyncThunk(
    "signUpSlice/addUser",
    async (payload, thunkAPI) => {
        console.log(payload);
        try {
            const response = await instance.post("user/signup", payload);
            if (response.data) {
                alert("회원가입을 축하드립니다!");
                payload.navigation("user/login");
            }
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const doubleCheckEmail = createAsyncThunk(
    "signUpSlice/checkDoubleEmail",
    async (payload, thunkAPI) => {
        try {
            const response = await instance.post("user/checkEmail", {
                email: payload.email,
            });
            if (response.data) {
                payload.setIdMsg("사용가능한 이메일 입니다.");
            }
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            if (error.response.data == false) {
                payload.setIdMsg("중복된 이메일입니다.");
            }
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const doubleCheckNickName = createAsyncThunk(
    "signUpSlice/doubleCheckIdNickName",
    async (payload, thunkAPI) => {
        try {
            const response = await instance.post("user/checkEmail", {
                nickName: payload.nickName,
            });
            if (response.data) {
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