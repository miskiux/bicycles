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

  return (
    <div className="filter-container">
      <Accordion fluid>
        <Accordion.Title className="accordion-title">
          <div className="filter-trigger">
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
          <Accordion className="sub-accordion">
            <Accordion.Title className="sub-accordion-title">
              Price
            </Accordion.Title>
            <Accordion.Content active={true}>
              <PriceItem updateQuery={updateQueryStringParameter} />
            </Accordion.Content>
          </Accordion>
          <Accordion className="sub-accordion">
            <Accordion.Title className="sub-accordion-title">
              Manufacturer
            </Accordion.Title>
            <Accordion.Content active={true}>
              <ManufacturerCheckBox
                updateQuery={updateQueryStringParameter}
                link={link}
              />
            </Accordion.Content>
          </Accordion>
          <Accordion className="sub-accordion">
            <Accordion.Title className="sub-accordion-title">
              Location
            </Accordion.Title>
            <Accordion.Content active={true}>
              <LocationItem updateQuery={updateQueryStringParameter} />
            </Accordion.Content>
          </Accordion>
        </Accordion.Content>
      </Accordion>
    </div>
  );
};

export default Filter;
