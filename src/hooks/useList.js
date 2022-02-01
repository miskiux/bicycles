import { useSelector, useDispatch } from "react-redux";
import { useParamsListener } from "./useParamsListener";
import { buildQuery } from "src/utils/navigation/NavigationUtils";
import { useDeepEffect } from "./useDeepEffect";

export const useList = (selectList, getList, additionalParams) => {
  const { params, query } = useParamsListener();

  const dispatch = useDispatch();

  const list = useSelector(selectList);

  useDeepEffect(() => {
    dispatch(
      getList({
        ...params,
        ...additionalParams,
        query: buildQuery(query),
      })
    );
  }, [query, params]);

  return {
    list,
  };
};
