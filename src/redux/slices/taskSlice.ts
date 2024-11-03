// src/redux/userSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskState } from "../../types/types";
import { fetchTasks } from "../thunks/tasksThunk";
import { FormData } from "../../components/Form/Form.types";

const userSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    currentPage: 1, // Start at page 1
    totalTasks: 0, // Initial total users count
    formData: null,
  } as TaskState,
  reducers: {
    resetTasks: (state) => {
      state.tasks = []; // Clear the user list
      state.currentPage = 1; // Reset current page to 1
      state.totalTasks = 0; // Reset total users count
    },
    setTaskFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [...state.tasks, ...action.payload.tasks]; // Append new users
        state.currentPage += 1; // Increment current page
        state.totalTasks = action.payload.totalTasks; // Assuming your API provides total users count
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        console.log("ojojoj");

        // state.error = action.error.message;
      });
  },
});
export const { resetTasks, setTaskFormData } = userSlice.actions;
export default userSlice.reducer;
