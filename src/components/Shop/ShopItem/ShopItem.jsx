import React from "react";
import styles from "./ShopItem.module.scss";

export function ShopItem({ item }) {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <img alt="shopItem" src={item.url[0]} className={styles.itemImage} />
      </div>
    </div>
  );
}
