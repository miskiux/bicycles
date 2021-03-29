import FormActionTypes from "./form.types";

export const FormUpdate = (errors) => ({
  type: FormActionTypes.VALIDATE_FORM,
  payload: errors,
});
