import { PayloadAction } from "@reduxjs/toolkit";

export type FormData = {
  sortBy: string;
  order: string;
  filter?: string;
};

export enum FormType {
  Task = "task",
  User = "user",
}
export type FormPropsType = {
  type: FormType | null;
  prevFormData: FormData | null;
  setFormData: (data: FormData | null) => PayloadAction<FormData | null>;
  resetResults: () => PayloadAction<undefined>;
};
