import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

const initialState = {
  value: "",
  status: "idle",
};

export const ErrorMessageSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    SetErrorMessage: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { SetErrorMessage } = ErrorMessageSlice.actions;

export const setErrorMessageSlice = (state: RootState) =>
  state.ErrorMessage.value;

export default ErrorMessageSlice.reducer;
