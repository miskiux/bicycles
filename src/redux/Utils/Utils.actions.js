import UtilsActionTypes from "./Utils.types";

export const GetManufacturerList = () => ({
  type: UtilsActionTypes.GET_MANUFACTURER_LIST,
});

export const ManufacturerListSuccess = (payload) => ({
  type: UtilsActionTypes.ON_MANUFACTURER_LIST_SUCCESS,
  payload,
});
