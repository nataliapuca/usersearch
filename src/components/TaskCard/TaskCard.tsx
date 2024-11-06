import React from "react";
import Card from "@mui/material/Card";
import { TaskContainer, TickContainer } from "./TaskCard.styles";
import { Alert, Checkbox, CircularProgress } from "@mui/material";
import { TaskCardPorops } from "./TaskCard.types";
import useFormattedDate from "../../hooks/useFormattedDate";
import { useUpdateTask } from "../../hooks/useUpdateTask";

export const TaskCard = ({ task, collectionId }: TaskCardPorops) => {
  const formattedDate = useFormattedDate(task.createdDate);

  const { updateTask, isLoading, hasError } = useUpdateTask({
    taskId: task.id,
    collectionId,
  });

  return (
    <Card variant="outlined" sx={{ padding: "10px" }}>
      <TaskContainer>
        <div>{task.name}</div>
        <TickContainer>
          {formattedDate}
          {isLoading ? (
            <CircularProgress
              size="20px"
              sx={{ marginRight: "10px", marginLeft: "12px" }}
            />
          ) : (
            <Checkbox
              checked={task.status === "resolved"}
              disabled={task.status === "resolved"}
              onChange={updateTask}
              inputProps={{ "aria-label": "controlled" }}
            />
          )}
        </TickContainer>
      </TaskContainer>
      {hasError && <Alert severity="error"> Sorry, something went wrong</Alert>}
    </Card>
  );
};
