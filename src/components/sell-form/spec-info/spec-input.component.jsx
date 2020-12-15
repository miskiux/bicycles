import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import Spec from "./spec.component";

import AddIcon from "@material-ui/icons/Add";

import { Dropdown } from "semantic-ui-react";

import { selectBicycleSpec } from "../../../redux/sell/sell.selectors";
import { AddSpec } from "../../../redux/sell/sell.actions";

import { v4 as uuidv4 } from "uuid";
import Select from "react-select";

import "./spec-input.styles.css";


const SpecInput = ({specs, handleChange}) => {

  return (
    <div>
      {specs.map((spec, index) => (
        <div key={index}>
          <input onChange={(e) => handleChange(e, index)} type="text" />
        </div>
      ))}
    </div>
  );
};


export default SpecInput;
