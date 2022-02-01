import UIActionTypes from "./UI.types";

const INITIAL_STATE = {
  auto_dropdown: false,
  sidebar_menu: false,
};

const UIReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UIActionTypes.TOGGLE_AUTOCOMPLETE_DROPDOWN:
      return {
        ...state,
        auto_dropdown: !state.auto_dropdown,
      };
    case UIActionTypes.TOGGLE_SIDEBAR_MENU:
      return {
        ...state,
        sidebar_menu: !state.sidebar_menu,
      };

    default:
      return state;
  }
};

export default UIReducer;
