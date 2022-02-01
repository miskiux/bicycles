import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CollectionItem from "../CollectionItem/CollectionItem";

import { selectAll } from "../../redux/Shop/Shop.selectors";
import { selectFilteredByLocation } from "../../redux/Shop/Shop.selectors";
import { selectToggleCarousel } from "../../redux/Shop/Shop.selectors";

import { updateLink } from "../../redux/Shop/Shop.actions";
import { toggleCarousel } from "../../redux/Shop/Shop.actions";

import "./CollectionsOverview.styles.scss";

const CollectionsOverview = ({
  match,
  bicycles,
  toggleHeader,
  toggleCarousel,
  locationId,
  filterData,
  updateLink,
}) => {
  const [filteredBicycles, setFilteredBicycles] = useState([]);
  const [nothingToDisplay, showNothingToDisplay] = useState(false);
  const { price_range, manufacturer, locations } = filterData;

  const filterprice = price_range ? price_range.split(",") : "";
  const filtermanufacturer = manufacturer ? manufacturer.split(",") : "";
  const filterlocation = locations ? locations : "";

  useEffect(() => {
    let result = [...bicycles];
    showNothingToDisplay(false);
    if (filterprice) {
      result = result.filter(
        (bicycle) =>
          bicycle.item.price >= Number(filterprice[0]) &&
          bicycle.item.price <= Number(filterprice[1])
      );
    }
    if (filtermanufacturer) {
      result = result.filter((bicycle) =>
        bicycle.item.manufacturer
          .toLowerCase()
          .includes(filtermanufacturer.join().toLowerCase())
      );
    }
    if (filterlocation) {
      result = locationId;
    }
    setFilteredBicycles(result);
    if (!result.length) {
      showNothingToDisplay(true);
    }
  }, [bicycles, filterData]);

  useEffect(() => {
    if (toggleHeader === false) {
      toggleCarousel();
    }
  }, []);

  useEffect(() => {
    if (!Object.keys(match.params).length) {
      updateLink("all");
    }
  }, [match.params]);

  return (
    <div className="preview">
      {filteredBicycles.map(({ id, ...otherCollectionProps }) => (
        <CollectionItem key={id} id={id} {...otherCollectionProps} />
      ))}
      {nothingToDisplay && (
        <h3 style={{ padding: "10px" }}>No bicycles to display</h3>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  bicycles: selectAll(state),
  locationId: selectFilteredByLocation(state),
  toggleHeader: selectToggleCarousel(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleCarousel: () => dispatch(toggleCarousel()),
  updateLink: (link) => dispatch(updateLink(link)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsOverview);
