import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormData } from "../../components/Form/Form.types";

export const fetchTasks = createAsyncThunk(
  "users/fetchTasks",
  async ({
    params,
    page,
    id,
  }: {
    params: FormData;
    page: number;
    id?: string;
  }) => {
    console.log(
      "fetch tasks called with params page=",
      page,
      "order=",
      params.order,
      "sortby=",
      params.sortBy,
      "filter=",
      params.filter,
      "collection id=",
      id
    );
    const response = await fetch(
      `https://us-central1-user-search-b9d87.cloudfunctions.net/getUserTasks?id=${id}&page=${page}&sortBy=${params.sortBy}&order=${params.order}&filter=${params.filter}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);
