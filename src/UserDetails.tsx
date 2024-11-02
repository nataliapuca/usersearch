import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import { Header } from "./components/Header/Header";

function UserDetails() {
  return (
    <Container maxWidth="sm">
      <Header title="User Task Search" />
    </Container>
  );
}

export default UserDetails;
