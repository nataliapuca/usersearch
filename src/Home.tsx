import React from "react";
import { useSelector } from "react-redux";
import { setUsersFormData } from "./redux/slices/userSlice";
import { resetUsers } from "./redux/slices/userSlice";
import { RootState } from "./redux/store";
import { fetchUsers } from "./redux/thunks/usersThunk";
import List from "./components/List/List";
import { Header } from "./components/Header/Header";
import { Form } from "./components/Form/Form";
import { FormType } from "./components/Form/Form.types";
import { Container } from "@mui/material";

function Home() {
  const formData = useSelector((state: RootState) => state.users.formData);

  return (
    <Container maxWidth="sm">
      <Header title="Find Developer" />
      <Form
        type={FormType.User}
        prevFormData={formData}
        setFormData={setUsersFormData}
        resetResults={resetUsers}
      />
      <List source="users" fetchData={fetchUsers} formData={formData} />
    </Container>
  );
}

export default Home;
