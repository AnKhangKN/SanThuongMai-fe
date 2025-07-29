// src/redux/slices/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  currentChat: null,
  messages: [],
  socket: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setChats, setCurrentChat, setMessages, addMessage, setSocket } =
  chatSlice.actions;

export default chatSlice.reducer;
