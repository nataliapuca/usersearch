import { styled } from "@mui/material/styles";

export const TaskContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "20px",
  justifyContent: "space-between",
  height: "40px",
  paddingLeft: "10px",
  paddingRight: "10px",
});

export const TickContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "12px",
  color: "gray",
  fontSize: "13px",
});
