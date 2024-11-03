import Card from "@mui/material/Card";
import React from "react";
import { TaskContainer } from "./TaskCard.styles";
import { Task } from "../../types/types";

export type TaskCardPorops = {
  task: Task;
};

export const TaskCard = ({ task }: TaskCardPorops) => {
  return (
    <Card variant="outlined" sx={{ padding: "10px" }}>
      <TaskContainer>
        <div>
          {task.name} {task.status}
        </div>
      </TaskContainer>
    </Card>
  );
};
