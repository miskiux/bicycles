import React from "react";
import styles from "./AccordionButton.module.scss";

export function AccordionButton(props) {
  const handleClick = () => {
    props.handleClick && props.handleClick();
  };

  return (
    <div className={styles.iconWrapper} onClick={handleClick}>
      {!props.open && <div className={styles.vertical} />}
      <div className={styles.horizontal} />
    </div>
  );
}
