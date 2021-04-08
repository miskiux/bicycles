import React, { useState, useEffect } from "react";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  nameValidation,
  priceValidation,
  imageValidation,
  phoneValidation,
  typeValidation,
} from "./validate";
import { v4 as uuidv4 } from "uuid";
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

import { FormUpdate } from "../../redux/form/form.actions";
import { Icon } from "semantic-ui-react";

import { useStorage } from "../../hooks/useStorage.js";
import Button from "@material-ui/core/Button";
import FormSteps from "../../components/sell-form/form-steps/FormSteps.component";
import "./sellpage.styles.scss";
import {
  CustomSpinnerOverlay,
  SpinnerContainer,
} from "../../components/with-spinner/with-spinner.styles";
import CustomSnack from "../../components/snackbar/Snackbar.component";
import { Col, Container, Row } from "react-bootstrap";
import { Transition } from "react-transition-group";
// bring component later
//able on CHANGE to go to next bicycle - update form
//if not change loader is submitting update form
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
  FormUpdate,
}) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitButton, setSubmitButton] = useState(false);
  const [data, setData] = useState({
    imgKey: `${uuidv4()}`,
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
  const [specsData, setSpecsData] = useState([
    { idx: 0, item: "Groupset", value: "" },
    { idx: 1, item: "Cassette", value: "" },
    { idx: 2, item: "Chain", value: "" },
    { idx: 3, item: "Crankset", value: "" },
    { idx: 4, item: "Pedals", value: "" },
    { idx: 5, item: "Frame Type", value: "" },
    { idx: 6, item: "Frame Material", value: "" },
    { idx: 7, item: "Headset", value: "" },
    { idx: 8, item: "Handlebars", value: "" },
    { idx: 9, item: "Stem", value: "" },
    { idx: 10, item: "Gear/Brake Lever", value: "" },
    { idx: 11, item: "Saddle", value: "" },
    { idx: 12, item: "Fork", value: "" },
    { idx: 13, item: "Brakes", value: "" },
    { idx: 14, item: "Rim", value: "" },
    { idx: 15, item: "Tyre", value: "" },
    { idx: 16, item: "Wheel Size", value: "" },
  ]);
  const [viewport, setViewport] = useState({
    latitude: 54.526,
    longitude: 15.2551,
    zoom: 2,
    bearing: 0,
    pitch: 0,
  });
  const [showMarker, setShowMarker] = useState(false);
  const {
    bicycleType,
    manufacturer,
    model,
    price,
    address,
    image,
    imgKey,
    phone,
  } = data;

  useEffect(() => {
    setData({ ...data, userId: currentUser.id, email: currentUser.email });
  }, [currentUser]);

  const { url } = useStorage(image, imgKey);

  //upload data
  useEffect(() => {
    if (hasImagesLoaded === true) {
      bicycleUploadStart({ ...data, url });
    }
  }, [hasImagesLoaded]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const callback = (key, values) =>
    setData((prevData) => ({ ...prevData, [key]: values }));

  const specsCallback = (data) => {
    setSpecsData(data);
  };

  const locationCallback = (coords) => {
    setViewport(coords);
    setData((prevData) => ({
      ...prevData,
      coordinates: [coords.latitude, coords.longitude],
    }));
  };

  const setMarker = () => {
    setShowMarker(true);
  };

  const history = useHistory();

  let steps = FormSteps({
    data,
    specsData,
    handleChange,
    callback,
    errors,
    specsCallback,
    locationCallback,
    viewport,
    showMarker,
    setMarker,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (submitSuccess) {
      history.push(`/shop`);
    }
    toggleSnackBar();
  };

  const goBack = () => {
    history.goBack();
  };

  const validate = () => {
    let errorObj = {};

    const manufacturerErrors = nameValidation("Manufacturer", manufacturer);
    const modelErrors = nameValidation("Model", model);
    const typeError = typeValidation("Bicycle Type", bicycleType);
    const priceError = priceValidation("Price", price);
    const imageError = imageValidation(image);
    const locationError = nameValidation("Location", address);
    const phoneError = phoneValidation(phone);
    errorObj["phone"] = phoneError;
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
      setSubmitButton((i) => !i);
      imageUploadStart();
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

  const duration = 250;
  const loaderduration = 350;

  const loaderStyle = {
    transition: `opacity ${loaderduration}ms ease-in-out`,
  };
  const loaderStyleTransition = {
    entering: {
      opacity: 0,
    },
    entered: {
      opacity: 1,
    },
    exiting: {
      opacity: 1,
    },
    exited: {
      opacity: 0,
    },
  };

  const buttonStyle = {
    transition: `transform ${duration}ms ease-in-out`,
  };
  const deleteButtonTransition = {
    entering: {
      transform: "none",
    },
    entered: {
      transform: "translate3d(0px, 35px, 0px)",
      opacity: 0.5,
    },
    exiting: {
      transform: "translate3d(0px, 35px, 0px)",
      opacity: 0.5,
    },
    exited: {
      transform: "none",
    },
  };
  return (
    <Container className="sellpage-container" fluid>
      <Row className="sellpage-row">
        <h3 className="sellpage-name">Bicycle form</h3>
        <Col className="sellpage-info-wrapper" xs={12} lg={3} md={4}>
          <h3 style={{ paddingBottom: "10px" }}>Tell us about your bicycle</h3>
          <div className="sellpage-item-wrapper">
            {steps.map(({ title, id, name }) => (
              <div
                key={id}
                className="sellpage-item"
                onClick={() => setStep(id)}
              >
                <div className="sellpage-item-title">
                  <Icon name={name} />
                  <span className="sellpage-item-name">{title}</span>
                </div>
                <ChevronRightIcon />
              </div>
            ))}
          </div>
          <div className="sellpage-control">
            <div className="sellpage-control-options">
              <div className="sellpage-goback" onClick={goBack}>
                <Icon name="long arrow alternate left" />
                <span>Back</span>
              </div>
              <div className="submit-wrapper">
                <Transition in={submitButton} timeout={duration}>
                  {(state) => (
                    <button
                      style={{
                        ...buttonStyle,
                        ...deleteButtonTransition[state],
                      }}
                      className="submit-button"
                      onClick={onFormSubmit}
                    >
                      Submit
                    </button>
                  )}
                </Transition>
                <Transition in={isLoading} timeout={duration}>
                  {(state) => (
                    <CustomSpinnerOverlay
                      style={{
                        ...loaderStyle,
                        ...loaderStyleTransition[state],
                      }}
                    >
                      <SpinnerContainer size={"small"} />
                    </CustomSpinnerOverlay>
                  )}
                </Transition>
              </div>
            </div>
            <CustomSnack
              color={currentSnackBar}
              text={message}
              open={snackbar}
              handleClick={handleClose}
            />
          </div>
        </Col>
        <Col xs={12} lg={9} md={8} className="form-steps-col">
          <div className="form-steps">{steps[`${step}`].content}</div>
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
  FormUpdate: (data) => dispatch(FormUpdate(data)),
  bicycleUploadStart: (additionalData) =>
    dispatch(bicycleUploadStart(additionalData)),
  imageUploadStart: () => dispatch(imageUploadStart()),
  toggleSnackBar: () => dispatch(toggleSnackBar()),
  invalidForm: (errorMessage) => dispatch(invalidForm(errorMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellPage);
