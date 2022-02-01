import React from "react";
import { useDispatch } from "react-redux";

import styles from "./Dropdown.module.scss";
import StyleUtils from "src/utils/StyleUtils";
import { withVisibilityToggle } from "src/utils/hoc/withVisibilityToggle";

function DropdownComponent(props) {
  const {
    isVisible,
    fullWidth,
    options,
    verticalPos = "bottom",
    horizontalPos = "left",
    alignment = "center",
    density = "comfortable",
    title,
    disabled,
  } = props;

  const dispatch = useDispatch();

  const renderDropdown = () => {
    const classes = StyleUtils.flatten([
      styles.dropdown,
      isVisible && styles.open,
      fullWidth && styles.fullWidth,
      verticalPos === "top" && styles.top,
      verticalPos === "bottom" && styles.bottom,
      horizontalPos === "right" && styles.right,
      horizontalPos === "left" && styles.left,
      alignment === "center" && styles.alignCenter,
      alignment === "left" && styles.alignLeft,
      density === "comfortable" && styles.comfortable,
      density === "compact" && styles.compact,
    ]);

    return (
      <ul className={classes}>
        {title && <li className={styles.dropdownTitle}>{title}</li>}

        {options.map((option, i) => {
          const { disabled, separated, label, key, visible = true } = option;

          if (!visible) return null;

          return (
            <li
              key={key || i}
              onClick={() => onOptionSelect(option)}
              role="menuitem"
              className={StyleUtils.flatten([
                "position-relative",
                disabled && styles.disabled,
                separated && styles.separated,
              ])}
            >
              {/* {tooltipText ? (
                <Tooltip content={tooltipText}>{label}</Tooltip>
              ) : (
                <span>{label}</span>
              )} */}
              <span>{label}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const onOptionSelect = (option) => {
    dispatch(option.onSelected);
  };

  return (
    <div
      className={StyleUtils.flatten([
        styles.dropdownContainer,
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
      ])}
    >
      {renderDropdown()}
    </div>
  );
}

export const Dropdown = withVisibilityToggle(DropdownComponent);
