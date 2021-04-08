import React, { useEffect } from "react";

import { useManufacturerHint } from "../../../hooks/useManufacturerHint";

import { Hint } from "react-autocomplete-hint";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import intlTelInput from "intl-tel-input";

import {
  offroadSubList,
  roadSubList,
  otherSubList,
  bicycleList,
  genderList,
} from "../../../assets/additional/form-helpers.js";

import "intl-tel-input/build/css/intlTelInput.css";

import "./general-info.styles.scss";

const GeneralInfo = (props) => {
  const year = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => year - index);

  const { hintData } = useManufacturerHint();

  useEffect(() => {
    let input = document.querySelector("#phone");
    const iti = intlTelInput(input);
    input.addEventListener("countrychange", function () {
      let val = iti.getSelectedCountryData();
      let dial = "+" + val.dialCode;
      props.callback("phone", dial);
    });
    return () =>
      input.removeEventListener("countrychange", function () {
        let val = iti.getSelectedCountryData();
        props.callback("phone", val.dialCode);
      });
  }, []);

  const genderChange = (event) => {
    props.callback("gender", event.target.value);
  };

  //subcategory
  let type = null;
  let options = null;

  if (props.bicycleType === "Off-Road") {
    type = offroadSubList;
  } else if (props.bicycleType === "Road Bicycle") {
    type = roadSubList;
  } else if (props.bicycleType === "Other") {
    type = otherSubList;
  } else if (
    new RegExp(["City Bicycle", "Vintage", "Custom"].join("|")).test(
      props.bicycleType
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

  //make into one
  const handleType = (event) => {
    props.callback("bicycleType", event.target.value);
  };

  const handleSubCategory = (event) => {
    props.callback("subCategory", event.target.value);
  };

  const handleYear = (event) => {
    props.callback("year", event.target.value);
  };

  //size on hover tooltip

  return (
    <Form className="form-bootstrap">
      <Form.Row>
        <Col className="form-col" sm={6} lg={4}>
          <Form.Label>Manufacturer</Form.Label>
          <Hint options={hintData}>
            <Form.Control
              type="text"
              className={props.errors.manufacturer && "invalid-input"}
              name="manufacturer"
              autoComplete="off"
              value={props.manufacturer}
              onChange={props.handleChange}
              required
            />
          </Hint>
        </Col>
        <Col className="form-col" sm={6} lg={4}>
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            name="model"
            className={props.errors.model && "invalid-input"}
            autoComplete="off"
            value={props.model}
            onChange={props.handleChange}
            required
          />
        </Col>
        <Col className="form-col">
          <Form.Label>Bicycle Type</Form.Label>
          <Form.Control
            as="select"
            value={props.bicycleType}
            className={props.errors.bicycleType && "invalid-input"}
            onChange={handleType}
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
            value={props.subCategory}
            onChange={handleSubCategory}
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
            as="select"
            size="sm"
            value={props.year}
            onChange={handleYear}
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
            value={props.gender}
            onChange={genderChange}
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
            value={props.size}
            onChange={props.handleChange}
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
              checked={props.condition === "New"}
              onChange={props.handleChange}
            />
            <Form.Check
              inline
              label="Used"
              name="condition"
              type="radio"
              value="Used"
              checked={props.condition === "Used"}
              onChange={props.handleChange}
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
            value={props.info}
            onChange={props.handleChange}
          />
        </Col>
        <Col className="form-col">
          <Form.Label>Price (€)</Form.Label>
          <Form.Control
            name="price"
            autoComplete="off"
            className={props.errors.price && "invalid-input"}
            type="text"
            value={props.price}
            onChange={props.handleChange}
            required
          />
        </Col>
        <Col className="form-col">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            autoplaceholder="aggressive"
            className={props.errors.price && "invalid-input"}
            type="tel"
            autoComplete="off"
            id="phone"
            value={props.phone}
            onChange={props.handleChange}
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

export default GeneralInfo;
