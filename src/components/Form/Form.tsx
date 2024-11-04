import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./Formschema";
import { FormData, FormPropsType, FormType } from "./Form.types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, InputLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { StyledContainer, StyledForm } from "./Form.styles";

export const Form = ({
  type,
  prevFormData,
  setFormData,
  resetResults,
}: FormPropsType) => {
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
    if (prevFormData) {
      reset(prevFormData);
    }
  }, [prevFormData, reset]);

  const onSubmit = (data: FormData) => {
    dispatch(resetResults());
    dispatch(setFormData(data));
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledContainer>
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
                  <MenuItem value="resolved">Completed</MenuItem>
                  <MenuItem value="unresolved">Pending</MenuItem>
                  <MenuItem value="all">All</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        )}
        <Button type="submit" variant="contained">
          ❔
        </Button>
      </StyledContainer>
    </StyledForm>
  );
};
