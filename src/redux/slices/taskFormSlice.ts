import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "../../components/Form/Form.types"; // Adjust the path as necessary

interface FormState {
  formData: FormData | null;
}

const initialState: FormState = {
  formData: null,
};

export const taskFormSlice = createSlice({
  name: "taskForm",
  initialState,
  reducers: {
    setTaskFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
  },
});

export const { setTaskFormData } = taskFormSlice.actions;
export default taskFormSlice.reducer;
