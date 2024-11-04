import React from "react";
import { useForm, Controller } from "react-hook-form";
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
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { resetTasks } from "../redux/slices/taskSlice";
import { useDispatch } from "react-redux";

type TaskFormData = {
  name: string;
  status: string;
};
interface AddTaskFormProps {
  userId?: string;
  handleClose: () => void;
}
const AddTaskForm: React.FC<AddTaskFormProps> = ({ userId, handleClose }) => {
  const dispatch = useDispatch();

  const addTask = async (
    taskData: { name: string; status: string },
    userId: string
  ) => {
    try {
      const tasksRef = collection(db, "users", userId, "tasks");
      const taskWithTimestamp = {
        ...taskData,
        createdDate: Timestamp.fromDate(new Date()),
      };
      const docRef = await addDoc(tasksRef, taskWithTimestamp);
      console.log("Task added with ID: ", docRef.id);
      //  handleClose();
      return true;
    } catch (error) {
      console.error("Error adding task: ", error);
      return false;
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: { status: "pending" },
  });

  const onSubmit = async (data: TaskFormData) => {
    const taskData = {
      ...data,
      createdDate: Timestamp.fromDate(new Date()),
    };
    const addNewTask = await addTask(taskData, userId!!);
    reset();
    console.log("dupa");
    if (addNewTask) {
      dispatch(resetTasks());
      handleClose();
    } else {
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        padding: "1em",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <Typography variant="h5" component="h2" style={{ marginBottom: "1em" }}>
        Add New Task
      </Typography>

      <Controller
        name="name"
        control={control}
        rules={{ required: "Task name is required" }}
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
      <Alert severity="success">This is a success Alert.</Alert>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Task
      </Button>
    </form>
  );
};

export default AddTaskForm;
