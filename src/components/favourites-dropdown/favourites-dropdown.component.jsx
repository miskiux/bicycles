import React, { useEffect, useState } from "react";

import FavouriteItem from "../favourite-item/favourite-item.component";

import { selectFavouriteItems } from "../../redux/side-nav/side-nav.selectors";
import { selectAll } from "../../redux/shop/shop.selectors";

import { clearItemFromFavourites } from "../../redux/side-nav/side-nav.actions";
import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

import "./favourites-dropdown.styles.scss";

const FavouriteDropdown = ({
  favouriteItems,
  bicycles,
  clearItemFromFavourites,
}) => {
  const [invalidId, setInvalidId] = useState([]);

  useEffect(() => {
    const filteredFav = favouriteItems.filter(
      ({ id: x }) => !bicycles.some(({ id: y }) => x === y)
    );
    const filteredVal = Object.values(filteredFav).map((i) => i.id);
    console.log(filteredVal);
    setInvalidId(filteredVal);
  }, [bicycles, favouriteItems]);

  useEffect(() => {
    if (invalidId) {
      invalidId.map((id) => clearItemFromFavourites(id));
    }
  }, [invalidId, clearItemFromFavourites]);

  return (
    <div className="favourite-items-wrapper">
      {favouriteItems.length ? (
        favouriteItems.map(({ id, item }) => (
          <div className="favourite-item" key={id}>
            <FavouriteItem item={item} id={id} />
            <Icon
              className="remove-icon"
              name="remove"
              onClick={() => clearItemFromFavourites(id)}
            />
          </div>
        ))
      ) : (
        <span className="empty-message">You have no favourites</span>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  favouriteItems: selectFavouriteItems(state),
  bicycles: selectAll(state),
});

const mapDispatchToProps = (dispatch) => ({
  clearItemFromFavourites: (id) => dispatch(clearItemFromFavourites(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteDropdown);
