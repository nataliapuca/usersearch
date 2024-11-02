import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import { Header } from "./components/Header/Header";

function NotFoundPage() {
  return (
    <Container maxWidth="sm">
      <Header title="Page not found" />
    </Container>
  );
}

export default NotFoundPage;
