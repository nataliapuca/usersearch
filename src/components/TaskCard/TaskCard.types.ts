import { Task, User } from "../../types/types";

export type UserCardPorops = {
  user: User;
};

export type TaskCardPorops = {
  task: Task;
  collectionId: string;
};
