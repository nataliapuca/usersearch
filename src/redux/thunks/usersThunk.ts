import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormData } from "../../components/Form/Form.types";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    { params, page }: { params: FormData; page: number },
    { rejectWithValue }
  ) => {
    const response = await fetch(
      `https://us-central1-user-search-b9d87.cloudfunctions.net/getUsers?order=${params.order}&page=${page}&sortBy=${params.sortBy}`
    );
    if (!response.ok) {
      console.error("Fetch failed:", response);
      return rejectWithValue("Failed to fetch data. Please try again later.");
    }
    return response.json();
  }
);
