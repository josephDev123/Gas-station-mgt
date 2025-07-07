import { IUser } from "@/types/IUser";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: IUser = {
  id: undefined,
  name: "",
  email: "",
  role: "ATTENDANT",
  profile: {
    id: undefined,
    avatar: "",
    address: "",
    phone_no: "",
  },
};

const User = createSlice({
  name: "User",
  initialState,
  reducers: {
    AddUser: (state: IUser, payload: PayloadAction<IUser>) => {
      return { ...state, payload };
    },
  },
});

export const { AddUser } = User.actions;

export default User.reducer;
