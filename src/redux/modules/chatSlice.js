import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../res/instance";

const initialState = {
  chatMemory: [],
  error: false,
};

export const getChatMemory = createAsyncThunk(
  "chat/getMemory",
  async (id, thunkAPI) => {
    try {
      const res = await instance.get(`chat/${id}`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 리듀서
export const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState,
  reducers: {
    deleteMemory(state, action) {
      state.chatMemory = [];
    },
  },
  extraReducers: {
    [getChatMemory.fulfilled]: (state, action) => {
      const forChatArr = [];
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

export const { deleteMemory } = ChatSlice.actions;
export default ChatSlice.reducer;
