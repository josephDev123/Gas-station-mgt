import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@/types/IUser";
import axios from "axios";

export const fetchUser = createAsyncThunk<
  IUser, // return type
  void, // argument type
  { rejectValue: string }
>("user/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("/api/user/me");
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
