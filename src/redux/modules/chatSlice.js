import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../res/instance";

//632c1716f17b2cd22cf0352c
//632c144abfd63d1eec8a3537
//632c1ed49734c65cacaadffd

export const getChatMemory = createAsyncThunk(
  "chat/getMemory",
  async (id, thunkAPI) => {
    try {
      console.log(id);
      const res = await instance.get(`chat/${id}`);
      console.log(res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  chatMemory: [],
  error: false,
};

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getChatMemory.fulfilled]: (state, action) => {
      const forChatArr = [];
      console.log(forChatArr);
      if (action.payload?.chatRoom?.chatLog !== undefined) {
        const chatLog = action.payload.chatRoom.chatLog;
        const chatTime = action.payload.chatRoom.chatTime;
        const chatName = action.payload.chatRoom.nickname;

        chatLog.map((value, idx) => {
          let tempObj = {};
          tempObj.message = value;
          forChatArr.push(tempObj);
          tempObj = {};
        });
        chatTime.map((value, idx) => {
          forChatArr[idx].time = value;
        });
        chatName.map((value, idx) => {
          forChatArr[idx].author = value;
        });
        console.log(forChatArr);
        state.chatMemory = forChatArr;
      }
    },
    [getChatMemory.rejected]: (state, action) => {
      state.error = true;
      console.log(action);
    },
  },
});

export const {} = chatSlice.actions;
export default chatSlice.reducer;
