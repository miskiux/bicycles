import React from "react";
import styles from "./Paginator.module.scss";
import { Pagination } from "@mui/material";

export function Paginator(props) {
  const handleChange = (_, page) => {
    props.onChange(page);
  };

  return (
    <Pagination
      className={styles.paginator}
      onChange={handleChange}
      page={props.currentPage}
      count={props.count}
      size="small"
    />
  );
}
