import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface ErrorSlice {
  value: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: ErrorSlice = {
  value: false,
  status: "idle",
};

export const ErrorSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    OpenErrorMenu: (state) => {
      state.value = true;
    },

    CloseErrorMenu: (state) => {
      state.value = false;
    },
  },
});

export const { OpenErrorMenu, CloseErrorMenu } = ErrorSlice.actions;

export const setErrorSliceStatus = (state: RootState) =>
  state.IsErrorStatus.value;

export default ErrorSlice.reducer;
