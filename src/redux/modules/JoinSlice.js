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
            if (response.data.result) {
                alert("회원이 되신걸 축하드립니다!");
                payload.navigation("/login");
            }
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const doubleCheckId = createAsyncThunk(
    "signUpSlice/checkDoubleId",
    async (payload, thunkAPI) => {
        try {
            const responseData = await instance.post("user/signup", {
                email: payload.email,
            });
            if (responseData.data.result) {
                payload.setIdMsg("사용가능한 아이디 입니다.");
            }
            return thunkAPI.fulfillWithValue(responseData.data);
        } catch (error) {
            if (error.response.data.result == false) {
                payload.setIdMsg("중복된 아이디입니다");
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
    },
});

export const {} = JoinSlice.actions;
export default JoinSlice.reducer;