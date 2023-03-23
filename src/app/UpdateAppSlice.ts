import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";

export interface UpdateSlice {
  value: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: UpdateSlice = {
  value: false,
  status: "idle",
};

export const UpdateSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    UpdateApp: (state) => {
      console.log("Updating");
      state.value = true;
    },

    AppisUpdated: (state) => {
      console.log("Updated");
      state.value = false;
    },
  },
});

export const { UpdateApp, AppisUpdated } = UpdateSlice.actions;

export const setUpdatedAppStatus = (state: RootState) => state.isUpdated.value;

export default UpdateSlice.reducer;
