import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loadFromStorage } from "@/shared/lib/storage";
import type { ChatsState, Message } from "./types";

export const CHATS_STORAGE_KEY = "chats";

const initialState: ChatsState = {
  messages: loadFromStorage<Record<string, Message[]>>(CHATS_STORAGE_KEY, {}),
  activeId: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, { payload }: PayloadAction<string>) => {
      state.messages[payload] ??= [];
      state.activeId = payload;
    },
    addMessage: (
      state,
      { payload }: PayloadAction<{ phone: string; message: Message }>,
    ) => {
      const list = (state.messages[payload.phone] ??= []);
      if (!list.some((m) => m.id === payload.message.id))
        list.push(payload.message);
    },
    setActiveChat: (state, { payload }: PayloadAction<string | null>) => {
      state.activeId = payload;
    },
    resetChats: () => ({ messages: {}, activeId: null }),
  },
});

export const { addChat, addMessage, setActiveChat, resetChats } =
  chatsSlice.actions;
export default chatsSlice.reducer;
