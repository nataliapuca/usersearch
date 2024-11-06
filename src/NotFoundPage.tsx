import React from "react";
import { Header } from "./components/Header/Header";
import { Container } from "@mui/material";

function NotFoundPage() {
  return (
    <Container maxWidth="sm">
      <Header title="Page not found" />
    </Container>
  );
}

export default NotFoundPage;
