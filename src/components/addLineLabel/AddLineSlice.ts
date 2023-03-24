import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface AddLineSlice {
  value: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: AddLineSlice = {
  value: false,
  status: "idle",
};

export const AddLineSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    OpenAddLineMenu: (state) => {
      state.value = true;
    },
    CloseAddLineMenu: (state) => {
      state.value = false;
    },
  },
});

export const { OpenAddLineMenu, CloseAddLineMenu } = AddLineSlice.actions;

export const setAddLineMenuStatus = (state: RootState) =>
  state.isAddingLine.value;

export default AddLineSlice.reducer;
