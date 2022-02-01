import { COLLECTION } from "src/redux/actions/shop/collection";

const STATE = {
  items: [],
  isInitialLoad: true,
  isLoading: false,
  limit: 2,
  hasError: false,
};

export function shopReducer(state = STATE, action) {
  switch (action.type) {
    case COLLECTION.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case COLLECTION.SUCCESS:
      return {
        ...state,
        items: [...state.items, ...action.payload],
        isLoading: false,
        isInitialLoad: false,
      };
    case COLLECTION.FAILURE:
      return {
        ...state,
        hasErrors: true,
        isLoading: false,
        isInitialLoad: false,
      };
    default:
      return state;
  }
}
