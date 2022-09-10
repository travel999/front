import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";

const initialState = {
    newImage: "",
    newPassword: "",
    confirm: ""
}

// 유저 정보 조회
export const getUser = createAsyncThunk(
    "profileSlice/getUser",
    async (payload, thunkAPI) => {
        try {
            const response = await instance.get("user/me");
            console.log(response)
            return thunkAPI.fulfillWithValue(response);
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
            console.log(payload)
            const response = await instance.put("user/me/image", payload);
            return thunkAPI.fulfillWithValue(response);
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
            console.log(payload)
            const response = await instance.put("user/me/password", payload);
            console.log(response)
            if (response) {
                payload.setPwMsg(response.data.message)
            }
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            if (error) {
                payload.setPwMsg(error.response.data.message)
            }
            return thunkAPI.rejectWithValue(error)
        }
    }
)
// 유저 정보 삭제
export const deleteUser = createAsyncThunk(
    "profileSlice/deleteUser",
    async (payload, thunkAPI) => {
        try {
            console.log(payload)
            const response = await instance.delete("user/me/delete", payload);
            if (response) {
                alert("회원 탈퇴가 완료되었습니다🙁")
                await window.location.replace("/")
            }
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            if (error) {
                alert("회원 탈퇴에 실패했어요! 관리자에게 문의해 주세요.")
            }
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

export default ProfileSlice.reducer;