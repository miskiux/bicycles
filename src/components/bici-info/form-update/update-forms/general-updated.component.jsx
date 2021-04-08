import React from "react";
import { Col, Form } from "react-bootstrap";
import { Hint } from "react-autocomplete-hint";

import {
  bicycleList,
  genderList,
} from "../../../../assets/additional/form-helpers.js";

// phone
// description
// errors

export const GeneralUpdate = (props) => {
  return (
    <>
      <Form.Row>
        <Col className="general-update-col">
          <Form.Label>Manufacturer</Form.Label>
          <Hint options={props.hintData}>
            <Form.Control
              className={`${
                props.errors.manufacturer ? "input-field-error" : "input-field"
              }`}
              type="text"
              size="sm"
              name="manufacturer"
              ref={props.register}
              autoComplete="off"
              value={
                props.edit ? props.update.manufacturer : props.item.manufacturer
              }
              onChange={props.handleChange}
              required
              disabled={!props.edit}
            />
          </Hint>
          <Form.Label>Model</Form.Label>
          <Form.Control
            className={`${
              props.errors.model ? "input-field-error" : "input-field"
            }`}
            ref={props.register}
            type="text"
            size="sm"
            name="model"
            autoComplete="off"
            value={props.edit ? props.update.model : props.item.model}
            onChange={props.handleChange}
            required
            disabled={!props.edit}
          />
          <Form.Label>Bicycle Type</Form.Label>
          <Form.Control
            as="select"
            className={`${
              props.errors.bicycleType ? "input-field-error" : "input-field"
            }`}
            ref={props.register}
            name="bicycleType"
            size="sm"
            value={props.edit ? props.update.bicycleType : props.bicycleType}
            onChange={props.handleChange}
            custom
            required
            disabled={!props.edit}
          >
            {bicycleList.map(({ key, label, value }) => (
              <option key={key} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
          <Form.Label>Sub Type</Form.Label>
          <Form.Control
            as="select"
            ref={props.register}
            name="subCategory"
            value={props.edit ? props.update.subCategory : props.subCategory}
            onChange={props.handleChange}
            custom
            size="sm"
            disabled={!props.edit}
          >
            {props.options}
          </Form.Control>
          <Form.Label>Year</Form.Label>
          <Form.Control
            as="select"
            ref={props.register}
            size="sm"
            name="year"
            value={props.edit ? props.update.year : props.item.year}
            onChange={props.handleChange}
            custom
            disabled={!props.edit}
          >
            {props.years.map((year, index) => (
              <option key={`year${index}`} value={year}>
                {year}
              </option>
            ))}
          </Form.Control>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            ref={props.register}
            size="sm"
            name="gender"
            value={props.edit ? props.update.gender : props.item.gender}
            onChange={props.handleChange}
            custom
            disabled={!props.edit}
          >
            {genderList.map(({ key, label, value }) => (
              <option key={key} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
          <Form.Label>Size (cm)</Form.Label>
          <Form.Control
            type="text"
            ref={props.register}
            name="size"
            size="sm"
            value={props.edit ? props.update.size : props.item.size}
            onChange={props.handleChange}
            disabled={!props.edit}
          ></Form.Control>
          <Form.Label>Condition</Form.Label>
          <div className="mb">
            <Form.Check
              inline
              label="New"
              ref={props.register}
              name="condition"
              type="radio"
              value="New"
              checked={
                props.edit
                  ? props.update.condition === "New"
                  : props.item.condition
              }
              onChange={props.handleChange}
              disabled={!props.edit}
            />
            <Form.Check
              inline
              ref={props.register}
              label="Used"
              name="condition"
              type="radio"
              value="Used"
              checked={
                props.edit
                  ? props.update.condition === "Used"
                  : props.item.condition
              }
              onChange={props.handleChange}
              disabled={!props.edit}
            />
          </div>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col className="general-update-col">
          <Form.Label>Additional Information</Form.Label>
          <Form.Control
            as="textarea"
            ref={props.register}
            name="info"
            style={{ height: "80px", resize: "none" }}
            className="info-input"
            type="text"
            value={props.edit ? props.update.info : props.item.info}
            onChange={props.handleChange}
            disabled={!props.edit}
          />
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            className={`${
              props.errors.price ? "input-field-error" : "input-field"
            }`}
            ref={props.register}
            size="sm"
            autoComplete="off"
            type="text"
            value={props.edit ? props.update.price : props.item.price}
            onChange={props.handleChange}
            required
            disabled={!props.edit}
          />

          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            className={`${
              props.errors.phone ? "input-field-error" : "input-field"
            }`}
            ref={props.register}
            size="sm"
            autoplaceholder="aggressive"
            type="tel"
            autoComplete="off"
            id="phone"
            value={props.edit ? props.update.phone : props.phone}
            onChange={props.handleChange}
            disabled={!props.edit}
          />
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            className={`${
              props.errors.address ? "input-field-error" : "input-field"
            }`}
            ref={props.register}
            size="sm"
            autoplaceholder="aggressive"
            type="tel"
            value={props.edit ? props.update.address : props.item.address}
            onChange={props.handleChange}
            disabled={!props.edit}
          />
        </Col>
      </Form.Row>
    </>
  );
};
