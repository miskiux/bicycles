import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import CollectionItem from "src/components/CollectionItem/CollectionItem";

import { updateLink } from "../../redux/Shop/Shop.actions";
import {
  selectCategory,
  selectFilteredByLocation,
} from "../../redux/Shop/Shop.selectors";

import "./category.styles.scss";

const CategoryPage = ({
  category,
  match,
  updateLink,
  filterData,
  locationId,
}) => {
  const [bicycleCategory, setBicycleCategory] = useState([]);
  const [nothingToDisplay, showNothingToDisplay] = useState(false);

  const { price_range, manufacturer, locations } = filterData;

  const filterprice = price_range ? price_range.split(",") : "";
  const filtermanufacturer = manufacturer ? manufacturer.split(",") : "";
  const filterlocation = locations ? locations : "";

  useEffect(() => {
    if (match.params.categoryId) {
      updateLink(match.params.categoryId);
    }
  }, [match.params.categoryId]);

  useEffect(() => {
    let result = [...category];
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
    setBicycleCategory(result);
    if (!result.length) {
      showNothingToDisplay(true);
    }
  }, [category, filterData]);

  return (
    <div className="preview">
      {bicycleCategory.map(({ id, ...otherCollectionProps }) => (
        <CollectionItem id={id} key={id} {...otherCollectionProps} />
      ))}
      {nothingToDisplay && (
        <h3 style={{ padding: "10px" }}>No bicycles to display</h3>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  category: selectCategory(ownProps.match.params.categoryId)(state),
  locationId: selectFilteredByLocation(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateLink: (link) => dispatch(updateLink(link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
