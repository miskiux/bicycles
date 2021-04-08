import React, { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import { BicycleSpecs } from "../../../../assets/additional/form-helpers";
import { Form } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import "./description-updated.styles.scss";

export const DescriptionUpdate = (props) => {
  const newItems = [];
  const [restricted, setRestricted] = useState(false);

  function addNewItem() {
    const lastItem = props.description.length
      ? props.description[props.description.length - 1]
      : [{ item: "a" }];
    const values = [...newItems];

    if (lastItem.item !== "") {
      values.push({ idx: uuidv4(), item: "", value: "" });
      props.combineDescriptions(values);
      setRestricted(false);
    } else {
      setRestricted(true);
    }
  }

  return (
    <>
      {props.edit ? (
        <div className="description-update-form">
          {props.description.map(({ item, value, idx }) => (
            <Form.Group key={idx}>
              <div className="description-label-wrapper">
                <Form.Control
                  as="select"
                  size="sm"
                  className="spec-select"
                  onChange={(e) => props.labelChange(e, idx)}
                  value={item}
                  custom
                  disabled={!props.edit}
                >
                  {BicycleSpecs.map(({ item, value, idx }) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Control>
                {props.edit && (
                  <ClearIcon
                    className="remove-old"
                    onClick={() => props.removeDescription(idx)}
                  />
                )}
              </div>
              <Form.Control
                className="input-field"
                type="text"
                size="sm"
                autoComplete="off"
                value={value}
                onChange={(e) => props.valueChange(e, idx)}
                disabled={!props.edit}
              />
            </Form.Group>
          ))}
          {props.edit && (
            <div
              className={`${
                restricted && "add-restricred-wrapper"
              } add-spec-wrapper`}
              onClick={addNewItem}
            >
              <AddIcon />
            </div>
          )}
        </div>
      ) : (
        <div className="description-update-form">
          {props.item.description.map(({ item, value, idx }) => (
            <Form.Group key={idx}>
              <div className="description-label-wrapper">
                <Form.Control
                  as="select"
                  size="sm"
                  className="spec-select"
                  onChange={(e) => props.labelChange(e, idx)}
                  value={item}
                  custom
                  disabled={!props.edit}
                >
                  {BicycleSpecs.map(({ item, value, idx }) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Control>
                {props.edit && (
                  <ClearIcon
                    className="remove-old"
                    onClick={() => props.removeDescription(idx)}
                  />
                )}
              </div>
              <Form.Control
                className="input-field"
                type="text"
                size="sm"
                autoComplete="off"
                value={value}
                onChange={(e) => props.valueChange(e, idx)}
                disabled={!props.edit}
              />
            </Form.Group>
          ))}
          {props.edit && (
            <div
              className={`${
                restricted && "add-restricred-wrapper"
              } add-spec-wrapper`}
              onClick={addNewItem}
            >
              <AddIcon />
            </div>
          )}
        </div>
      )}
      {props.description.length === 0 && !props.edit && (
        <span
          style={{ fontSize: "20px", padding: "0px", position: "absolute" }}
        >
          {" "}
          ' Click change to add bicycle specifications '
        </span>
      )}
      {props.errors.description && (
        <span className="error-text">
          {Object.values(props.errors.description)}
        </span>
      )}
    </>
  );
};
