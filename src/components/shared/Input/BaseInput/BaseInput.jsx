import React from "react";
import styles from "./BaseInput.module.scss";
import StyleUtils from "src/utils/StyleUtils";

export function BaseInput(props) {
  const {
    error,
    disabled,
    small,
    value,
    onChange,
    id,
    name,
    placeholder,
    onClick,
    required,
    readonly,
    label,
    fullWidth,
    children,
    onKeyPress,
  } = props;

  const renderedLabel = () => {
    if (!label) return null;

    return <span className={styles.label}>{label}</span>;
  };

  const renderedInput = () => {
    const classes = StyleUtils.flatten([
      styles.input,
      error && styles.invalid,
      disabled && styles.disabled,
      small && styles.small,
      value && styles.hasValue,
    ]);

    return (
      <>
        <input
          className={classes}
          id={id}
          name={name}
          type="text"
          placeholder={placeholder}
          onChange={(event) => onChange(event)}
          onKeyPress={onKeyPress}
          autoComplete="off"
          onClick={onClick}
          value={value}
          disabled={disabled}
          required={required}
          readOnly={readonly}
        />
      </>
    );
  };

  const classes = StyleUtils.flatten([
    styles.inputContainer,
    styles.input,
    styles.baseInput,
    error && styles.invalid,
    fullWidth && styles.fullWidth,
  ]);

  return (
    <label className={classes}>
      {renderedLabel()}
      {renderedInput()}
      <div className={styles.errors}>
        <div>{error}</div>
      </div>

      {children}
    </label>
  );
}
