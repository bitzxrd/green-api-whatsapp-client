import { configureStore } from "@reduxjs/toolkit";
import { authReducer, AUTH_STORAGE_KEY } from "@/features/auth";
import { greenApi } from "@/shared/api/greenApi";
import { saveToStorage } from "@/shared/lib/storage";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [greenApi.reducerPath]: greenApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(greenApi.middleware),
});

store.subscribe(() => saveToStorage(AUTH_STORAGE_KEY, store.getState().auth));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
