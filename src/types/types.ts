import { FormData } from "../components/Form/Form.types";

export type User = {
  id: string; // or number, based on your data
  name: string; // Ensure you have the correct fields that your API returns
  surename: string;
  avatar_url?: string;
};

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number; // Track the current page
  totalUsers: number; // Track total number of users
  formData: FormData | null;
}

export type Task = {
  id: string; // or number, based on your data
  name: string; // Ensure you have the correct fields that your API returns
  status: string;
};

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  currentPage: number; // Track the current page
  totalTasks: number; // Track total number of users
  formData: FormData | null;
}
