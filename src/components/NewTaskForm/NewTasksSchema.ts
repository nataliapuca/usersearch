import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Empty name is not allowed"),
  status: yup.string().required("You must select status"),
  description: yup.string().required("Empty description is not allowed"),
});
