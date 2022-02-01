import React, { useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import styles from "./ModalContainer.module.scss";
import { CloseModal } from "src/redux/ModalStore/Modal.actions";
import StyleUtils from "src/utils/StyleUtils";

export function ModalContainer(props) {
  const { children } = props;
  const dispatch = useDispatch();
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(CloseModal());
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, dispatch]);

  const containerClasses = () => {
    return StyleUtils.flatten([styles.modalContainer, styles.sizeXL]);
  };

  return (
    <div className={containerClasses()}>
      <div className={styles.modalDialog}>
        <div ref={ref} className={styles.modalContent}>
          {children}
        </div>
      </div>
    </div>
  );
}
