import { ModalControlTypes } from "./Modal.types";

export const OpenModal = (name) => ({
  type: ModalControlTypes.OPEN_MODAL,
  name,
});

export const CloseModal = () => ({
  type: ModalControlTypes.CLOSE_MODAL,
});
