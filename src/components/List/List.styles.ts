import { styled, keyframes } from "@mui/material/styles";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledList = styled("ul")({
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const StyledListItem = styled("li")(({ theme }) => ({
  marginBottom: "16px",
  listStyle: "none",
  opacity: 0,
  animation: `${fadeIn} 0.5s ${theme.transitions.easing.easeInOut} forwards`,
}));

export const ObserverBar = styled("div")({
  height: "1px",
});

export const InfoBar = styled("div")({
  textAlign: "center",
  marginBottom: "20px",
  color: "gray",
});
