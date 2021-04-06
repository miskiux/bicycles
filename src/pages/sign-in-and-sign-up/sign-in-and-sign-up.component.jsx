import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import { Button } from "semantic-ui-react";

import { showWelcome } from "../../redux/user/user.actions";
import { redirect } from "../../redux/user/user.actions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import "./sign-in-and-sign-up.styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

//redux saga dispatches action which does not exist

const SignInAndSignUp = () => {
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const [currentStep, setCurrentStep] = useState(0);

  const redirectToHome = useSelector((state) => state.user.redirectTo);
  const user = useSelector((state) => state.user.currentUser);
  const welcome = useSelector((state) => state.user.welcomePopUp);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && welcome === true) {
      history.push("/");
    }
  }, [user, welcome]);

  const PageNavigation = () => {
    if (currentStep === 0) {
      return (
        <Button type="button" onClick={() => setCurrentStep(1)}>
          Sign Up
        </Button>
      );
    } else {
      return (
        <Button type="button" onClick={() => setCurrentStep(0)}>
          Sign In
        </Button>
      );
    }
    return null;
  };

  const handleClose = () => {
    dispatch(showWelcome(true));
    dispatch(redirect(null));
    history.push("/");
  };

  if (!!redirectToHome) {
    return (
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            welcome
          </Alert>
        </Snackbar>
      </div>
    );
  }

  const components = [
    {
      content: <SignIn />,
    },
    {
      content: <SignUp />,
    },
  ];

  return (
    <div className="sign-in-and-sign-up">
      {components[`${currentStep}`].content}
      <div className="sign-options">{PageNavigation()}</div>
    </div>
  );
};
export default SignInAndSignUp;
