import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { BicycleSpecs } from "../../../assets/additional/form-helpers";
import { GeneralUpdate } from "./update-forms/general-updated.component";
import { DescriptionUpdate } from "./update-forms/description-updated.component";
import { invalidUpdateForm } from "../../../redux/BicycleUpdate/update.actions";
// import {
//   nameValidation,
//   typeValidation,
//   priceValidation,
//   phoneValidation,
//   descriptionValidation,
// } from "../../../utils/form/validations";
import CustomSnack from "../../snackbar/Snackbar.component";
import {
  offroadSubList,
  roadSubList,
  otherSubList,
} from "../../../assets/additional/form-helpers.js";

import {
  bicycleUpdateStart,
  getDefault,
  toggleSnackBar,
} from "../../../redux/BicycleUpdate/update.actions";

import { Form } from "react-bootstrap";

import "./form-update.styles.scss";

function FormUpdate({ inputData, edit, toggleEdit }) {
  //prev values
  const { item, id, bicycleType, subCategory, phone } = inputData;
  //new values
  const [update, setUpdate] = useState({
    manufacturer: item.manufacturer,
    model: item.model,
    bicycleType: bicycleType,
    subCategory: subCategory,
    gender: item.gender,
    price: item.price,
    year: item.year,
    size: item.size,
    condition: item.condition,
    info: item.info,
    address: item.address,
    phone: inputData.phone,
    description: item.description,
  });

  useEffect(() => {
    setUpdate({
      manufacturer: item.manufacturer,
      model: item.model,
      bicycleType: bicycleType,
      subCategory: subCategory,
      gender: item.gender,
      price: item.price,
      year: item.year,
      size: item.size,
      condition: item.condition,
      info: item.info,
      address: item.address,
      phone: inputData.phone,
      description: item.description,
    });
  }, [inputData]);

  const [switchForm, setSwitchForm] = useState(0);

  const [errors, setErrors] = useState({});

  const { register } = useForm();
  const dispatch = useDispatch();

  const snackbar = useSelector((state) => state.update.snackbar);
  const message = useSelector((state) => state.update.message);
  const success = useSelector((state) => state.update.success);

  const { manufacturer, model, price, address, description } = update;

  useEffect(() => {
    if (!edit) {
      setUpdate({ ...update, description: item.description });
    }
  }, [edit]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUpdate({ ...update, [name]: value });
  };

  const descriptionChange = (e, id) => {
    e.preventDefault();
    let inputVals = [...description];
    let index = description.findIndex((row) => row.idx === id);
    inputVals[index].value = e.target.value;
    setUpdate({ ...update, description: inputVals });
  };

  const changeForm = (key) => {
    setSwitchForm(key);
  };

  const removeDescription = (id) => {
    const values = description.filter((i) => i.idx !== id);
    setUpdate({ ...update, description: values });
  };

  const labelChange = (e, id) => {
    e.preventDefault();
    const values = [...description];
    let checkPoint = description
      .map(({ item }) => item)
      .includes(e.target.value);
    if (checkPoint) {
      setErrors(true);
      return;
    } else {
      const currentSpec = BicycleSpecs.filter(
        (i) => [...i.item].sort() + "" === [...e.target.value].sort() + ""
      );
      const currentSpecIndex = currentSpec.map((i) => i.idx).join();
      let newItemsIndex = values.findIndex((row) => row.idx === id);
      values[newItemsIndex].idx = Number(currentSpecIndex);
      values[newItemsIndex].item = e.target.value;
      setUpdate({ ...update, description: values });
      setErrors(false);
    }
  };

  const valueChange = (e, id) => {
    e.preventDefault();
    const values = [...description];
    let index = description.findIndex((row) => row.idx === id);
    values[index].value = e.target.value;
    setUpdate({ ...update, description: values });
  };

  const combineDescriptions = (data) => {
    const values = [...description, ...data];
    setUpdate({ ...update, description: values });
  };

  let type = null;
  let options = null;

  if (update.bicycleType === "Off-Road") {
    type = offroadSubList;
  } else if (update.bicycleType === "Road Bicycle") {
    type = roadSubList;
  } else if (update.bicycleType === "Other") {
    type = otherSubList;
  } else if (
    new RegExp(["City Bicycle", "Vintage", "Custom"].join("|")).test(
      update.bicycleType
    )
  ) {
    type = ["None"];
  }

  if (type) {
    options = type.map((el) => (
      <option key={el} value={el}>
        {el}
      </option>
    ));
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => currentYear - index);

  // const validate = () => {
  //   let errorObj = {};

  //   const descriptionErrors = descriptionValidation("Description", description);
  //   const manufacturerErrors = nameValidation("Manufacturer", manufacturer);
  //   const modelErrors = nameValidation("Model", model);
  //   const typeError = typeValidation("Bicycle Type", bicycleType);
  //   const priceError = priceValidation("Price", price);
  //   const phoneError = phoneValidation(update.phone);
  //   const locationError = nameValidation("Location", address);
  //   errorObj["address"] = locationError;
  //   errorObj["price"] = priceError;
  //   errorObj["manufacturer"] = manufacturerErrors;
  //   errorObj["model"] = modelErrors;
  //   errorObj["bicycleType"] = typeError;
  //   errorObj["phone"] = phoneError;
  //   errorObj["description"] = descriptionErrors;
  //   Object.keys(errorObj).forEach((key) => {
  //     if (errorObj[key] === null || errorObj[key] === undefined) {
  //       delete errorObj[key];
  //     }
  //   });
  //   setErrors(errorObj);
  //   return errorObj;
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    const err = true;
    if (Object.keys(err).length) {
      dispatch(invalidUpdateForm("Invalid input values"));
      return;
    } else {
      dispatch(bicycleUpdateStart({ id, update }));
    }
    toggleEdit();
  };

  const handleClose = () => {
    dispatch(toggleSnackBar());
    dispatch(getDefault());
  };

  const y = {
    success: success,
    error: !!Object.values(errors).length,
  };

  const currentSnackBar = Object.keys(y)
    .filter((k) => y[k] === true)
    .toString();

  return (
    <>
      <div className="update-form-option-container">
        <CustomSnack
          color={currentSnackBar}
          text={message}
          open={snackbar}
          handleClick={handleClose}
        />
        <span className="select-form" onClick={() => changeForm(0)}>
          General
        </span>

        <span className="select-form" onClick={() => changeForm(1)}>
          Description
        </span>
      </div>
      <Form id="hook-form" className="update-form" onSubmit={onSubmit}>
        {switchForm === 0 ? (
          <GeneralUpdate
            phone={phone}
            bicycleType={bicycleType}
            subCategory={subCategory}
            item={item}
            edit={edit}
            hintData={{}}
            update={update}
            handleChange={handleChange}
            options={options}
            years={years}
            register={register}
            errors={errors}
          />
        ) : (
          <DescriptionUpdate
            description={description}
            edit={edit}
            descriptionChange={descriptionChange}
            removeDescription={removeDescription}
            combineDescriptions={combineDescriptions}
            labelChange={labelChange}
            valueChange={valueChange}
            errors={errors}
            item={item}
          />
        )}
      </Form>
    </>
  );
}

export default FormUpdate;
