import React from "react";
import PropTypes from "prop-types";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// const small = {
//   position: "absolute",
//   bottom: "20px",
//   left: "20px",
//   backgroundColor: "#eb4511",
//   background: "linear-gradient(315deg, #eb4511 0%, #b02e0c 74%)",
//   borderRadius: 3,
//   border: 0,
//   color: "white",
//   height: 48,
//   padding: "0 30px",
//   boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
// };
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    position: ({ name }) =>
      name === "deleteMessage" ? "relative" : "absolute",
    color: ({ color }) =>
      color === "success" ? "rgba(0, 177, 106, 1)" : "rgba(244,92,67, 1)",
    height: 100,
    backgroundColor: ({ color }) =>
      color === "success"
        ? "rgba(104, 195, 163, 0.5)"
        : "rgba(244,92,67, 0.36)",
    opacity: 1,
  },
  action: ({ name }) =>
    name === "deleteMessage"
      ? {
          position: "absolute",
          display: "block",
          top: 25 + "%",
          left: 50 + "%",
          transform: "translateX(-50%) translateY(-50%)",
          paddingLeft: 0,
        }
      : {
          display: "flex",
          width: 100 + "%",
          justifyContent: "space-between",
        },
});

//overrides: {
// Style sheet name ⚛️
//MuiSnackbar: {
// Name of the rule
// root: {
//   position: "relative",
//   display: "flex",
//   backgroundColor: " #3bb78f",
//   background: "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)",
//   borderRadius: 3,
//   border: 0,
//   color: "white",
//   height: 60,
//   width: "24vw",
//   padding: "0 30px",
//   bottom: "auto",
//   boxShadow: "0 3px 5px 2px rgba(59, 183, 143 .3)",

// const large = {
//   success: {
//     position: "relative",
//     backgroundColor: " #3bb78f",
//     background: "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)",
//     borderRadius: 3,
//     border: 0,
//     color: "white",
//     height: 48,
//     width: "24vw",
//     padding: "0 30px",
//     bottom: "auto",
//     boxShadow: "0 3px 5px 2px rgba(59, 183, 143 .3)",
//   },
//   error: {
//     backgroundColor: "#eb4511",
//     background: "linear-gradient(315deg, #eb4511 0%, #b02e0c 74%)",
//     boxShadow: "0 1px 2px 2px rgba(255, 105, 135, .15)",
//   },
// };

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
        //message={text}
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
