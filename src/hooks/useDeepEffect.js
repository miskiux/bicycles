import { useEffect, useRef } from "react";
import isEqual from "lodash.isequal";

export function useDeepEffect(func, deps = []) {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isSame = prevDeps.current.every((obj, index) =>
      isEqual(obj, deps[index])
    );

    if (isFirst.current || !isSame) {
      func();
    }

    isFirst.current = false;
    prevDeps.current = deps;
  }, [deps]);
}
