import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./slices/User";

export const rootReducer = combineReducers({
  user: UserSlice,
});
