import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";

const initialState = {
    newImage: "",
    newPassword: "",
    confirm: ""
}
// 대충 틀만 짠거라 수정 필요
// 유저 정보 조회
export const getUser = createAsyncThunk(
    "profileSlice/getUser",
    async (payload, thunkAPI) => {
        try {
            const response = await instance.get("user/me");
            console.log(response)
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
// 유저 이미지 변경
export const putImage = createAsyncThunk(
    "profileSlice/putImage",
    async (payload, thunkAPI) => {
        try {
            const response = await instance.put("user/image", payload);
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
// 유저 비밀번호 변경
export const putPassword = createAsyncThunk(
    "profileSlice/putPassword",
    async (payload, thunkAPI) => {
        try {
            const response = await instance.put("user/password", payload);
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
// 유저 정보 삭제
export const deleteUser = createAsyncThunk(
    "profileSlice/deleteUser",
    async (payload, thunkAPI) => {
        try {
            const response = await instance.delete("user/delete", payload);
            if (response) {
                // payload.setMsg(response.data.message);
            }
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const ProfileSlice = createSlice({
    name: "profileEdit",
    initialState,
    reducers: {},
    extraReducers: {
        [getUser.pending]: (state) => {
            state.isLoading = true;
        },
        [getUser.fulfilled]: (state, action) => {
            state.result = action.payload;
            state.isLoading = false;
        },
        [getUser.rejected]: (state) => {
            state.isLoading = false;
        },
        [putImage.pending]: (state) => {
            state.isLoading = true;
        },
        [putImage.fulfilled]: (state, action) => {
            state.result = action.payload;
            state.isLoading = false;
        },
        [putImage.rejected]: (state) => {
            state.isLoading = false;
        },
        [putPassword.pending]: (state) => {
            state.isLoading = true;
        },
        [putPassword.fulfilled]: (state, action) => {
            state.result = action.payload;
            state.isLoading = false;
        },
        [putPassword.rejected]: (state) => {
            state.isLoading = false;
        },
        [deleteUser.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.result = action.payload;
            state.isLoading = false;
        },
        [deleteUser.rejected]: (state) => {
            state.isLoading = false;
        },
    }
})

export default ProfileSlice.reducer