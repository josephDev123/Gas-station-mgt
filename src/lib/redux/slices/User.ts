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
    avatarMetadata: {
      public_id: "",
    },
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
    unsetUser: () => {
      return initialState;
    },
  },
});

export const { setUser, unsetUser } = User.actions;

export default User.reducer;
