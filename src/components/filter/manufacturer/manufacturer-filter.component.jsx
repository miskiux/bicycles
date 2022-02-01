import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import {
  selectAll,
  selectCategory,
  manufacturerSelector,
} from "../../../redux/Shop/Shop.selectors";

import { getManufacturerLabel } from "../../../redux/Shop/Shop.actions";

import * as QueryString from "query-string";

import { Checkbox } from "semantic-ui-react";
import { Input } from "semantic-ui-react";

import "./manufacturer-filter.css";

const ManufacturerCheckBox = ({
  bicycles,
  getManufacturerLabel,
  queryManufacturer,
  updateQuery,
  category,
  link,
  onModalClose,
}) => {
  const [manufacturersCheckBoxOptions, setManufacturersCheckBoxOptions] =
    useState([]);
  const [checkBoxValues, setCheckBoxValues] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredSelection, setFilteredSelection] = useState([]);

  //EXISTING URL QUERY
  const [manQuery, setManQuery] = useState([]);

  //NEW QUERY
  const [newQuery, setNewQuery] = useState([]);

  //ALL QUERIES VALUES
  const [queryValues, setQueryValues] = useState([]);

  const { search } = useLocation();

  useEffect(() => {
    if (bicycles || category) {
      let all = [];
      if (link === "all") {
        all = bicycles;
      } else {
        all = category;
      }

      const val = all
        .map((bicycles) => bicycles.item.manufacturer)
        .map((x) => (typeof x === "string" ? x.toLowerCase() : x));

      const name = Array.from(new Set(val)).map(
        (item) => item.charAt(0).toUpperCase() + item.slice(1)
      );

      //setting amount
      //two different datasets
      const arrLengths = [];
      const uniqueNames = name.map((i) => i.toLowerCase());
      uniqueNames.forEach((item) => {
        arrLengths.push(getRepetitives(val, item));
      });

      const result = arrLengths.map((x, i) => ({
        name: name[i],
        value: x,
      }));

      setManufacturersCheckBoxOptions(result);
    }
  }, [bicycles, category, link]);

  useEffect(() => {
    if (search) {
      const value = QueryString.parse(search);
      let existingQuery = value.manufacturer;
      setManQuery(existingQuery);
    }
  }, [search]);

  // Setting newQuery
  useEffect(() => {
    if (checkBoxValues.length) {
      let newQuerryArr = checkBoxValues.filter((el) =>
        queryManufacturer.includes(el)
      );
      setNewQuery(newQuerryArr);
    }
  }, [queryManufacturer, checkBoxValues]);

  //changing this also
  useEffect(() => {
    let filteredManufacturer = [...manufacturersCheckBoxOptions];
    if (searchValue) {
      filteredManufacturer = filteredManufacturer.filter((man) => {
        return man.name.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
    setFilteredSelection(filteredManufacturer);
  }, [searchValue, manufacturersCheckBoxOptions]);

  useEffect(() => {
    let result = checkBoxValues;
    if (!manQuery) {
      result = result.map((el) => el);
    }
    if (manQuery && newQuery.length) {
      result = checkBoxValues;
    }
    setQueryValues(result);
  }, [manQuery, newQuery]);

  const getRepetitives = (array, value) => {
    let count = 0;
    array.forEach((v) => v === value && count++);
    return count;
  };

  const handleToggle = (label) => {
    const currentIndex = checkBoxValues.indexOf(label);
    const newChecked = [...checkBoxValues];

    if (currentIndex === -1) {
      newChecked.push(label);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckBoxValues(newChecked);
    getManufacturerLabel(label);
  };

  const onSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const confirmSubmit = () => {
    if (onModalClose) {
      onModalClose();
    }
    updateQuery(search, "manufacturer", queryValues);
  };

  return (
    <div className="manufacturer-wrapper">
      <Input placeholder="Search..." onChange={onSearchChange} />
      <div className="manufacturer-checkbox-container">
        {filteredSelection.map((label, key) => {
          return (
            <div key={key} className="manufacturer-checkbox">
              <div className="manufacturer-checkbox-selection">
                <Checkbox key={key} onChange={() => handleToggle(label.name)} />
                <span className="manufacturer-checkbox-title">
                  {label.name}
                </span>
              </div>

              <span className="manufacturer-checkbox-sum">{label.value}</span>
            </div>
          );
        })}
      </div>
      <button
        disabled={!checkBoxValues.length}
        className="confirm"
        onClick={confirmSubmit}
      >
        {" "}
        confirm{" "}
      </button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  bicycles: selectAll(state),
  category: selectCategory(ownProps.link)(state),
  queryManufacturer: manufacturerSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  getManufacturerLabel: (checkBoxValues) =>
    dispatch(getManufacturerLabel(checkBoxValues)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManufacturerCheckBox);
