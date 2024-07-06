import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
  },
  reducers: {
    changeChat: (state, action) => {
      const { chatId, user, currentUser } = action.payload;

      // Check if current user is blockede

      if (user.blocked.includes(currentUser.id)) {
        state.chatId = chatId;
        state.user = null;
        state.isCurrentUserBlocked = true;
        state.isReceiverBlocked = false;
      } else if (currentUser.blocked.includes(currentUser.id)) {
        state.chatId = chatId;
        state.user = user;
        state.isCurrentUserBlocked = false;
        state.isReceiverBlocked = true;
      } else {
        state.chatId = chatId;
        state.user = user;
        state.isCurrentUserBlocked = false;
        state.isReceiverBlocked = false;
      }
    },
    changeBlock: (state) => {
      state.isReceiverBlocked = !state.isReceiverBlocked;
    },
  },
});

export const { changeChat, changeBlock } = chatSlice.actions;

export default chatSlice.reducer;
