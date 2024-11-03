// src/redux/userSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types/types";
import { fetchUsers } from "../thunks/usersThunk";
import { FormData } from "../../components/Form/Form.types";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    currentPage: 1, // Start at page 1
    totalUsers: 0, // Initial total users count
    formData: null,
  } as UserState,
  reducers: {
    resetUsers: (state) => {
      state.users = []; // Clear the user list
      state.currentPage = 1; // Reset current page to 1
      state.totalUsers = 0; // Reset total users count
    },
    setUsersFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, ...action.payload.users]; // Append new users
        state.currentPage += 1; // Increment current page
        state.totalUsers = action.payload.totalUsers; // Assuming your API provides total users count
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        console.log("ojojoj");

        // state.error = action.error.message;
      });
  },
});
export const { resetUsers, setUsersFormData } = userSlice.actions;
export default userSlice.reducer;
