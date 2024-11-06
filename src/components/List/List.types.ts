import { AsyncThunkAction } from "@reduxjs/toolkit";
import { Task, TaskState, User, UserState } from "../../types/types";
import { FormData } from "../Form/Form.types";

export type FetchDataType = {
  page: number;
  params: FormData;
  id?: string;
};

export type ListProps = {
  fetchData: (args: FetchDataType) => AsyncThunkAction<any, FetchDataType, any>;
  formData: FormData | null;
  collectionId?: string;
  source: "users" | "tasks";
};

export function isUser(item: User | Task): item is User {
  return (item as User).surename !== undefined;
}

export const isUserState = (
  state: UserState | TaskState
): state is UserState => {
  return (state as UserState).users !== undefined;
};
