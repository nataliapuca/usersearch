import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { resetTasks } from "../redux/slices/taskSlice";

interface TaskData {
  name: string;
  status: string;
  description: string;
}

const useAddTask = (userId: string) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addTask = async (taskData: TaskData) => {
    setLoading(true);
    setError(null);

    try {
      const tasksRef = collection(db, "users", userId, "tasks");
      const taskWithTimestamp = {
        ...taskData,
        createdDate: Timestamp.fromDate(new Date()),
      };
      await addDoc(tasksRef, taskWithTimestamp);
      setSuccess(true);
      dispatch(resetTasks());
      return true;
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add task");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetStatus = () => {
    setSuccess(false);
    setError(null);
  };

  return { addTask, loading, error, success, resetStatus };
};

export default useAddTask;
