import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "../../components/Form/Form.types"; // Adjust the path as necessary

interface FormState {
  formData: FormData | null;
}

const initialState: FormState = {
  formData: null,
};

export const userFormSlice = createSlice({
  name: "userForm",
  initialState,
  reducers: {
    setUsersFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
  },
});

export const { setUsersFormData } = userFormSlice.actions;
export default userFormSlice.reducer;
