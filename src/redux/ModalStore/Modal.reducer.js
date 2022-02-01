import { ModalControlTypes } from "./Modal.types";

const INITIAL_STATE = {
  active: "",
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ModalControlTypes.OPEN_MODAL:
      return {
        active: action.name,
      };
    case ModalControlTypes.CLOSE_MODAL:
      return {
        active: "",
      };

    default:
      return state;
  }
};

export default modalReducer;
