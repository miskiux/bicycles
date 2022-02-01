import * as common from "src/redux/actions/common";

const { RequestTypes, createRequestTypes, action } = common;

export const COLLECTION = createRequestTypes("COLLECTION");

export const collection = {
  request: (urlParams) =>
    action(COLLECTION[RequestTypes.REQUEST], { urlParams }),
  success: (payload) => action(COLLECTION[RequestTypes.SUCCESS], { payload }),
  failure: (error) => action(COLLECTION[RequestTypes.FAILURE], { error }),
};
