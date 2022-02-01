import React, { useState, useEffect } from "react";

import SellContainer from "src/containers/SellContainer/SellContainer";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  nameValidation,
  priceValidation,
  imageValidation,
  phoneValidation,
  typeValidation,
} from "../../utils/form/validations";
import { v4 as uuidv4 } from "uuid";
import {
  SelectMessage,
  SelectSubmitSuccess,
  SelectIsLoading,
  SelectHasImagesLoaded,
  SelectSubmitFailure,
  SelectSnackbar,
} from "../../redux/SellStore/SellRequestStore/sell-request.selectors";

import { selectCurrentUser } from "../../redux/User/user.selectors";
import {
  imageUploadStart,
  bicycleUploadStart,
  toggleSnackBar,
  invalidForm,
} from "../../redux/SellStore/SellRequestStore/sell-request.actions";

import { Icon } from "semantic-ui-react";

import { useStorage } from "../../hooks/useStorage.js";

import CustomSnack from "../../components/snackbar/Snackbar.component";
import { Col, Container, Row } from "react-bootstrap";
import { Transition } from "react-transition-group";

function SellPage({
  currentUser,
  hasImagesLoaded,
  bicycleUploadStart,
  imageUploadStart,
  isLoading,
  submitSuccess,
  submitFailure,
  message,
  snackbar,
  toggleSnackBar,
  invalidForm,
}) {
  //separate reducer
  const [errors, setErrors] = useState({});

  //inside sell-form reducer
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

  //separate reducer or not (sell-form reducer)
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

  // needs to be in a reducer
  const [viewport, setViewport] = useState({
    latitude: 54.526,
    longitude: 15.2551,
    zoom: 2,
    bearing: 0,
    pitch: 0,
  });

  // goes together with viewport
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

  // refactoring image upload

  const { url } = useStorage(image, imgKey);

  /// and then upload
  useEffect(() => {
    if (hasImagesLoaded === true) {
      bicycleUploadStart({ ...data, url });
    }
  }, [hasImagesLoaded]);

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (submitSuccess) {
      history.push(`/shop`);
    }
    toggleSnackBar();
  };
  //error handling and validation
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

  ///reducer for these shits
  const options = {
    success: submitSuccess,
    error: submitFailure,
    inputError: !!Object.values(errors).length,
  };

  const currentSnackBar = Object.keys(options)
    .filter((k) => options[k] === true)
    .toString();

  // <CustomSnack
  //             color={currentSnackBar}
  //             text={message}
  //             open={snackbar}
  //             handleClick={handleClose}
  //           />

  return <SellContainer />;
}

export default SellPage;
