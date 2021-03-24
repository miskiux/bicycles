import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useManufacturerHint } from "../../../hooks/useManufacturerHint";
import { BicycleSpecs } from "../../../assets/additional/form-helpers";
import { GeneralUpdate } from "./update-forms/general-updated.component";
import { DescriptionUpdate } from "./update-forms/description-updated.component";

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
  const [errors, setErrors] = useState([]);

  const { register, handleSubmit } = useForm();
  const { hintData } = useManufacturerHint();
  const dispatch = useDispatch();

  const isBicycleUpdating = useSelector((state) => state.shop.isUpdating);

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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(update);
    //dispatch(bicycleUpdateStart({ data, id }));
    //toggleEdit after success
    //toggleEdit();
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

  return (
    <>
      <div className="update-form-option-container">
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
