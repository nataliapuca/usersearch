import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormDataTasks } from "../../components/Form/Form.types";

export const fetchTasks = createAsyncThunk(
  "users/fetchTasks",
  async ({ params, page }: { params: FormDataTasks; page: number }) => {
    console.log(
      "fetch users called with params page=",
      page,
      "order=",
      params.order,
      "sortby=",
      params.sortBy,
      "filter=",
      params.filter
    );
    const response = await fetch(
      `https://us-central1-user-search-b9d87.cloudfunctions.net/getUserTasks?order=${params.order}&page=${page}&sortBy=${params.sortBy}&filter=${params.filter}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);
