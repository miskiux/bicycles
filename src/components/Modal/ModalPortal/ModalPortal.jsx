import React from "react";
import { useSelector } from "react-redux";
import { Portal } from "../../Portal/portal";
import { ModalContainer } from "../ModalContainer/ModalContainer";

export function ModalPortal(props) {
  const { children, modal } = props;

  const activeModal = useSelector((state) => state.modal.active);

  if (activeModal !== modal) {
    return null;
  }

  return (
    <Portal selector="modal-root">
      <ModalContainer>{children}</ModalContainer>
    </Portal>
  );
}
