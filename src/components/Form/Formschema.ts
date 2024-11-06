import * as yup from "yup";

export const schema = yup.object().shape({
  sortBy: yup.string().required("You must select a field"),
  order: yup.string().required("You must select a field"),
  filter: yup.string(),
});
