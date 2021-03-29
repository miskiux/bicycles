import React, { useState, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";

import * as QueryString from "query-string";

import PriceItem from "./price/price-item.component";
import ManufacturerCheckBox from "./manufacturer/manufacturer-filter.component";
import LocationItem from "./location/location-item.component";

import { Dropdown, Button, Icon } from "semantic-ui-react";
import { Accordion } from "semantic-ui-react";
import UseAnimations from "react-useanimations";
import menu2 from "react-useanimations/lib/menu2";
import "./filter.styles.scss";

const Filter = ({ data }) => {
  const { price_range, manufacturer, locations } = data;

  const history = useHistory();
  const { search } = useLocation();

  const [activeIndex, setActiveIndex] = useState(true);
  const [subIndex, setSubIndex] = useState(1);

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

  const level2Panels = [
    { key: "panel-2a", title: "Level 2A", content: "Level 2A Contents" },
    { key: "panel-2b", title: "Level 2B", content: "Level 2B Contents" },
  ];

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

  const handleClick = () => {
    setActiveIndex((i) => !i);
  };

  const handleSubClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = subIndex === index ? -1 : index;

    setSubIndex(newIndex);
  };

  return (
    <div className="filter-container">
      <Accordion fluid className="accordion-wrapper">
        <Accordion.Title
          className="accordion-title"
          active={activeIndex === true}
          index={true}
          onClick={handleClick}
        >
          <div className="filter-trigger">
            <UseAnimations
              reverse={activeIndex}
              animation={menu2}
              size={56}
              wrapperStyle={{ alignSelf: "flex-start" }}
            />
            <span>Filter</span>
          </div>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === true}>
          <Accordion>
            <Accordion.Title
              className="sub-accordion-title"
              active={subIndex === 1}
              index={1}
              onClick={handleSubClick}
            >
              Price
            </Accordion.Title>
            <Accordion.Content active={subIndex === 1}>
              <PriceItem updateQuery={updateQueryStringParameter} />
            </Accordion.Content>
          </Accordion>
          <Accordion>
            <Accordion.Title
              className="sub-accordion-title"
              active={subIndex === 2}
              index={2}
              onClick={handleSubClick}
            >
              Manufacturer
            </Accordion.Title>
            <Accordion.Content active={subIndex === 2}>
              <ManufacturerCheckBox updateQuery={updateQueryStringParameter} />
            </Accordion.Content>
          </Accordion>
          <Accordion>
            <Accordion.Title
              className="sub-accordion-title"
              active={subIndex === 3}
              index={3}
              onClick={handleSubClick}
            >
              Location
            </Accordion.Title>
            <Accordion.Content active={subIndex === 3}>
              <LocationItem updateQuery={updateQueryStringParameter} />
            </Accordion.Content>
          </Accordion>
        </Accordion.Content>
      </Accordion>
      {/* <div className="filter-options">
        <Dropdown className="filter-selection" text="Price" open={true}>
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
          open={true}
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
          open={true}
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
      )} */}
    </div>
  );
};

export default Filter;
