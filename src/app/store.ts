import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AddLineSlice from "../components/addLineLabel/AddLineSlice";
import DeleteSlice from "../components/deleteLineLabel/DeleteSlice";
import EditSlice from "../components/editCellLabel/EditSlice";
import LoginReducer from "../components/loginpage/LoginSlice";
import UpdateSlice from "./UpdateAppSlice";

export const store = configureStore({
  reducer: {
    islogged: LoginReducer,
    isEditing: EditSlice,
    isUpdated: UpdateSlice,
    isDeleting: DeleteSlice,
    isAddingLine: AddLineSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
