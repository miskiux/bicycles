import React, { useState, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";

import * as QueryString from "query-string";

import PriceItem from "./price/price-item.component";
import ManufacturerCheckBox from "./manufacturer/manufacturer-filter.component";
import LocationItem from "./location/location-item.component";

import { Dropdown, Button, Icon } from "semantic-ui-react";

import "./filter.styles.css";

const Filter = ({ data }) => {
  const [visibleManufacturer, setVisibleManufacturer] = useState(true);

  const { price_range, manufacturer, locations } = data;

  const history = useHistory();
  const { search } = useLocation();

  const price = price_range ? price_range.split(",") : "";
  const manu = manufacturer ? manufacturer.split(",") : "";
  const loc = locations ? locations : "";

  const updateQueryStringParameter = (uri, key, val) => {
    let result = "";
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
      result = uri.replace(re, "$1" + key + "=" + val + "$2");
    } else {
      result = uri + separator + key + "=" + val;
    }

    history.push({
      pathname: "/shop",
      search: `${result}`,
    });
  };

  const removeQueryString = (uri, key, val) => {
    const queryValue = QueryString.parse(uri);
    const { manufacturer, price_range, location } = queryValue;
    let modifiedObj = { ...queryValue };

    if (key === "manufacturer") {
      let manArr = manufacturer.split(",");
      let newItems = manArr.filter((i) => !i.includes(val));
      modifiedObj = { ...queryValue, [key]: newItems };
      if (manArr.length === 1) {
        delete modifiedObj[key];
      }
    }
    if (key === "price_range") {
      delete modifiedObj[key];
    }
    if (key === "locations") {
      delete modifiedObj[key];
    }
    const queryString = QueryString.stringify(modifiedObj);

    history.push({
      pathname: "/shop",
      search: `${queryString}`,
    });
  };

  return (
    <>
      <div className="filter-container">
        <div className="filter-options">
          <Dropdown
            className="filter-selection"
            placeholder="Price"
            selectOnBlur={false}
            closeOnBlur={false}
          >
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                <div className="filter-option">
                  <PriceItem updateQuery={updateQueryStringParameter} />
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            className="filter-selection"
            placeholder="Manufacturer"
            selectOnBlur={false}
            closeOnBlur={false}
          >
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                <div className="filter-option">
                  <ManufacturerCheckBox
                    updateQuery={updateQueryStringParameter}
                  />
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            className="filter-selection"
            placeholder="Location"
            selectOnBlur={false}
            closeOnBlur={false}
          >
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                <div className="filter-option">
                  <LocationItem updateQuery={updateQueryStringParameter} />
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {price || manu || loc ? (
        <div class="ui animated button" tabIndex="0">
          <div class="visible content">
            <span>{"Reset All"}</span>
          </div>
          <div class="hidden content">
            <i
              class="close icon"
              onClick={() => {
                history.push("/shop");
              }}
            ></i>
          </div>
        </div>
      ) : (
        ""
      )}
      {price ? (
        <div class="ui animated button" tabIndex="0">
          <div class="visible content">
            <span>{`${price[0]} - ${price[1]}`}</span>
          </div>
          <div class="hidden content">
            <i
              class="close icon"
              onClick={() => {
                removeQueryString(search, "price_range", price);
              }}
            ></i>
          </div>
        </div>
      ) : (
        ""
      )}
      {manu ? (
        <div>
          {manu.map((item, index) => (
            <div key={index} class="ui animated button" tabIndex="0">
              <div class="visible content">
                <span>{item}</span>
              </div>
              <div class="hidden content">
                <i
                  class="close icon"
                  onClick={() => {
                    removeQueryString(search, "manufacturer", manu[index]);
                  }}
                ></i>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      {loc ? (
        <div class="ui animated button" tabIndex="0">
          <div class="visible content">
            <span>{`Bicycles: ${loc}`}</span>
          </div>
          <div class="hidden content">
            <i
              class="close icon"
              onClick={() => {
                removeQueryString(search, "locations", loc);
              }}
            ></i>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Filter;
