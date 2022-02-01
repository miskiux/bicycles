// making it faster by memoizing the previous result, on input addition, and on deletion retrieving the initial data

export const FilterOptions = (key, data) => {
  let filteredOptions = [];

  data.forEach((option) => {
    if (
      key.toLowerCase() === option.label.toLowerCase().substring(0, key.length)
    ) {
      return filteredOptions.includes(option.label)
        ? undefined
        : filteredOptions.push(option);
    }
  });

  return filteredOptions;
};
