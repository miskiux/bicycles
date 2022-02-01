import { memoizeState } from "src/helpers/MemoizeState";

export const handleInputChange = (state, target) => {
  return memoizeState(state, target);
};

export const validate = (rules, values) => {
  const violations = [];

  const validateField = (key, value) => {
    rules[key].forEach((rule) => {
      if (!rule.isValid(value)) {
        violations.push({
          property: key,
          message: rule.message,
        });
      }
    });
  };

  Object.keys(rules).forEach((key) => validateField(key, values[key]));

  return violations;
};
