import React from "react";
import { styled } from "@mui/material/styles";

// StyledContainer using MUI's styled API
export const StyledContainer = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "34px",
  marginBottom: "30px",
  color: theme.palette.text.primary, // Use the theme for text color
}));

// StyledImage using MUI's styled API
export const StyledImage = styled("img")({
  maxWidth: "200px",
  maxHeight: "200px",
  width: "100%",
  height: "100%",
  position: "relative",
});
