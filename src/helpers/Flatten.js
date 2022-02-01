export const Flatten = function (arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      Flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};
