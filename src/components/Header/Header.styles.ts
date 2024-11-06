import { styled } from "@mui/material/styles";

export const StyledContainer = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "34px",
  marginBottom: "30px",
  color: theme.palette.text.primary,
}));

export const StyledImage = styled("img")({
  maxWidth: "200px",
  maxHeight: "200px",
  width: "100%",
  height: "100%",
  position: "relative",
});
