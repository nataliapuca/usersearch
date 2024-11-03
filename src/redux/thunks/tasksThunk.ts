import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormData } from "../../components/Form/Form.types";

export const fetchTasks = createAsyncThunk(
  "users/fetchTasks",
  async ({ params, page }: { params: FormData; page: number }) => {
    console.log(
      "fetch tasks called with params page=",
      page,
      "order=",
      params.order,
      "sortby=",
      params.sortBy,
      "filter=",
      params.filter
    );
    const response = await fetch(
      //`https://us-central1-user-search-b9d87.cloudfunctions.net/getUserTasks?order=${params.order}&page=${page}&sortBy=${params.sortBy}&filter=${params.filter}&id=KbUT0To2npU3FZBVyZ6x`
      `https://us-central1-user-search-b9d87.cloudfunctions.net/getUserTasks?id=KbUT0To2npU3FZBVyZ6x`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);
