import { Filters } from "src/domain/Shop/Filters/Model/Filters";
import { FilterType } from "src/domain/Shop/Filters/Model/FilterType";
import * as QueryString from "query-string";

export const stringifyUrl = (url) => {
  return QueryString.stringify(url);
};

export const buildQuery = (query) => {
  let executable = [];

  for (const item in query) {
    if (item === Filters.Price) {
      const index = query[item].indexOf("-");

      executable.push({
        type: `item.${FilterType[item]}`,
        value: query[item].substr(0, index),
        sign: ">=",
      });
      executable.push({
        type: `item.${FilterType[item]}`,
        value: query[item].substr(index + 1),
        sign: "<=",
      });
    } else {
      executable.push({ type: item, value: query[item], sign: "==" });
    }
  }

  return {
    executable: executable.filter(({ type }) => type !== "page"),
    page: query.page,
  };
};

export const navigateWithQuery = ({ method = "push", route }, history) => {
  const url = {
    search: QueryString.stringify(route.params),
    pathname: route.path,
  };

  switch (method) {
    case "push":
      history.push(url);
      break;
    case "replace":
      history.replace(url);
      break;
    default:
      break;
  }
};
