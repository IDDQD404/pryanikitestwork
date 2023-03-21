import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface LoginSlice {
  value: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: LoginSlice = {
  value: false,
  status: "idle",
};

export const LoginSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    loggedIn: (state) => {
      state.value = true;
    },
    loggedOut: (state) => {
      state.value = false;
    },
  },
});

export const { loggedIn, loggedOut } = LoginSlice.actions;

export const setLoggedStatus = (state: RootState) => state.islogged.value;

export default LoginSlice.reducer;
