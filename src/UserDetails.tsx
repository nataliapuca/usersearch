import React, { useState } from "react";
import "./App.css";
import { Button, Container } from "@mui/material";
import { Header } from "./components/Header/Header";
import { Form } from "./components/Form/Form";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { fetchTasks } from "./redux/thunks/tasksThunk";
import List from "./components/List/List";
import { setTaskFormData } from "./redux/slices/taskSlice";
import { resetTasks } from "./redux/slices/taskSlice"; // Import the reset action
import { FormType } from "./components/Form/Form.types";
import CustomModal from "./components/Modal/Modal";
import AddTaskForm from "./components/NewTaskForm";
import { useParams } from "react-router-dom";

function UserDetails() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { tasks, loading, error, currentPage, totalTasks } = useSelector(
    (state: RootState) => state.tasks
  );
  const formData = useSelector((state: RootState) => state.tasks.formData);
  console.log(totalTasks, "totalTasks");
  const { username, id } = useParams();
  console.log(id, " id on user details page");

  return (
    <Container maxWidth="sm">
      <Header title={`${username}'s Task Search`} />
      <Form
        type={FormType.Task}
        prevFormData={formData}
        setFormData={setTaskFormData}
        resetResults={resetTasks}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <Button fullWidth variant="outlined" onClick={handleOpen}>
          Add new task
        </Button>
      </div>

      <List
        items={tasks}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalItems={totalTasks}
        fetchData={fetchTasks}
        formData={formData}
        collectionId={id}
      />

      <CustomModal open={open} handleClose={handleClose} title="Add new task">
        <AddTaskForm userId={id} handleClose={handleClose} />
      </CustomModal>
    </Container>
  );
}

export default UserDetails;
