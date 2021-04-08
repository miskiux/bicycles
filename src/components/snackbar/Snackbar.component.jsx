import React from "react";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    position: ({ name }) => (name === "deleteMessage" ? "relative" : ""),
    color: ({ color }) =>
      color === "success" ? "rgba(0, 177, 106, 1)" : "rgba(244,92,67, 1)",
    height: 100,
    minWidth: 130,
    backgroundColor: ({ color }) =>
      color === "success"
        ? "rgba(104, 195, 163, 0.5)"
        : "rgba(244,92,67, 0.36)",
    opacity: 1,
  },
  action: ({ name }) =>
    name === "deleteMessage"
      ? {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          padding: 0,
        }
      : {
          display: "flex",
          width: 100 + "%",
          justifyContent: "space-between",
        },
});

function CustomSnack({ open, handleClick, name, text, color }) {
  const classes = useStyles({ name, color });

  return (
    <Snackbar
      className={classes.root}
      open={open}
      autoHideDuration={4000}
      onClose={handleClick}
    >
      <SnackbarContent
        classes={{ root: classes.root, action: classes.action }}
        action={
          <React.Fragment>
            <h3 style={{ fontSize: "1.5rem" }}>{text}</h3>
            <IconButton
              size="small"
              aria-label="close"
              color="black"
              onClick={handleClick}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Snackbar>
  );
}

export default CustomSnack;
