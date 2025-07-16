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
    setUser: (state: IUser, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = User.actions;

export default User.reducer;
