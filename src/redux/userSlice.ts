// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormData } from "../components/Form/Form.types";

export type User = {
  id: string; // or number, based on your data
  name: string; // Ensure you have the correct fields that your API returns
  avatar_url?: string;
};

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params: FormData) => {
    const response = await fetch(
      `https://us-central1-user-search-b9d87.cloudfunctions.net/getUsers?order=${params.order}&page=1&sortBy=${params.sortBy}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        console.log("kukuku");
        console.log(state); // Ensure this matches your response structure
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        console.log("ojojoj");

        // state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
