import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import { Header } from "./components/Header/Header";
import { FormType, Form } from "./components/Form/Form";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { fetchTasks } from "./redux/thunks/tasksThunk";
import List from "./components/List/List";

function UserDetails() {
  const { tasks, loading, error, currentPage, totalTasks } = useSelector(
    (state: RootState) => state.tasks
  );
  const formData = useSelector((state: RootState) => state.taskForm.formData);
  console.log(totalTasks, "totalTasks");
  return (
    <Container maxWidth="sm">
      <Header title="User Task Search" />
      <Form type={FormType.Task} prevFormData={formData} />
      <List
        items={tasks}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalItems={totalTasks}
        fetchData={fetchTasks}
        formData={formData}
      />
    </Container>
  );
}

export default UserDetails;
