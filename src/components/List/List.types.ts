import { AsyncThunkAction } from "@reduxjs/toolkit";
import { Task, User } from "../../types/types";
import { FormData } from "../Form/Form.types";

export type FetchDataType = {
  page: number;
  params: FormData;
  id?: string;
};

export type ListProps = {
  items: Array<User | Task>;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalItems: number;
  fetchData: (args: FetchDataType) => AsyncThunkAction<any, FetchDataType, any>; // Updated prop type
  formData: FormData | null;
  collectionId?: string | undefined;
};

export function isUser(item: User | Task): item is User {
  return (item as User).surename !== undefined;
}
