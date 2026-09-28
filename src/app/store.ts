import { configureStore } from "@reduxjs/toolkit";
import { authReducer, AUTH_STORAGE_KEY } from "@/features/auth";
import { chatsReducer, CHATS_STORAGE_KEY } from "@/entities/chat";
import { greenApi } from "@/shared/api/greenApi";
import { saveToStorage } from "@/shared/lib/storage";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatsReducer,
    [greenApi.reducerPath]: greenApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(greenApi.middleware),
});

store.subscribe(() => {
  const { auth, chats } = store.getState();
  saveToStorage(AUTH_STORAGE_KEY, auth);
  saveToStorage(CHATS_STORAGE_KEY, chats.messages);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
