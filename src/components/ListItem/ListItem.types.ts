import { Task, User } from "../../types/types";

export interface ListItemComponentProps {
  item: User | Task;
  collectionId: string | undefined;
}
