import * as common from "src/redux/actions/common";

const { RequestTypes, createRequestTypes, action } = common;

const ITEM_DELETION = createRequestTypes("ITEM_DELETION");

export const itemDeletion = {
  request: (keys) => action(ITEM_DELETION[RequestTypes.REQUEST], { keys }),
  success: () => action(ITEM_DELETION[RequestTypes.SUCCESS]),
  failure: (error) => action(ITEM_DELETION[RequestTypes.FAILURE], { error }),
};
