import React from "react";

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
