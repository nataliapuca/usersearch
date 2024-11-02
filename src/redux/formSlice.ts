import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "../components/Form/Form.types"; // Adjust the path as necessary

interface FormState {
  formData: FormData | null;
}

const initialState: FormState = {
  formData: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
