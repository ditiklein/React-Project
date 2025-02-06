import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  products: yup.array().of(yup.string().required("Product name is required")).min(1, "At least one product is required"),
  ingredients: yup.array().of(yup.string().required("Ingredient name is required")).min(1, "At least one ingredient is required"),
  instructions: yup.string().required("Instructions are required"),

});
export default schema;