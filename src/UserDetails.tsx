import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setTaskFormData } from "./redux/slices/taskSlice";
import { resetTasks } from "./redux/slices/taskSlice";
import { fetchTasks } from "./redux/thunks/tasksThunk";
import { Button, Container } from "@mui/material";
import { Header } from "./components/Header/Header";
import { Form } from "./components/Form/Form";
import List from "./components/List/List";
import { FormType } from "./components/Form/Form.types";
import CustomModal from "./components/Modal/Modal";
import { AddTaskForm } from "./components/NewTaskForm/NewTaskForm";

function UserDetails() {
  const dispatch = useDispatch();
  const { username, id } = useParams();
  const [open, setOpen] = useState(false);
  const formData = useSelector((state: RootState) => state.tasks.formData);

  useEffect(() => {
    dispatch(resetTasks());
    dispatch(setTaskFormData(null));
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Header title={`${username}'s Task Search`} />
      <Form
        type={FormType.Task}
        prevFormData={formData}
        setFormData={setTaskFormData}
        resetResults={resetTasks}
      />
      <Button
        fullWidth
        variant="outlined"
        onClick={handleOpen}
        sx={{ marginBottom: "10px" }}
      >
        Add new task
      </Button>
      {id && (
        <>
          <List
            source="tasks"
            fetchData={fetchTasks}
            formData={formData}
            collectionId={id}
          />
          <CustomModal
            open={open}
            handleClose={handleClose}
            title="Add new task"
          >
            <AddTaskForm userId={id} handleClose={handleClose} />
          </CustomModal>
        </>
      )}
    </Container>
  );
}

export default UserDetails;
