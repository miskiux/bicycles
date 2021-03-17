import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  nameValidation,
  priceValidation,
  imageValidation,
  phoneValidation,
  typeValidation,
} from "./validate";

import {
  SelectMessage,
  SelectSubmitSuccess,
  SelectIsLoading,
  SelectHasImagesLoaded,
  SelectSubmitFailure,
  SelectSnackbar,
} from "../../redux/sell/sell.selectors";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import {
  imageUploadStart,
  bicycleUploadStart,
  toggleSnackBar,
  invalidForm,
} from "../../redux/sell/sell.actions";

import { useStorage } from "../../hooks/useStorage.js";
import Button from "@material-ui/core/Button";
import FormSteps from "../../components/sell-form/form-steps/FormSteps.component";
import "./sellpage.styles.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-scroll";
import { makeStyles } from "@material-ui/core/styles";
import {
  CustomSpinnerOverlay,
  SpinnerContainer,
} from "../../components/with-spinner/with-spinner.styles";
import CustomSnack from "../../components/snackbar/Snackbar.component";

//validation => req: Man, model, bicycle type, price, location, images

//validating at sellpage, pass validate to appr components

function SellPage({
  submitDone,
  currentUser,
  hasImagesLoaded,
  bicycleUploadStart,
  imageUploadStart,
  isLoading,
  submitSuccess,
  submitFailure,
  window,
  message,
  snackbar,
  toggleSnackBar,
  invalidForm,
}) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    userId: "",
    bicycleType: "",
    subCategory: "",
    description: [],
    info: "",
    size: "",
    condition: "",
    gender: "",
    manufacturer: "",
    model: "",
    price: "",
    year: "",
    phone: "",
    address: "",
    image: [],
    email: "",
    coordinates: null,
  });
  const { bicycleType, manufacturer, model, price, address, image } = data;

  useEffect(() => {
    setData({ ...data, userId: currentUser.id, email: currentUser.email });
  }, [currentUser]);

  const { url, imgKey } = useStorage(image);

  //upload data
  useEffect(() => {
    if (hasImagesLoaded === true) {
      bicycleUploadStart({ ...data, url, imgKey });
    }
  }, [hasImagesLoaded]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const callback = (key, values) =>
    setData((prevData) => ({ ...prevData, [key]: values }));

  const history = useHistory();

  // const handleClose = () => {
  //   submitSuccess();
  //   history.push(`/shop`);
  // };

  let steps = FormSteps({
    data,
    handleChange,
    step,
    setStep,
    callback,
    errors,
  });

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    toggleSnackBar();
  };

  const validate = () => {
    let errorObj = {};

    const manufacturerErrors = nameValidation("Manufacturer", manufacturer);
    const modelErrors = nameValidation("Model", model);
    const typeError = typeValidation("Bicycle Type", bicycleType);
    const priceError = priceValidation("Price", price);
    const imageError = imageValidation(image);
    const locationError = nameValidation("Location", address);
    errorObj["address"] = locationError;
    errorObj["image"] = imageError;
    errorObj["price"] = priceError;
    errorObj["manufacturer"] = manufacturerErrors;
    errorObj["model"] = modelErrors;
    errorObj["bicycleType"] = typeError;
    Object.keys(errorObj).forEach((key) => {
      if (errorObj[key] === null || errorObj[key] === undefined) {
        delete errorObj[key];
      }
    });
    setErrors(errorObj);
    return errorObj;
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      invalidForm("Invalid input values");
      return;
    } else {
      imageUploadStart();
      console.log("submit running");
    }
  };

  const options = {
    success: submitSuccess,
    error: submitFailure,
    inputError: !!Object.values(errors).length,
  };

  const currentSnackBar = Object.keys(options)
    .filter((k) => options[k] === true)
    .toString();

  //phone bug
  return (
    <Container className="sell-form-container" fluid>
      <Row>
        <div className="sellform-snackbar">
          <CustomSnack
            name={currentSnackBar}
            text={message}
            open={snackbar}
            handleClick={handleClose}
          />
        </div>
        <Col className="nav-col">
          {isLoading ? (
            <CustomSpinnerOverlay>
              <SpinnerContainer size={"small"} />
            </CustomSpinnerOverlay>
          ) : (
            <Fade appear={true} in={trigger}>
              <div className="submit-nav">
                <Button
                  type="button"
                  color="primary"
                  className="submit-button"
                  onClick={onFormSubmit}
                >
                  Submit
                </Button>
              </div>
            </Fade>
          )}
          <ul className="sell-form-nav">
            <li className="nav-text">
              <Link to="general" smooth={"easeInOutQuart"} duration={900}>
                General
              </Link>
            </li>
            <li className="nav-text">
              <Link to="location" smooth={"easeInOutQuart"} duration={500}>
                Location
              </Link>
            </li>
            <li className="nav-text">
              <Link to="image" smooth={"easeInOutQuart"} duration={500}>
                Image
              </Link>
            </li>
            <li className="nav-text">
              <Link to="specs" smooth={"easeInOutQuart"} duration={500}>
                Specs
              </Link>
            </li>
          </ul>
        </Col>
        <Col xs={10}>
          <div className="sell-form">
            {steps.map(({ title, content, id }, i) => (
              <div key={i} id={id} className="form-step-wrapper">
                <h1 className="step-name">{title}</h1>
                <div className="form-step">{content}</div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  hasImagesLoaded: SelectHasImagesLoaded(state),
  isLoading: SelectIsLoading(state),
  submitSuccess: SelectSubmitSuccess(state),
  submitFailure: SelectSubmitFailure(state),
  message: SelectMessage(state),
  snackbar: SelectSnackbar(state),
});

const mapDispatchToProps = (dispatch) => ({
  bicycleUploadStart: (additionalData) =>
    dispatch(bicycleUploadStart(additionalData)),
  imageUploadStart: () => dispatch(imageUploadStart()),
  toggleSnackBar: () => dispatch(toggleSnackBar()),
  invalidForm: (errorMessage) => dispatch(invalidForm(errorMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellPage);
