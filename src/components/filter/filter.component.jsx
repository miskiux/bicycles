import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import * as QueryString from "query-string";

import PriceItem from "./price/price-item.component";
import ManufacturerCheckBox from "./manufacturer/manufacturer-filter.component";
import LocationItem from "./location/location-item.component";

import { Icon, Modal } from "semantic-ui-react";
import { Accordion } from "semantic-ui-react";
import UseAnimations from "react-useanimations";
import menu2 from "react-useanimations/lib/menu2";
import "./filter.styles.scss";

const Filter = ({ data, toggleFilter, isBreakPoint }) => {
  const { price_range, manufacturer, locations } = data;
  const link = useSelector((state) => state.shop.activeLink);
  const match = useRouteMatch("/shop/:categoryId");

  const routeOption = match ? match.url : "/shop";

  const history = useHistory();

  const [activeIndex, setActiveIndex] = useState(true);
  const [subIndex, setSubIndex] = useState(false);

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
      pathname: `${routeOption}`,
      search: `${result}`,
    });
  };

  const handleSubClick = () => {
    setSubIndex((i) => !i);
  };

  return (
    <div
      className="filter-container"
      // className={`${
      //   isBreakPoint ? "modal-filter-container" : "filter-container"
      // }`}
    >
      <Accordion fluid>
        <Accordion.Title
          className="accordion-title"
          active={activeIndex === true}
          index={true}
        >
          <div className="filter-trigger" onClick={handleSubClick}>
            <span>Filter</span>
            {price || manu || loc ? (
              <Icon
                className="remove-icon"
                name="remove"
                onClick={() => history.push("/shop")}
              />
            ) : (
              ""
            )}
          </div>
        </Accordion.Title>
        <Accordion.Content className="filter-content" active={true}>
          <Accordion
            className="sub-accordion"
            // className={`${
            //   isBreakPoint ? "modal-filter-content" : "sub-accordion"
            // }`}
          >
            <Accordion.Title
              className="sub-accordion-title"
              active={true}
              index={1}
            >
              Price
            </Accordion.Title>
            <Accordion.Content active={true}>
              <PriceItem updateQuery={updateQueryStringParameter} />
            </Accordion.Content>
          </Accordion>
          <Accordion
            className="sub-accordion"
            // className={`${
            //   isBreakPoint ? "modal-filter-content" : "sub-accordion"
            // }`}
          >
            <Accordion.Title
              className="sub-accordion-title"
              active={true}
              index={2}
            >
              Manufacturer
            </Accordion.Title>
            <Accordion.Content active={true}>
              <ManufacturerCheckBox
                updateQuery={updateQueryStringParameter}
                link={link}
              />
            </Accordion.Content>
          </Accordion>
          <Accordion
            className="sub-accordion"
            // className={`${
            //   isBreakPoint ? "modal-filter-content" : "sub-accordion"
            // }`}
          >
            <Accordion.Title
              className="sub-accordion-title"
              active={true}
              index={3}
            >
              Location
            </Accordion.Title>
            <Accordion.Content active={true}>
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
