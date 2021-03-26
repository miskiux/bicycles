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
import { Modal } from "semantic-ui-react";

import { useStorage } from "../../hooks/useStorage.js";
import Button from "@material-ui/core/Button";
import FormSteps from "../../components/sell-form/form-steps/FormSteps.component";
import "./sellpage.styles.scss";

import {
  CustomSpinnerOverlay,
  SpinnerContainer,
} from "../../components/with-spinner/with-spinner.styles";
import CustomSnack from "../../components/snackbar/Snackbar.component";

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
    { idx: 0, item: "Cassette", value: "" },
    { idx: 1, item: "Chain", value: "" },
    { idx: 2, item: "Crankset", value: "" },
    { idx: 3, item: "Pedals", value: "" },
    { idx: 4, item: "Frame Type", value: "" },
    { idx: 5, item: "Frame Material", value: "" },
    { idx: 6, item: "Headset", value: "" },
    { idx: 7, item: "Handlebars", value: "" },
    { idx: 8, item: "Stem", value: "" },
    { idx: 9, item: "Gear/Brake Lever", value: "" },
    { idx: 10, item: "Saddle", value: "" },
    { idx: 11, item: "Fork", value: "" },
    { idx: 12, item: "Brakes", value: "" },
    { idx: 13, item: "Rim", value: "" },
    { idx: 14, item: "Tyre", value: "" },
    { idx: 15, item: "Wheel Size", value: "" },
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
  } = data;
  //const [imgKey, setImgKey] = useState(`${uuidv4()}`);

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

  //creating an object nicely
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
    <Modal
      className="sell-form-container"
      dimmer={"inverted"}
      open={true}
      onClose={false}
    >
      <Modal.Content
        className="modal-content"
        style={{
          display: "flex",
          flexDirection: "row",
          height: "533px",
          padding: "0",
          backgroundColor: "rgba(51, 51, 51, 0.55)",
          borderRadius: "0px",
          width: "100%",
        }}
      >
        <CustomSnack
          name={currentSnackBar}
          text={message}
          open={snackbar}
          handleClick={handleClose}
        />
        <div className="nav-col">
          <ul className="sell-form-nav">
            {steps.map(({ title, id }) => (
              <li key={id} className="nav-item" onClick={() => setStep(id)}>
                <span
                  className={`${id === step ? "active-step" : ""} nav-text`}
                >
                  {title}
                </span>
              </li>
            ))}
          </ul>
          {isLoading ? (
            <CustomSpinnerOverlay>
              <SpinnerContainer size={"small"} />
            </CustomSpinnerOverlay>
          ) : (
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
          )}
        </div>
        <div className="form-step-wrapper">{steps[`${step}`].content}</div>
      </Modal.Content>
    </Modal>
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
