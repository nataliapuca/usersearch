import React from "react";
import "./App.css";
import List from "./components/List/List";
import { Container } from "@mui/material";
import { Header } from "./components/Header/Header";
import { FormType, Form } from "./components/Form/Form";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { fetchUsers } from "./redux/thunks/usersThunk";

function Home() {
  const { users, loading, error, currentPage, totalUsers } = useSelector(
    (state: RootState) => state.users
  );

  const formData = useSelector((state: RootState) => state.userForm.formData);

  return (
    <Container maxWidth="sm">
      <Header title="Developer Search" />
      <Form type={FormType.User} prevFormData={formData} />
      <List
        items={users}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalItems={totalUsers}
        fetchData={fetchUsers}
        formData={formData}
      />
    </Container>
  );
}

export default Home;
