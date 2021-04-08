import React from "react";

import { useHistory } from "react-router-dom";

import "./favourite-item.styles.scss";

const FavouriteItem = ({
  item,
  clearItemFromFavourites,
  id,
  toggleSideNav,
}) => {
  const { price, manufacturer, model } = item;

  const history = useHistory();

  const redirectToView = () => {
    history.push(`/item/${id}`);
  };

  return (
    <>
      <div className="item-details" onClick={redirectToView}>
        <div className="name">
          <span>{manufacturer}</span>
          <span>{model}</span>
        </div>
        <span className="card-price">€{price}</span>
      </div>
    </>
  );
};

export default FavouriteItem;
