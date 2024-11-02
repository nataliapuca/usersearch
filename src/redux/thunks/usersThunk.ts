import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormData } from "../../components/Form/Form.types";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ params, page }: { params: FormData; page: number }) => {
    console.log(
      "fetch users called with params page=",
      page,
      "order=",
      params.order,
      "sortby=",
      params.sortBy
    );
    const response = await fetch(
      `https://us-central1-user-search-b9d87.cloudfunctions.net/getUsers?order=${params.order}&page=${page}&sortBy=${params.sortBy}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);
