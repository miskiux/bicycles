export const RequestTypes = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

export function createRequestTypes(base) {
  return [
    RequestTypes.REQUEST,
    RequestTypes.SUCCESS,
    RequestTypes.FAILURE,
  ].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function action(type, payload = {}) {
  return { type, ...payload };
}
