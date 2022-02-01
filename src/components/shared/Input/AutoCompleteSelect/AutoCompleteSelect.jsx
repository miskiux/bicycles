import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { toggleAutoCompleteDropdown } from "src/redux/UI/UI.actions";
import { BaseInput } from "src/components/Shared/Input/BaseInput/BaseInput";
import { Dropdown } from "src/components/Shared/Dropdown/Dropdown";

export function AutoCompleteInput(props) {
  const {
    value,
    label,
    placeholder,
    disabled,
    error,
    icon,
    isLoading,
    name,
    required,
    options,
    onChange,
    fullWidth,
  } = props;

  const dispatch = useDispatch();
  const parentRef = useRef();

  const handleDrodown = () => {
    dispatch(toggleAutoCompleteDropdown());
  };

  return (
    <>
      <div ref={parentRef}>
        <BaseInput
          label={label}
          disabled={disabled}
          error={error}
          name={name}
          required={required}
          fullWidth={fullWidth}
          value={value}
          isLoading={isLoading}
          placeholder={placeholder}
          icon={icon}
          onClick={handleDrodown}
          onChange={onChange}
          onKeyPress={handleDrodown}
        />
      </div>

      <Dropdown
        fullWidth
        options={options}
        handleDrodown={handleDrodown}
        parentContainer={parentRef}
      />
    </>
  );
}
