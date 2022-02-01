import React from "react";

import { useDispatch } from "react-redux";
import { toggleSidebarMenu } from "src/redux/UI/UI.actions";
import styles from "./Header.module.scss";

export function Header() {
  const dispatch = useDispatch();

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div
          className={styles.sideMenuIcon}
          onClick={() => dispatch(toggleSidebarMenu())}
        >
          <span className={styles.stripe} />
          <span className={styles.stripe} />
        </div>
        <div>
          <h1>bici</h1>
        </div>
        <div>
          <h1>icon</h1>
        </div>
      </div>
    </div>
  );
}
