import React, { useState, useEffect } from "react";

import axios from "axios";
import { Hint } from "react-autocomplete-hint";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import intlTelInput from "intl-tel-input";

import { bicycleList } from "../../../assets/additional/bicycle-list.js";
import { genderList } from "../../../assets/additional/gender-list";
import "intl-tel-input/build/css/intlTelInput.css";

import "./general-info.styles.scss";

const offroadSubList = [
  "Choose..",
  "Cross Country",
  "Dirtjump",
  "Downhill",
  "Enduro",
  "Fat Bike",
  "Trail",
];
const roadSubList = [
  "Choose..",
  "Cyclocross",
  "Hybrid/Commuter",
  "Touring",
  "Track",
  "Triathlon",
];
const otherSubList = [
  "Choose..",
  "BMX",
  "Childrens",
  "Electric",
  "Folding",
  "Tandem",
  "Unicycle",
];

const GeneralInfo = (props) => {
  //categories
  const [selectedType, setSelectedType] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectSubType, setSubType] = useState("");

  const [hintData, setHintData] = useState([]);
  const [bicycleType, setBicycleType] = useState("");
  const [date, setDate] = useState("");

  const year = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => year - index);

  const getManufacturerData = () => {
    let page = 1;
    let hintArray = [];
    let maxItter = 15;

    do {
      try {
        axios
          .get(
            `https://bikeindex.org/api/v3/manufacturers?page=${page}&per_page=100`
          )
          .then((response) => {
            let manufacturerNames = Object.values(response.data).map((res) =>
              res.map((manufacturer) => manufacturer.name)
            );
            let unnestedNames = manufacturerNames.flat();
            hintArray.push(...unnestedNames);
          });
        page++;
        maxItter--;
      } catch (err) {
        console.error(`Oeps, something is wrong ${err}`);
      }
    } while (maxItter > 0);
    setHintData(hintArray);
  };

  useEffect(() => {
    getManufacturerData();
  }, []);

  useEffect(() => {
    let input = document.querySelector("#phone");
    intlTelInput(input);
  }, []);

  const genderChange = (event) => {
    setSelectedGender(event.target.value);
    props.callback("gender", event.target.value);
  };

  //subcategory
  let type = null;
  let options = null;

  if (bicycleType === "Off-Road") {
    type = offroadSubList;
  } else if (bicycleType === "Road Bicycle") {
    type = roadSubList;
  } else if (bicycleType === "Other") {
    type = otherSubList;
  } else if (
    new RegExp(["City Bicycle", "Vintage", "Custom"].join("|")).test(
      bicycleType
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
    setBicycleType(event.target.value);
    props.callback("bicycleType", event.target.value);
  };

  const handleSubCategory = (event) => {
    setSubType(event.target.value);
    props.callback("subCategory", event.target.value);
  };

  const handleYear = (event) => {
    setDate(event.target.value);
    props.callback("year", event.target.value);
  };

  return (
    <Form className="form-bootstrap">
      <Form.Row>
        <Col className="form-col" xs={5}>
          <Form.Label>Manufacturer</Form.Label>
          <Hint options={hintData}>
            <Form.Control
              type="text"
              name="manufacturer"
              autoComplete="off"
              value={props.manufacturer}
              onChange={props.handleChange}
            />
          </Hint>
        </Col>
        <Col>
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            name="model"
            autoComplete="off"
            value={props.model}
            onChange={props.handleChange}
          />
        </Col>
        <Col>
          <Form.Label>Bicycle Type</Form.Label>
          <Form.Control
            as="select"
            value={bicycleType}
            onChange={handleType}
            custom
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
            value={selectSubType}
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
            value={date}
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
        <Col>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            value={selectedGender}
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
      </Form.Row>
      <Form.Row>
        <Col>
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            autoComplete="off"
            type="text"
            value={props.price}
            onChange={props.handleChange}
          />
        </Col>
        <Col className="form-col">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            type="tel"
            autoComplete="off"
            id="phone"
            value={props.phone}
            onChange={props.handleChange}
          />
        </Col>
        <Col className="form-col">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="text"
            autoComplete="off"
            value={props.email}
            onChange={props.handleChange}
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

export default GeneralInfo;
