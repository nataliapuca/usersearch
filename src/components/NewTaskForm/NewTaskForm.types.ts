export type TaskFormData = {
  name: string;
  status: string;
  description: string;
};

export interface AddTaskFormProps {
  userId: string;
  handleClose: () => void;
}
