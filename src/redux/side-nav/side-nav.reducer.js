import SideNavActionTypes from "./side-nav.types";
import { addItemToFavourite } from "./favourite.utils";

const INITIAL_STATE = {
  account_dropdown: false,
  modal: false,
  favouriteItems: [],
};

const sideNavReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SideNavActionTypes.TOGGLE_ACCOUNT_DROPDOWN:
      return {
        ...state,
        account_dropdown: !state.account_dropdown,
      };
    case SideNavActionTypes.TOGGLE_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case SideNavActionTypes.ADD_ITEM:
      return {
        ...state,
        favouriteItems: addItemToFavourite(
          state.favouriteItems,
          action.payload
        ),
      };
    case SideNavActionTypes.CLEAR_ITEM_FROM_FAVOURITES:
      return {
        ...state,
        favouriteItems: state.favouriteItems.filter(
          (favouriteItem) => favouriteItem.id !== action.payload
        ),
      };
    case SideNavActionTypes.CLEAR_FAVOURITES:
      return {
        ...state,
        favouriteItems: [],
      };
    default:
      return state;
  }
};

export default sideNavReducer;
