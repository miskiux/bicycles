import React from "react";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";

const small = {
  position: "absolute",
  bottom: "20px",
  left: "20px",
  backgroundColor: "#eb4511",
  background: "linear-gradient(315deg, #eb4511 0%, #b02e0c 74%)",
  borderRadius: 3,
  border: 0,
  color: "white",
  height: 48,
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
};

const large = {
  success: {
    position: "relative",
    backgroundColor: " #3bb78f",
    background: "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    width: "100vw",
    padding: "0 30px",
    bottom: "auto",
    boxShadow: "0 3px 5px 2px rgba(59, 183, 143 .3)",
  },
  error: {
    backgroundColor: "#eb4511",
    background: "linear-gradient(315deg, #eb4511 0%, #b02e0c 74%)",
    boxShadow: "0 1px 2px 2px rgba(255, 105, 135, .15)",
  },
};

function CustomSnack({ open, handleClick, name, text }) {
  return (
    <Snackbar
      className={clsx({ MuiSnackbarRoot: "" })}
      open={open}
      //autoHideDuration={000}
      onClose={handleClick}
    >
      <SnackbarContent
        style={
          name === "small"
            ? small
            : {
                ...large.success,
                ...(name === "error" || name === "inputError"
                  ? large.error
                  : {}),
              }
        }
        message={text}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
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
