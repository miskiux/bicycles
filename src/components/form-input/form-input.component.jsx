import React from "react";

import "./form-input.styles.scss";

const FormInput = ({
  handleChange,
  register,
  label,
  inputStyle,
  max,
  ...otherProps
}) => (
  <div className="group">
    <input
      className={inputStyle}
      onChange={handleChange}
      maxLength={max}
      ref={register}
      {...otherProps}
    />
    {label ? (
      <label
        className={`${otherProps.value.length ? "shrink" : ""}
			 form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
