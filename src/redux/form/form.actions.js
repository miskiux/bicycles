import FormActionTypes from "./form.types";

export const FormUpdate = (data) => ({
  type: FormActionTypes.UPDATE_FORM,
  payload: data,
});
