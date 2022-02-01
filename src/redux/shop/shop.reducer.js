import ShopActionTypes from "./Shop.types";

const INITIAL_STATE = {
  aggregatedList: [],
  list: null,
  limit: 2,
  lastVisible: null,
  imageLoading: false,
  loading: false,
  loadedUrls: [],
  initialLoad: true,
  isDeleting: false,
  redirect: false,
  toggleCarousel: true,
  locationId: [],
  manufacturerLabel: "",
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };

    case ShopActionTypes.FETCH_BICYCLES_SUCCESS:
      return {
        ...state,
        imageLoading: true,
        loading: false,
        initialLoad: false,
        lastVisible: action.payload.lastVisible,
        list: action.payload.list,
        aggregatedList: [...state.aggregatedList, ...action.payload.list],
      };

    case ShopActionTypes.CLEAR_AGGREGATE:
      return {
        ...state,
        aggregatedList: [],
      };

    case ShopActionTypes.FETCH_BICYCLES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case ShopActionTypes.DELETE_BICYCLE_START:
      return {
        ...state,
        isDeleting: true,
      };
    case ShopActionTypes.DELETE_BICYCLE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        deleteMessage: true,
      };
    case ShopActionTypes.GET_DELETE_DEFAULT:
      return {
        ...state,
        deleteMessage: false,
        redirect: true,
      };
    case ShopActionTypes.GET_REDIRECT_DEFAULT:
      return {
        ...state,
        redirect: !state.redirect,
      };
    case ShopActionTypes.GET_MANUFACTURER_LABEL:
      return {
        ...state,
        manufacturerLabel: action.payload,
      };
    case ShopActionTypes.FILTER_BY_LOCATION:
      return {
        ...state,
        locationId: action.payload,
      };
    case ShopActionTypes.TOGGLE_CAROUSEL:
      return {
        ...state,
        toggleCarousel: !state.toggleCarousel,
      };
    case ShopActionTypes.UPDATE_LINK:
      return {
        ...state,
        activeLink: action.payload,
      };

    case ShopActionTypes.GET_LOADED_IMAGES:
      return {
        ...state,
        imageLoading: false,
        loadedUrls: [...state.loadedUrls, ...action.urls],
      };

    default:
      return state;
  }
};
export default shopReducer;
