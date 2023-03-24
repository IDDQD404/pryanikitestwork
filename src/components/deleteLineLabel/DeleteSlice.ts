import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface DeleteSlice {
  value: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: DeleteSlice = {
  value: false,
  status: "idle",
};

export const DeleteSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    OpenDeleteMenu: (state) => {
      state.value = true;
    },
    CloseDeleteMenu: (state) => {
      state.value = false;
    },
  },
});

export const { OpenDeleteMenu, CloseDeleteMenu } = DeleteSlice.actions;

export const setDeletingStatus = (state: RootState) => state.isDeleting.value;

export default DeleteSlice.reducer;
