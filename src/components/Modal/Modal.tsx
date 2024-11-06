import React from "react";
import ReactDOM from "react-dom";
import { CustomModalPropsType } from "./Modal.types";
import { Fade } from "@mui/material";
import { StyledBackdrop, StyledButton, StyledModal } from "./Modal.styles";

const CustomModal = ({ open, handleClose, children }: CustomModalPropsType) => {
  return ReactDOM.createPortal(
    <StyledBackdrop open={open} onClick={handleClose}>
      <Fade in={open}>
        <StyledModal onClick={(e) => e.stopPropagation()}>
          <div>{children}</div>
          <StyledButton onClick={handleClose}>✖️</StyledButton>
        </StyledModal>
      </Fade>
    </StyledBackdrop>,
    document.body
  );
};

export default CustomModal;
