import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";
import { setCookie } from "../../res/cookie";

const initialState = {
    email: "",
    password: ""
}

export const addLogin = createAsyncThunk(
    "LoginSlice/addLogin",
    async (payload, thunkAPI) => {
        console.log(payload.login)
        try {
            const data = await instance.post('user/login', payload.login);
            console.log(data)
            // const token = data.token;
            // setCookie("jwtToken", `${token}`)
            if (data) {
                alert("반갑습니다!");
                payload.navigate("/main");

            }
            return thunkAPI.fulfillWithValue(data);
        } catch (error) {
            alert("잘못된 아이디 또는 비밀번호 입니다.")
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const LogInSlice = createSlice({
    name: "addLogin",
    initialState,
    reducers: {},
    extraReducers: {
        [addLogin.pending]: (state) => { },
        [addLogin.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [addLogin.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
})

//user/login
export const { } = LogInSlice.actions;
export default LogInSlice.reducer;