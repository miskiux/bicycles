import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useManufacturerHint } from "../../../hooks/useManufacturerHint";
import { BicycleSpecs } from "../../../assets/additional/form-helpers";
import { GeneralUpdate } from "./update-forms/general-updated.component";
import { DescriptionUpdate } from "./update-forms/description-updated.component";
import { invalidForm } from "../../../redux/sell/sell.actions";
import {
  nameValidation,
  typeValidation,
  priceValidation,
  imageValidation,
  phoneValidation,
} from "../../../pages/sell/validate";
import CustomSnack from "../../snackbar/Snackbar.component";
import {
  offroadSubList,
  roadSubList,
  otherSubList,
} from "../../../assets/additional/form-helpers.js";

import { bicycleUpdateStart } from "../../../redux/shop/shop.actions";

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

  const [switchForm, setSwitchForm] = useState(0);
  const [errors, setErrors] = useState({});

  const { register, handleSubmit } = useForm();
  const { hintData } = useManufacturerHint();
  const dispatch = useDispatch();

  const isBicycleUpdating = useSelector((state) => state.shop.isUpdating);
  const snackbar = useSelector((state) => state.sell.snackbar);
  const message = useSelector((state) => state.sell.message);
  const success = useSelector((state) => state.update.success);

  const {
    manufacturer,
    model,
    price,
    year,
    size,
    condition,
    info,
    address,
    gender,
    description,
  } = update;

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
    console.log(values);
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

  const validate = () => {
    let errorObj = {};

    const manufacturerErrors = nameValidation("Manufacturer", manufacturer);
    const modelErrors = nameValidation("Model", model);
    const typeError = typeValidation("Bicycle Type", bicycleType);
    const priceError = priceValidation("Price", price);
    const phoneError = phoneValidation("Phone", update.phone);
    //const imageError = imageValidation(image);
    const locationError = nameValidation("Location", address);
    errorObj["address"] = locationError;
    errorObj["price"] = priceError;
    errorObj["manufacturer"] = manufacturerErrors;
    errorObj["model"] = modelErrors;
    errorObj["bicycleType"] = typeError;
    errorObj["phone"] = phoneError;
    Object.keys(errorObj).forEach((key) => {
      if (errorObj[key] === null || errorObj[key] === undefined) {
        delete errorObj[key];
      }
    });
    setErrors(errorObj);
    return errorObj;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      dispatch(invalidForm("Invalid input values"));
      return;
    } else {
      dispatch(bicycleUpdateStart({ id, update }));
    }
    toggleEdit();
  };

  const y = {
    success: success,
    error: !!Object.values(errors).length,
  };

  const currentSnackBar = Object.keys(y)
    .filter((k) => options[k] === true)
    .toString();

  //input values off
  return (
    <>
      <div className="update-form-option-container">
        {console.log(currentSnackBar)}
        <CustomSnack name={currentSnackBar} text={message} open={snackbar} />
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
            hintData={hintData}
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
            register={register}
            combineDescriptions={combineDescriptions}
            labelChange={labelChange}
            valueChange={valueChange}
          />
        )}
      </Form>
    </>
  );
}

export default FormUpdate;
