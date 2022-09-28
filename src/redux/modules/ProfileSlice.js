import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";
import { toast } from "react-toastify";

const initialState = {
  result: {},
  newImage: "",
  newPassword: "",
  confirm: "",
};

// 유저 정보 조회
export const getUser = createAsyncThunk(
  "profileSlice/getUser",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get("user/me", payload);
      return thunkAPI.fulfillWithValue(response.data.data.userInfo);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 유저 이미지 변경
export const putImage = createAsyncThunk(
  "profileSlice/putImage",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.put("user/me/image", payload);
      const image = response.data.updateUser.userImage;
      localStorage.setItem("image", image);
      if (response) {
        toast.success(
          "이미지가 변경되었습니다!",
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
            window.location.replace("/profile");
          }, 1000)
        );
      }
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 유저 비밀번호 변경
export const putPassword = createAsyncThunk(
  "profileSlice/putPassword",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.put("user/me/password", payload);
      if (response.status === 200) {
        toast.success(
          "비밀번호가 변경되었습니다!",
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
            window.location.replace("/login");
          }, 1000)
        );
        // await window.location.replace("/login")
      }
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 유저 정보 삭제
export const deleteUser = createAsyncThunk(
  "profileSlice/deleteUser",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete("user/me/delete", payload);
      if (response) {
        localStorage.removeItem("jwtToken");
        toast.success(
          "탈퇴가 완료되었습니다!",
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
            payload.navigate("/");
          }, 1000)
        );
      }
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      if (error) {
        toast.error("회원 탈퇴에 실패했어요. 관리자에게 문의해 주세요.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
      state.nickname = action.payload.nickname;
      state.userImage = action.payload.userImage;
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
  },
});

export default ProfileSlice.reducer;
