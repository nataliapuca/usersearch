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
    currentPage: 1,
    totalUsers: 0,
    formData: null,
  } as UserState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.currentPage = 1;
      state.totalUsers = 0;
    },
    setUsersFormData: (state, action: PayloadAction<FormData | null>) => {
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
        state.users = [...state.users, ...action.payload.users];
        state.currentPage += 1;
        state.totalUsers = action.payload.totalUsers;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { resetUsers, setUsersFormData } = userSlice.actions;
export default userSlice.reducer;
