import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface EditSlice {
  value: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: EditSlice = {
  value: false,
  status: "idle",
};

export const EditSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    OpenEditMenu: (state) => {
      state.value = true;
    },
    CloseEditMenu: (state) => {
      state.value = false;
    },
  },
});

export const { OpenEditMenu, CloseEditMenu } = EditSlice.actions;

export const setEditingStatus = (state: RootState) => state.isEditing.value;

export default EditSlice.reducer;
