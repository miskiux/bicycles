import React, { useState, useEffect } from "react";

import Select from "react-select";

import "./spec.styles.css";

const specOptions = [
  {
    key: "Frame",
    label: "Frame",
    value: "Frame",
  },
  {
    key: "Fork",
    label: "Fork",
    value: "Fork",
  },
  {
    key: "Headset",
    label: "Headset",
    label: "Headset",
  },
  {
    key: "Handlebars",
    label: "Handlebars",
    value: "Handlebars",
  },
  {
    key: "Stem",
    label: "Stem",
    value: "Stem",
  },
  {
    key: "Shifters",
    label: "Shifters",
    value: "Shifters",
  },
  {
    key: "Grips",
    label: "Grips",
    value: "Grips",
  },
  {
    key: "Saddle",
    label: "Saddle",
    value: "Saddle",
  },
  {
    key: "Brakes",
    label: "Brakes",
    value: "Brakes",
  },
  {
    key: "Crankset",
    label: "Crankset",
    value: "Crankset",
  },
  {
    key: "Pedals",
    label: "Pedals",
    value: "Pedals",
  },
  {
    key: "Chain",
    label: "Chain",
    value: "Chain",
  },
  {
    key: "Rims/Wheels",
    label: "Rims/Wheels",
    value: "Rims/Wheels",
  },
  {
    key: "Tires",
    label: "Tires",
    value: "Tires",
  },
];

const Spec = ({id, callOption, handleToggle}) => {

const [selectedOption, setSelectedOption] = useState({});

const optionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    callOption(id, selectedOption);
    handleToggle(id)
  }

  return (
    <div className="select">
        <Select
          value={selectedOption}
          onChange={(value) => optionChange(value)}
          options={specOptions}
          />
    </div>
  );
};

export default Spec;
