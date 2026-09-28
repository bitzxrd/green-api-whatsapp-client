import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Credentials } from "@/shared/api/types";
import { loadFromStorage } from "@/shared/lib/storage";

export const AUTH_STORAGE_KEY = "auth";

const empty: Credentials = { idInstance: "", apiTokenInstance: "" };

const authSlice = createSlice({
  name: "auth",
  initialState: loadFromStorage<Credentials>(AUTH_STORAGE_KEY, empty),
  reducers: {
    login: (_, action: PayloadAction<Credentials>) => action.payload,
    logout: () => empty,
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
