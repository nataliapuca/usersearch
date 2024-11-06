import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { isUserState } from "../components/List/List.types";
import { UserState, TaskState } from "../types/types";

type SourceType = "users" | "tasks";

interface UseDataSelectorReturn {
  items: UserState["users"] | TaskState["tasks"];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalItems: number;
}

export const useDataSelector = (source: SourceType): UseDataSelectorReturn => {
  return useSelector((state: RootState) => {
    const selectedState = state[source];

    const items = isUserState(selectedState)
      ? selectedState.users
      : selectedState.tasks;
    const totalItems = isUserState(selectedState)
      ? selectedState.totalUsers
      : selectedState.totalTasks;

    return {
      items,
      loading: selectedState.loading,
      error: selectedState.error,
      currentPage: selectedState.currentPage,
      totalItems,
    };
  });
};
