import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./Formschema";
import { FormData } from "./Form.types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUsersFormData } from "../../redux/slices/userFormSlice";
import { setTaskFormData } from "../../redux/slices/taskFormSlice";
import { resetUsers } from "../../redux/slices/userSlice"; // Import the reset action
import { resetTasks } from "../../redux/slices/taskSlice"; // Import the reset action

export enum FormType {
  Task = "task",
  User = "user",
}
type FormPropsType = {
  type: FormType;
  prevFormData: FormData | null;
};

export const Form = ({ type, prevFormData }: FormPropsType) => {
  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      sortBy: "createdDate",
      order: "asc",
      filter: "all",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Set form values to previously saved state if available
    if (prevFormData) {
      reset(prevFormData);
    }
  }, [prevFormData, reset]);

  const onSubmit = (data: FormData) => {
    dispatch(resetTasks()); // Clear the user list
    dispatch(resetUsers());
    if (type === FormType.User) {
      dispatch(setUsersFormData(data)); // Save current form data to Redux store
    } else {
      dispatch(setTaskFormData(data)); // Save current form data to Redux store
    }
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "20px",
          paddingRight: "10px",
        }}
      >
        <FormControl fullWidth error={!!errors.sortBy}>
          <InputLabel>Sort By</InputLabel>
          <Controller
            name="sortBy"
            control={control}
            render={({ field }) => (
              <Select
                label="Sort By"
                fullWidth
                error={!!errors.sortBy}
                onChange={(e) => field.onChange(e)}
                value={field.value}
                inputProps={{ name: field.name }}
              >
                <MenuItem value="createdDate">Created Date</MenuItem>
                {type === FormType.User ? (
                  <MenuItem value="name">Name</MenuItem>
                ) : (
                  <MenuItem value="description">Description</MenuItem>
                )}
              </Select>
            )}
          />
        </FormControl>
        {errors.sortBy && (
          <p style={{ color: "red" }}>{errors.sortBy.message}</p>
        )}

        <FormControl fullWidth error={!!errors.order}>
          <InputLabel>Order</InputLabel>
          <Controller
            name="order"
            control={control}
            render={({ field }) => (
              <Select
                label="Order"
                fullWidth
                error={!!errors.order}
                onChange={(e) => field.onChange(e)}
                value={field.value}
                inputProps={{ name: field.name }}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        {type === FormType.Task && (
          <FormControl fullWidth>
            <InputLabel>Filter</InputLabel>
            <Controller
              name="filter"
              control={control}
              render={({ field }) => (
                <Select label="Filter" fullWidth {...field}>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="all">All</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        )}
        <Button type="submit">SEARCH</Button>
      </div>
    </form>
  );
};
