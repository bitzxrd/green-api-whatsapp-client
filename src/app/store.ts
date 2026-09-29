import {
  configureStore,
  createListenerMiddleware,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { authReducer, logout, AUTH_STORAGE_KEY } from "@/features/auth";
import { chatsReducer, resetChats, CHATS_STORAGE_KEY } from "@/entities/chat";
import { greenApi } from "@/shared/api/greenApi";
import { saveToStorage } from "@/shared/lib/storage";

const unauthorizedListener = createListenerMiddleware();
unauthorizedListener.startListening({
  matcher: isRejectedWithValue,
  effect: (action, api) => {
    const error = action.payload as FetchBaseQueryError | undefined;
    if (error?.status === 401) {
      api.dispatch(resetChats());
      api.dispatch(logout());
    }
  },
});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatsReducer,
    [greenApi.reducerPath]: greenApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault()
      .prepend(unauthorizedListener.middleware)
      .concat(greenApi.middleware),
});

store.subscribe(() => {
  const { auth, chats } = store.getState();
  saveToStorage(AUTH_STORAGE_KEY, auth);
  saveToStorage(CHATS_STORAGE_KEY, chats.messages);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
