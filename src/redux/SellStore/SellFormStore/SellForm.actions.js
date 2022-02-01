import SellFormTypes from "./SellForm.types";

//fetch actions
export const handleInputChange = (payload) => ({
  type: SellFormTypes.INPUT_CHANGE,
  payload: payload,
});

export const setFormStep = (step) => ({
  type: SellFormTypes.SET_STEP,
  step,
});

export const setMarker = () => ({
  type: SellFormTypes.SET_MAP_MARKER,
});

export const getManufacturerListStart = () => ({
  type: SellFormTypes.GET_MANUFACTURER_LIST_START,
});

export const getManufacturerListFinish = (list) => ({
  type: SellFormTypes.GET_MANUFACTURER_LIST_FINISH,
  list,
});

export const cleanUp = () => ({
  type: SellFormTypes.CLEAN_UP,
});

export const validateAllFields = () => ({
  type: SellFormTypes.VALIDATE_ALL_FIELDS,
});
