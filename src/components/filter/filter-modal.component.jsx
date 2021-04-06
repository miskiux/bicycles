import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import * as QueryString from "query-string";
import CloseIcon from "@material-ui/icons/Close";
import PriceItem from "./price/price-item.component";
import ManufacturerCheckBox from "./manufacturer/manufacturer-filter.component";
import LocationItem from "./location/location-item.component";

import { Icon, Modal } from "semantic-ui-react";
import { Accordion } from "semantic-ui-react";
import UseAnimations from "react-useanimations";
import menu2 from "react-useanimations/lib/menu2";
import "./filter-modal.styles.scss";

function FilterModal({ data }) {
  const [modal, setModal] = useState(false);

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

  const onModalClose = () => {
    setModal(false);
  };

  return (
    <>
      <Modal
        centered={false}
        onOpen={() => setModal(true)}
        open={modal}
        trigger={<div className="filter-modal-trigger">Filter</div>}
      >
        <div className="modal-filter-container">
          <Accordion fluid>
            <Accordion.Title
              className="accordion-title"
              active={activeIndex === true}
              index={true}
            >
              <div className="title-items">
                <span style={{ fontSize: "2rem" }}>Filter</span>
                <CloseIcon
                  className="filter-title-close"
                  onClick={() => setModal(false)}
                />
              </div>
            </Accordion.Title>
            <Accordion.Content active={true}>
              <Accordion className="sub-accordion">
                <Accordion.Title
                  className="sub-accordion-title"
                  active={true}
                  index={1}
                >
                  Price
                </Accordion.Title>
                <Accordion.Content active={true}>
                  <PriceItem
                    updateQuery={updateQueryStringParameter}
                    onModalClose={onModalClose}
                  />
                </Accordion.Content>
              </Accordion>
              <Accordion className="sub-accordion">
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
                    onModalClose={onModalClose}
                  />
                </Accordion.Content>
              </Accordion>
              <Accordion className="sub-accordion">
                <Accordion.Title
                  className="sub-accordion-title"
                  active={true}
                  index={3}
                >
                  Location
                </Accordion.Title>
                <Accordion.Content active={true}>
                  <LocationItem
                    updateQuery={updateQueryStringParameter}
                    onModalClose={onModalClose}
                  />
                </Accordion.Content>
              </Accordion>
            </Accordion.Content>
          </Accordion>
        </div>
        <div className="filter-clear-all">
          {price || manu || loc ? (
            <>
              <span>Clear all filters</span>
              <Icon
                className="remove-icon"
                name="remove"
                onClick={() => history.push("/shop")}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </>
  );
}
export default FilterModal;
