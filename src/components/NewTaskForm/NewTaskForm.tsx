import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Timestamp } from "firebase/firestore";
import { yupResolver } from "@hookform/resolvers/yup";
import useAddTask from "../../hooks/useAddTask";
import { AddTaskFormProps, TaskFormData } from "./NewTaskForm.types";
import {
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Typography,
  Alert,
} from "@mui/material";
import { FormContainer } from "./NewTaskForm.styles";
import { schema } from "./NewTasksSchema";

export const AddTaskForm = ({ userId, handleClose }: AddTaskFormProps) => {
  const { addTask, loading, error, success, resetStatus } = useAddTask(userId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: { name: "", status: "unresolved", description: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: TaskFormData) => {
    const taskData = { ...data, createdDate: Timestamp.fromDate(new Date()) };
    const addNewTask = await addTask(taskData);

    if (addNewTask) {
      reset();
      setTimeout(() => {
        resetStatus();
        handleClose();
      }, 3000);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h2" style={{ marginBottom: "1em" }}>
        Add New Task
      </Typography>

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Task Name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
            style={{ marginBottom: "1em" }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            multiline
            {...field}
            label="Description"
            fullWidth
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
            style={{ marginBottom: "1em" }}
          />
        )}
      />

      <FormControl component="fieldset" style={{ marginBottom: "1em" }}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel
                value="unresolved"
                control={<Radio />}
                label="Pending"
              />
              <FormControlLabel
                value="resolved"
                control={<Radio />}
                label="Resolved"
              />
            </RadioGroup>
          )}
        />
      </FormControl>

      {success && <Alert severity="success">Task added successfully.</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Task"}
      </Button>
    </FormContainer>
  );
};
