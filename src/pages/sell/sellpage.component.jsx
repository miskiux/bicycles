import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { SelectHasImagesLoaded } from "../../redux/sell/sell.selectors";
import { SelectIsLoaded } from "../../redux/sell/sell.selectors";
import { SelectSubmitSuccess } from "../../redux/sell/sell.selectors";

import { bicycleUploadStart } from "../../redux/sell/sell.actions";
import { imageUploadStart } from "../../redux/sell/sell.actions";
import { submitSuccess } from "../../redux/sell/sell.actions";

import { useStorage } from "../../hooks/useStorage.js";

import FormSteps from "../../components/sell-form/form-steps/FormSteps.component";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./sellpage.styles.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  SpinnerContainer,
  SpinnerOverlay,
} from "../../components/with-spinner/with-spinner.styles";

import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

//adding date
//phone

//form in reducer, need description and options for
function SellPage({
  submitDone,
  currentUser,
  hasImagesLoaded,
  bicycleUploadStart,
  imageUploadStart,
  isLoaded,
  submitSuccess,
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    userId: "",
    bicycleType: "",
    subCategory: "",
    options: [],
    description: [],
    info: "",
    size: "",
    condition: "",
    gender: "",
    manufacturer: "",
    model: "",
    price: "",
    year: "",
    country: "",
    phone: "",
    address: "",
    region: "",
    image: [],
    email: "",
    coordinates: null,
  });
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const {
    currentStep,
    userId,
    bicycleType,
    subCategory,
    options,
    description,
    size,
    info,
    condition,
    gender,
    manufacturer,
    model,
    price,
    year,
    email,
    phone,
    address,
    coordinates,
    image,
  } = data;

  useEffect(() => {
    setData({ ...data, userId: currentUser.id, email: currentUser.email });
  }, [currentUser]);

  const { url, key } = useStorage(image);

  //upload data
  useEffect(() => {
    if (hasImagesLoaded === true) {
      bicycleUploadStart({ data, url, key });
    }
  }, [hasImagesLoaded]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  // gender, bicycleType
  //let value = Object.values(gender)[0];

  const onRadioChange = (event) => {
    setData({ ...data, condition: event.target.value });
  };
  const callback = (key, values) =>
    setData((prevData) => ({ ...prevData, [key]: values }));

  // submit success actions
  const history = useHistory();

  const handleClose = () => {
    submitSuccess();
    history.push(`/shop`);
  };

  let steps = FormSteps({
    data,
    handleChange,
    step,
    setStep,
    onRadioChange,
    callback,
  });

  //specForm => onSubmit={imageUploadStart}
  return (
    <Container className="sell-form-container" fluid>
      <Row>
        <Col>
          <div className="sell-form-nav">
            <h2>hi</h2>
            <h2>hi</h2>
            <h2>hi</h2>
            <h2>hi</h2>
          </div>
        </Col>
        <Col xs={10}>
          <div className="sell-form">
            {steps.map(({ title, content }) => (
              <div className="form-step-wrapper">
                <h1 className="step-name">{title}</h1>
                <div className="form-step">{content}</div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
    /*isLoaded ? (
        <SpinnerOverlay>
          <SpinnerContainer />
        </SpinnerOverlay>
      ) : submitDone ? (
        <div className={classes.root}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Your bicycle has been submitted !
            </Alert>
          </Snackbar>
        </div>
      ) : (
        
      )}*/
  );
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  hasImagesLoaded: SelectHasImagesLoaded(state),
  isLoaded: SelectIsLoaded(state),
  submitDone: SelectSubmitSuccess(state),
});

const mapDispatchToProps = (dispatch) => ({
  bicycleUploadStart: (additionalData) =>
    dispatch(bicycleUploadStart(additionalData)),
  imageUploadStart: () => dispatch(imageUploadStart()),
  submitSuccess: () => dispatch(submitSuccess()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellPage);
