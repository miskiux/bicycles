export const LocationConverter = (response) => {
  return {
    address: response.features[0].place_name,
  };
};
