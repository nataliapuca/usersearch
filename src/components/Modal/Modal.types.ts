import { ReactNode } from "react";

export type CustomModalPropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode;
};
