import ShopActionTypes from "./shop.types";

//fetch actions
export const fetchBicyclesStart = () => ({
  type: ShopActionTypes.FETCH_BICYCLES_START,
});

export const fetchBicyclesSuccess = (bicycleMap) => ({
  type: ShopActionTypes.FETCH_BICYCLES_SUCCESS,
  payload: bicycleMap,
});

export const fetchBicyclesFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_BICYCLES_FAILURE,
  payload: errorMessage,
});

//filter actions
export const getManufacturerLabel = (payload) => ({
  type: ShopActionTypes.GET_MANUFACTURER_LABEL,
  payload,
});

export const filterByLocation = (payload) => ({
  type: ShopActionTypes.FILTER_BY_LOCATION,
  payload,
});

//item-view toggle
export const toggleCarousel = () => ({
  type: ShopActionTypes.TOGGLE_CAROUSEL,
});

//delete actions

export const deleteBicycleStart = (keys) => ({
  type: ShopActionTypes.DELETE_BICYCLE_START,
  payload: keys,
});

export const deleteBicycleSuccess = () => ({
  type: ShopActionTypes.DELETE_BICYCLE_SUCCESS,
});

export const getDeleteDefault = () => ({
  type: ShopActionTypes.GET_DELETE_DEFAULT,
});
export const getRedirectDefault = () => ({
  type: ShopActionTypes.GET_REDIRECT_DEFAULT,
});

//category link update
export const updateLink = (link) => ({
  type: ShopActionTypes.UPDATE_LINK,
  payload: link,
});
