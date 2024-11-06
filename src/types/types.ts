import { FormData } from "../components/Form/Form.types";

export type User = {
  id: string;
  name: string;
  surename: string;
  avatar_url?: string;
  createdDate: { _seconds: number; _nanoseconds: number };
};

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalUsers: number;
  formData: FormData | null;
}

export type Task = {
  id: string;
  name: string;
  status: string;
  createdDate: { _seconds: number; _nanoseconds: number };
};

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalTasks: number;
  formData: FormData | null;
}
