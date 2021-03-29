import React, { useState, useEffect, useRef } from "react";
import { BicycleSpecs } from "../../../../assets/additional/form-helpers";
import { Form } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "semantic-ui-react";

export const DescriptionUpdate = (props) => {
  // possible moving specs data to assets
  // moving everything to the parent
  const [availableSpecs, setAvailableSpecs] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [restricted, setRestricted] = useState(false);
  const [showDeleteOld, setShowDeleteOld] = useState(0);
  const [showDeleteNew, setShowDeleteNew] = useState(0);

  useEffect(() => {
    const filteredSpecs = BicycleSpecs.filter(
      ({ idx: x }) => !props.description.some(({ idx: y }) => x === y)
    );
    setAvailableSpecs(filteredSpecs);
  }, [props.description]);

  const addNewItem = () => {
    const lastItem = props.description.length
      ? props.description[props.description.length - 1]
      : [{ item: "a" }];
    const values = [...newItems];
    console.log(lastItem);
    console.log(props.description);
    if (lastItem.item !== "") {
      values.push({ idx: uuidv4(), item: "", value: "" });
      props.combineDescriptions(values);
      setRestricted(false);
    } else {
      setRestricted(true);
    }
  };

  const showOld = (id) => {
    setShowDeleteOld(id);
  };
  const hideOld = () => {
    setShowDeleteOld(null);
  };
  const showNew = (id) => {
    setShowDeleteNew(id);
  };
  const hideNew = () => {
    setShowDeleteNew(null);
  };

  const deleteNewSpec = (idx) => {
    const values = newItems.filter((item) => item.id !== idx);
    setNewItems(values);
  };

  return (
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
              required
            >
              {BicycleSpecs.map(({ item, value, idx }) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </Form.Control>
            {idx === showDeleteNew && (
              <Icon
                className="remove-old"
                name="remove"
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
            required
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
  );
};
