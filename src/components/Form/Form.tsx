import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./Formschema";
import { FormData } from "./Form.types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../redux/formSlice";
import { RootState } from "../../redux/store"; // Import your RootState type
import { resetUsers } from "../../redux/userSlice"; // Import the reset action
export const Form = () => {
  const dispatch = useDispatch();
  const savedFormData = useSelector((state: RootState) => state.form); // Access stored form data

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      sortBy: "name",
      order: "asc",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Set form values to previously saved state if available
    if (savedFormData.formData) {
      reset(savedFormData.formData);
    }
  }, [savedFormData, reset]);

  const onSubmit = (data: FormData) => {
    dispatch(resetUsers()); // Clear the user list
    dispatch(setFormData(data)); // Save current form data to Redux store
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
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="surename">Surname</MenuItem>
                <MenuItem value="createdDate">Created Date</MenuItem>
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
        <Button type="submit">SEARCH</Button>
      </div>
    </form>
  );
};
