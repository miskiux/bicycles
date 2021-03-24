import axios from "axios";

export const getManufacturerData = () => {
  let page = 1;
  let hintArray = [];
  let maxItter = 15;

  do {
    try {
      axios
        .get(
          `https://bikeindex.org/api/v3/manufacturers?page=${page}&per_page=100`
        )
        .then((response) => {
          let manufacturerNames = Object.values(response.data).map((res) =>
            res.map((manufacturer) => manufacturer.name)
          );
          let unnestedNames = manufacturerNames.flat();
          hintArray.push(...unnestedNames);
        });
      page++;
      maxItter--;
    } catch (err) {
      console.error(`Oeps, something is wrong ${err}`);
    }
  } while (maxItter > 0);
  return hintArray;
};
