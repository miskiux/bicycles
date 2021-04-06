import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { updateLink } from "../../redux/shop/shop.actions";
import {
  selectCategory,
  selectFilteredByLocation,
} from "../../redux/shop/shop.selectors";

import "./category.styles.scss";

const CategoryPage = ({
  category,
  match,
  updateLink,
  filterData,
  locationId,
}) => {
  const [bicycleCategory, setBicycleCategory] = useState([]);

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
  }, [category, filterData]);

  return (
    <div className="preview">
      {bicycleCategory.map(({ id, ...otherCollectionProps }) => (
        <CollectionItem id={id} key={id} {...otherCollectionProps} />
      ))}
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
