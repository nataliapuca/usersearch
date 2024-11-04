import Card from "@mui/material/Card";
import React, { useState } from "react";
import { TaskContainer } from "./TaskCard.styles";
import { Task } from "../../types/types";
import { Checkbox, CircularProgress } from "@mui/material";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../../redux/slices/taskSlice";

export type TaskCardPorops = {
  task: Task;
  collectionId: string | undefined;
};

export const TaskCard = ({ task, collectionId }: TaskCardPorops) => {
  const [loading, setIsLoading] = useState(false);
  console.log("Task update collection id = ", collectionId);
  const dispatch = useDispatch();

  const updateTask = async () => {
    try {
      setIsLoading(true);
      console.log("Task update called with collection id = ", collectionId);

      const taskRef = doc(
        db,
        "users",
        collectionId as string,
        "tasks",
        task.id
      );
      console.log("Task update called with collection id = ", collectionId);

      await updateDoc(taskRef, { status: "resolved" });
      console.log("Task updated successfully!");
      dispatch(updateTaskStatus({ id: task.id, status: "resolved" }));
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };
  return (
    <Card variant="outlined" sx={{ padding: "10px" }}>
      <TaskContainer>
        <div>{task.name}</div>
        {loading ? (
          <CircularProgress size="20px" sx={{ marginRight: "10px" }} />
        ) : (
          <Checkbox
            checked={task.status === "resolved"}
            disabled={task.status === "resolved"}
            onChange={updateTask}
            inputProps={{ "aria-label": "controlled" }}
          />
        )}
      </TaskContainer>
    </Card>
  );
};
