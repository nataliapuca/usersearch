import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormData } from "../../components/Form/Form.types";

export const fetchTasks = createAsyncThunk(
  "users/fetchTasks",
  async (
    {
      params,
      page,
      id,
    }: {
      params: FormData;
      page: number;
      id?: string;
    },
    { rejectWithValue }
  ) => {
    const response = await fetch(
      `https://us-central1-user-search-b9d87.cloudfunctions.net/getUserTasks?id=${id}&page=${page}&sortBy=${params.sortBy}&order=${params.order}&filter=${params.filter}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        return { tasks: [], totalTasks: -1 };
      }
      console.error("Fetch failed:", response);
      return rejectWithValue("Failed to fetch data. Please try again later.");
    }
    return response.json();
  }
);
