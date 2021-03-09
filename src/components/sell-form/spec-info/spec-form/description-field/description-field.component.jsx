import React from "react";
import FormInput from "../../../../form-input/form-input.component";
import "./description-field.styles.css";

function AddDescription({
  toggleSpec,
  itemData,
  addOption,
  handleChange,
  handleToggle,
  removeInput,
  removeOption,
  title,
  description,
}) {
  console.log(description);
  return (
    <div className="parts-container">
      <div className="parts-title">
        <h4>{title}</h4>
      </div>
      {itemData.map(({ item, idx, value }) => (
        <div key={idx} className="bottom-item-wrapper">
          <div className="bottom-item">
            <FormInput
              inputStyle="description-field"
              label={item}
              name={item}
              value={value}
              type="text"
              handleChange={(e) => handleChange(e, idx)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
export default AddDescription;
