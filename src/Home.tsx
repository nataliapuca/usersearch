import React from "react";
import "./App.css";
import UserList from "./components/UsersList/UserList";
import { Container } from "@mui/material";
import { Header } from "./components/Header/Header";
import { Form } from "./components/Form/Form";

function App() {
  return (
    <Container maxWidth="sm">
      <Header title="Developer Search" />
      <Form />
      <UserList />
    </Container>
  );
}

export default App;
