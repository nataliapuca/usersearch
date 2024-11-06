import { styled } from "@mui/material/styles";
import { Paper, Backdrop } from "@mui/material";

export const StyledButton = styled("div")({
  cursor: "pointer",
  position: "absolute",
  right: "13px",
  background: "transparent",
  border: "0",
});

export const StyledModal = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  outline: "none",
  display: "flex",
  flexDirection: "column",
}));

export const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1,
}));
