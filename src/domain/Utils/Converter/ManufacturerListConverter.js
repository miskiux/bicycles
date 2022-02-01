import { v4 as uuidv4 } from "uuid";
import { Flatten } from "src/helpers/Flatten";

export const ManufacturerListConverter = (responses) => {
  return Flatten(responses.map(({ data }) => [...data.manufacturers])).map(
    (item) => ({
      label: item.name,
      key: uuidv4().substr(0, 4),
    })
  );
};
