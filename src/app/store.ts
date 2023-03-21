import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import LoginReducer from "../components/loginpage/LoginSlice";

export const store = configureStore({
  reducer: {
    islogged: LoginReducer,
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
