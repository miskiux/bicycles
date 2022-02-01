import ShopActionTypes from "./Shop.types";

//fetch actions
export const getList = (payload) => ({
  type: ShopActionTypes.GET_LIST,
  payload,
});

export const nextPage = () => ({
  type: ShopActionTypes.NEXT_PAGE,
});

export const fetchBicyclesSuccess = (bicycleMap) => ({
  type: ShopActionTypes.FETCH_BICYCLES_SUCCESS,
  payload: bicycleMap,
});

export const getLoadedImages = (urls) => ({
  type: ShopActionTypes.GET_LOADED_IMAGES,
  urls,
});

export const clearAggregatedList = () => ({
  type: ShopActionTypes.CLEAR_AGGREGATE,
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

export const updateLink = (link) => ({
  type: ShopActionTypes.UPDATE_LINK,
  payload: link,
});
