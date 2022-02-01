import { typeValidation } from "./ValidationUtils";

export const rules = {
  required: {
    isValid: (value) => typeValidation(value),
    message: "This value should not be blank.",
  },
};
