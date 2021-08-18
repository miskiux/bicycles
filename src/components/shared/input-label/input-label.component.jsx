import * as React from "react";
import styles from "./input-label.module.scss";

export function InputLabel({ label }) {
  if (React.isValidElement(label)) {
    return label;
  }

  if (typeof label === "string") {
    return <span>{styles.label}</span>;
  }

  return null;
}
