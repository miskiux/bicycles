import React, { useCallback, useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { handleInputChange } from "src/redux/SellStore/SellFormStore/SellForm.actions";
import { validateAllFields } from "src/redux/SellStore/SellFormStore/SellForm.actions";

import { BaseInput } from "src/components/Shared/Input/BaseInput/BaseInput";
import { Hint } from "react-autocomplete-hint";

import intlTelInput from "intl-tel-input";

import {
  offroadSubList,
  roadSubList,
  otherSubList,
  bicycleList,
  genderList,
} from "../../../assets/additional/form-helpers.js";

import "intl-tel-input/build/css/intlTelInput.css";

import styles from "./BicycleInformation.module.scss";
import { AutoCompleteInput } from "src/components/Shared/Input/AutoCompleteSelect/AutoCompleteSelect";
import { FilterOptions } from "src/helpers/FilterOptions";

export default function BicycleInformation({
  data,
  title,
  options,
  violations,
}) {
  const {
    manufacturer,
    year,
    model,
    bicycleType,
    subCategory,
    gender,
    price,
    phone,
    size,
    condition,
    info,
  } = data || {};

  // useEffect(() => {
  //   let filteredOptions = [...manufacturerOptions];
  //   if (manufacturer) {
  //     filteredOptions = filteredOptions.filter(({ label }) => {
  //       return label.toLowerCase().includes(manufacturer.toLowerCase());
  //     });
  //   }
  //   setManufacturerOptions(filteredOptions);
  // }, [manufacturer, JSON.stringify(manufacturerOptions)]);

  const dispatch = useDispatch();

  const years = Array.from(
    new Array(50),
    (val, index) => new Date().getFullYear() - index
  );

  // useEffect(() => {
  //   let input = document.querySelector("#phone");
  //   const iti = intlTelInput(input);
  //   input.addEventListener("countrychange", function () {
  //     let val = iti.getSelectedCountryData();
  //     let dial = "+" + val.dialCode;
  //     props.callback("phone", dial);
  //   });
  //   return () =>
  //     input.removeEventListener("countrychange", function () {
  //       let val = iti.getSelectedCountryData();
  //       props.callback("phone", val.dialCode);
  //     });
  // }, []);

  //subcategory
  // let type = null;
  // let options = null;

  // if (bicycleType === "Off-Road") {
  //   type = offroadSubList;
  // } else if (bicycleType === "Road Bicycle") {
  //   type = roadSubList;
  // } else if (bicycleType === "Other") {
  //   type = otherSubList;
  // } else if (
  //   new RegExp(["City Bicycle", "Vintage", "Custom"].join("|")).test(
  //     bicycleType
  //   )
  // ) {
  //   type = ["None"];
  // }

  // if (type) {
  //   options = type.map((el) => (
  //     <option key={el} value={el}>
  //       {el}
  //     </option>
  //   ));
  // }

  const handleChange = (value) => {
    dispatch(handleInputChange(value));
  };

  const getViolation = (value) => {
    return violations.find(({ property }) => property === value).message;
  };

  return (
    <div className={styles.container}>
      <h3>{title}</h3>

      <div className={styles.form}>
        <AutoCompleteInput
          name="manufacturer"
          value={manufacturer}
          label="Manufacturer"
          options={FilterOptions(manufacturer, options)}
          //isLoading={initialLoad}
          //value={productsAutocompleteStore.valueByKey.get(autocompleteKey) || ''}
          // disabled={isDisabled}
          // selectedOptionValue={selectedOptionValue || ''}
          // isLoading={productsAutocompleteStore.loadingByKey.get(autocompleteKey)}
          // options={this.options}
          // icon={iconSearch}
          // placeholder={placeholder}
          onChange={handleChange}
          // onBlur={this.handleBlur}
          // onOptionSelect={this.handleSelect}
          error={!!violations.length && getViolation("manufacturer")}
        />

        <BaseInput
          name="model"
          value={model}
          label="Model"
          onChange={handleChange}
          error={!!violations.length && getViolation("model")}
        />
      </div>

      <button onClick={() => dispatch(validateAllFields())}></button>

      {/* <label>Model</label> */}
      {/* <input
        type="text"
        name="model"
        //className={props.errors.model && "invalid-input"}
        autoComplete="off"
        value={model}
        onChange={(event) => dispatch(handleInputChange(event))}
        required
      /> */}
      {/* <Col className="form-col">
          <Form.Label>Bicycle Type</Form.Label>
          <Form.Control
            as="select"
            name="bicycleType"
            value={bicycleType}
            //className={props.errors.bicycleType && "invalid-input"}
            onChange={(event) => dispatch(handleInputChange(event))}
            custom
            required
          >
            {bicycleList.map(({ key, label, value }) => (
              <option key={key} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col>
          <Form.Label>Sub Type</Form.Label>
          <Form.Control
            as="select"
            name="subCategory"
            value={subCategory}
            onChange={(event) => dispatch(handleInputChange(event))}
            custom
          >
            {options}
          </Form.Control>
        </Col>
      </Form.Row>
      <Form.Row className="second-tier">
        <Col className="year-select" xs={6}>
          <Form.Label>Year</Form.Label>
          <Form.Control
            name="year"
            as="select"
            size="sm"
            value={year}
            onChange={(event) => dispatch(handleInputChange(event))}
            custom
          >
            {years.map((year, index) => (
              <option key={`year${index}`} value={year}>
                {year}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col sm={2} xs={4}>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            name="gender"
            value={gender}
            onChange={(event) => dispatch(handleInputChange(event))}
            custom
          >
            {genderList.map(({ key, label, value }) => (
              <option key={key} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col sm={2} xs={4}>
          <Form.Label>Size (cm)</Form.Label>
          <Form.Control
            type="text"
            name="size"
            size="sm"
            value={size}
            onChange={(event) => dispatch(handleInputChange(event))}
          ></Form.Control>
        </Col>
        <Col>
          <Form.Label>Condition</Form.Label>
          <div className="mb">
            <Form.Check
              inline
              label="New"
              name="condition"
              type="radio"
              value="New"
              checked={condition === "New"}
              onChange={(event) => dispatch(handleInputChange(event))}
            />
            <Form.Check
              inline
              label="Used"
              name="condition"
              type="radio"
              value="Used"
              checked={condition === "Used"}
              onChange={(event) => dispatch(handleInputChange(event))}
            />
          </div>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col xs={12} sm={4}>
          <Form.Label>Additional Information</Form.Label>
          <Form.Control
            as="textarea"
            name="info"
            style={{ height: "80px", resize: "none" }}
            className="info-input"
            type="text"
            value={info}
            onChange={(event) => dispatch(handleInputChange(event))}
          />
        </Col>
        <Col className="form-col">
          <Form.Label>Price (€)</Form.Label>
          <Form.Control
            name="price"
            autoComplete="off"
            //className={props.errors.price && "invalid-input"}
            type="text"
            value={price}
            onChange={(event) => dispatch(handleInputChange(event))}
            required
          />
        </Col>
        <Col className="form-col">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            autoplaceholder="aggressive"
            //className={props.errors.price && "invalid-input"}
            type="tel"
            autoComplete="off"
            id="phone"
            value={phone}
            onChange={(event) => dispatch(handleInputChange(event))}
          />
        </Col>
      </Form.Row>
    </Form> */}
    </div>
  );
}
