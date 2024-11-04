import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { styled } from "@mui/material/styles";
import { Backdrop, Fade, Paper } from "@mui/material";

// Styled components using MUI's styled API
const StyledModal = styled(Paper)(({ theme }) => ({
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

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1,
}));

type CustomModalPropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode; // Allows any vali}
};
const CustomModal = ({
  open,
  handleClose,
  title,
  children,
}: CustomModalPropsType) => {
  return ReactDOM.createPortal(
    <StyledBackdrop open={open} onClick={handleClose}>
      <Fade in={open}>
        <StyledModal onClick={(e) => e.stopPropagation()}>
          <div>{children}</div>
          <button
            onClick={handleClose}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "13px",
              background: "transparent",
              border: "0",
            }}
          >
            ✖️
          </button>
        </StyledModal>
      </Fade>
    </StyledBackdrop>,
    document.body // This will render the modal into the body of the document
  );
};

export default CustomModal;
