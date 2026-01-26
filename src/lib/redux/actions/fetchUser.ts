import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@/types/IUser";
import axios from "axios";

export const fetchUser = createAsyncThunk<
  IUser, // return type
  void, // argument type
  { rejectValue: string }
>("user/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get<{ data: IUser }>(
      import.meta.env.VITE_BASEURL + "/auth/user",
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    // console.log(res.data);
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
