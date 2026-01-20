import { IUser } from "@/types/IUser";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "../actions/fetchUser";

const initialState: IUser & {
  loading: boolean;
  error?: string;
} = {
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
  loading: false,
};

const User = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (
      state: IUser,
      action: PayloadAction<IUser & { loading: boolean; error?: string }>,
    ) => {
      return { ...state, ...action.payload };
    },
    unsetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        return { ...state, ...action.payload };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, unsetUser } = User.actions;

export default User.reducer;
