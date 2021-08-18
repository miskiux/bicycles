import React from "react";
import styles from "./card.module.scss";

export function Card({ children, header, actions }) {
  const cardHeader = () => {
    if (!header) return <div />;
    return (
      <div className={styles.headerContainer}>
        <h2>{header}</h2>
        {actions && actions}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {cardHeader()}
      {children}
    </div>
  );
}
