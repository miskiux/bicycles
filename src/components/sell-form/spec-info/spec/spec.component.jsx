import React, { useState, useEffect } from "react";

import Select from "react-select";

import "./spec.styles.css";

const specOptions = [
  {
    key: "Frame",
    label: "Frame",
    value: "Frame",
    selected: false,
  },
  {
    key: "Fork",
    label: "Fork",
    value: "Fork",
    selected: false,
  },
  {
    key: "Headset",
    label: "Headset",
    label: "Headset",
    selected: false,
  },
  {
    key: "Handlebars",
    label: "Handlebars",
    value: "Handlebars",
    selected: false,
  },
  {
    key: "Stem",
    label: "Stem",
    value: "Stem",
    selected: false,
  },
  {
    key: "Shifters",
    label: "Shifters",
    value: "Shifters",
    selected: false,
  },
  {
    key: "Grips",
    label: "Grips",
    value: "Grips",
    selected: false,
  },
  {
    key: "Saddle",
    label: "Saddle",
    value: "Saddle",
    selected: false,
  },
  {
    key: "Brakes",
    label: "Brakes",
    value: "Brakes",
    selected: false,
  },
  {
    key: "Crankset",
    label: "Crankset",
    value: "Crankset",
    selected: false,
  },
  {
    key: "Pedals",
    label: "Pedals",
    value: "Pedals",
    selected: false,
  },
  {
    key: "Chain",
    label: "Chain",
    value: "Chain",
    selected: false,
  },
  {
    key: "Rims/Wheels",
    label: "Rims/Wheels",
    value: "Rims/Wheels",
    selected: false,
  },
  {
    key: "Tires",
    label: "Tires",
    value: "Tires",
    selected: false,
  },
];

const Spec = ({id, callOption}) => {

const [selectedOption, setSelectedOption] = useState({});

const optionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    callOption(id, selectedOption);
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
