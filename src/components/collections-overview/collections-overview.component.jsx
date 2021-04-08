import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import CollectionItem from "../collection-item/collection-item.component";

import { selectAll } from "../../redux/shop/shop.selectors";
import { selectFilteredByLocation } from "../../redux/shop/shop.selectors";
import { selectToggleCarousel } from "../../redux/shop/shop.selectors";

import { updateLink } from "../../redux/shop/shop.actions";
import { toggleCarousel } from "../../redux/shop/shop.actions";

import "./collections-overview.styles.scss";

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
        <LazyLoad key={id} height={200} offset={100} once>
          <CollectionItem key={id} id={id} {...otherCollectionProps} />
        </LazyLoad>
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
