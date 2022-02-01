import React from "react";
import styles from "./ItemListMenu.module.scss";

export function ItemListMenu(props) {
  return (
    <div className={styles.container}>
      {props.list.map((item, index) => (
        <div key={index} className={styles.item}>
          {item}
        </div>
      ))}
    </div>
  );
}
