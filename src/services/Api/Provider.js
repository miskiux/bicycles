import axios from "axios";

const getManufacturerList = (resource) => {
  return axios
    .get(
      `https://bikeindex.org/api/v3/manufacturers?page=${resource}&per_page=100`
    )
    .then((data) => data)
    .catch((error) => {
      console.log(error);
      throw Error;
    });
};

export const apiProvider = {
  getManufacturerList,
};
