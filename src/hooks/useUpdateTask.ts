import { useState } from "react";
import { useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { updateTaskStatus } from "../redux/slices/taskSlice";
import { AppDispatch } from "../redux/store";

interface UseUpdateTaskParams {
  taskId: string;
  collectionId: string;
}

export const useUpdateTask = ({
  taskId,
  collectionId,
}: UseUpdateTaskParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const updateTask = async () => {
    try {
      setIsLoading(true);
      const taskRef = doc(db, "users", collectionId, "tasks", taskId);

      await updateDoc(taskRef, { status: "resolved" });
      setHasError(false);

      dispatch(updateTaskStatus({ id: taskId, status: "resolved" }));
    } catch (error) {
      console.error("Error updating task: ", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateTask, isLoading, hasError };
};
