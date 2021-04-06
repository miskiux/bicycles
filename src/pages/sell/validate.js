export const nameValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
};

export const typeValidation = (fieldName, fieldValue) => {
  let typeRegex = /[a-z]$/.test(fieldValue);
  if (!typeRegex) {
    return `${fieldName} is required`;
  }
};

export const priceValidation = (fieldName, fieldValue) => {
  let numRegex = /^\d*$/.test(fieldValue);
  if (!numRegex) {
    return `${fieldName} is not a number`;
  }
  if (fieldValue.trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
};

export const imageValidation = (fieldValue) => {
  if (!fieldValue.length) {
    return "Please upload bicycle images";
  }
  return null;
};

export const phoneValidation = (fieldValue) => {
  let phoneRegex = /^[+]\d+$/.test(fieldValue);
  if (!phoneRegex) {
    console.log(fieldValue);
    return `Invalid phone number`;
  }
  return null;
};

export const descriptionValidation = (fieldName, fieldValue) => {
  if (!fieldValue.length) return null;
  const items = fieldValue.filter(({ item }) => !item);
  const values = fieldValue.filter(({ value }) => !value);
  console.log(items, values);
  console.log(fieldValue);
  if (items.length || values.length) {
    return `${fieldName} field is empty`;
  }
  return null;
};
