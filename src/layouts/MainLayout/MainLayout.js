import React from "react";

import styles from "./MainLayout.module.scss";

export function MainLayout(props) {
  const { children } = props;

  return (
    <div className={styles.mainLayout}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
