import { useParams, useHistory } from "react-router-dom";
import * as QueryString from "query-string";

export const useParamsListener = () => {
  const params = useParams();
  const { location } = useHistory();

  return {
    params: params,
    query: QueryString.parse(location.search),
  };
};
