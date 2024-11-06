import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const UserContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "20px",
  marginRight: "10px",
  marginLeft: "5px",
  justifyContent: "space-between",
});

export const AvatarContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "12px",
});

export const DateContainer = styled("div")({
  color: "gray",
  fontSize: "13px",
});

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: "10px",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.01)",
    boxShadow: theme.shadows[6],
  },
}));
