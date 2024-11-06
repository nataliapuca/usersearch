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
    currentPage: 1,
    totalTasks: 0,
    formData: null,
  } as TaskState,
  reducers: {
    resetTasks: (state) => {
      state.tasks = [];
      state.currentPage = 1;
      state.totalTasks = 0;
    },
    setTaskFormData: (state, action: PayloadAction<FormData | null>) => {
      state.formData = action.payload;
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = status;
      }
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
        state.tasks = [...state.tasks, ...action.payload.tasks];
        state.currentPage += 1;
        state.totalTasks = action.payload.totalTasks;
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks.";
      });
  },
});
export const { resetTasks, setTaskFormData, updateTaskStatus } =
  userSlice.actions;
export default userSlice.reducer;
