export const validObjectFilter = (obj) => {
  return Object.keys(obj)
    .filter((key) => !!obj[key])
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
};
