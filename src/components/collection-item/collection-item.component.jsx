import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";

import {
  addItem,
  clearItemFromFavourites,
} from "../../redux/side-nav/side-nav.actions";
import { selectFavouriteItems } from "../../redux/side-nav/side-nav.selectors";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useProgressiveImage } from "../../hooks/useProgressiveImage";
import { Icon } from "semantic-ui-react";
import {
  SpinnerContainer,
  SpinnerOverlay,
} from "../with-spinner/with-spinner.styles";

import "./collection-item.styles.scss";

const CollectionItem = ({
  item,
  addItem,
  id,
  favourites,
  clearItemFromFavourites,
}) => {
  const [index, setIndex] = useState(0);
  //const [didLoad, setLoad] = useState(false);
  const [bookmarked, setBookMarked] = useState([]);
  const [itemSpecs, setItemSpecs] = useState([]);

  const images = item.url;
  const {
    manufacturer,
    model,
    price,
    year,
    size,
    condition,
    description,
  } = item;

  const { sourceLoaded, didLoad } = useProgressiveImage(images[index]);
  const imageStyle = didLoad
    ? { maxWidth: 100 + "%", maxHeight: "250px", minHeight: "250px" }
    : { visibility: "hidden" };

  useEffect(() => {
    const existingIds = favourites.map(({ id }) => id);
    setBookMarked(existingIds);
  }, [favourites, id]);

  useEffect(() => {
    let values = description.map(({ value }) => value);
    values.sort(() => 0.5 - Math.random());
    let twoValues = values.slice(0, 2);
    setItemSpecs(twoValues);
  }, [description]);

  const onClickForward = () => {
    setIndex((index + 1) % images.length);
  };

  const onClickBackwards = () => {
    let nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(nextIndex);
    }
  };

  const history = useHistory();

  const NavigateToView = () => {
    history.push({
      pathname: `/item/${id}`,
    });
  };

  const addingToList = (id, item) => {
    const existingIds = favourites.map(({ id }) => id);
    console.log(existingIds);
    console.log(id);
    if (!existingIds.includes(id)) {
      addItem({ id, item });
    } else {
      clearItemFromFavourites(id);
    }
  };

  return (
    <div className="collection-item">
      {didLoad && (
        <>
          <div className="bookmark-wrapper">
            {bookmarked.includes(id) ? (
              <Icon
                className="bookmark"
                name="bookmark"
                onClick={() => addingToList(id, item)}
              />
            ) : (
              <Icon
                className="bookmark"
                name="bookmark outline"
                onClick={() => addingToList(id, item)}
              />
            )}
          </div>

          <div className="arrow-container">
            <div className="image-arrows">
              <Icon name="arrow left" onClick={onClickBackwards} />
              <Icon name="arrow right" onClick={onClickForward} />
            </div>
          </div>
          {condition && (
            <div className="collection-item-condition">
              <span style={{ fontSize: "0.75rem" }}>{condition}</span>
            </div>
          )}
        </>
      )}
      <Suspense
        fallback={
          <SpinnerOverlay>
            <SpinnerContainer />
          </SpinnerOverlay>
        }
      >
        <div
          style={{ backgroundImage: `url(${sourceLoaded})` }}
          className="collection-item-image"
        />
      </Suspense>
      {didLoad ? (
        <div className="collection-menu" onClick={NavigateToView}>
          <div className="collection-footer">
            <div className="model-manufacturer">
              <span className="manufacturer-name">{manufacturer}</span>
              <span className="model-name">{model}</span>
            </div>
            <span className="price">${price}</span>
          </div>
          <div>
            {description.length !== 0 && (
              <ul className="description-items">
                {itemSpecs.map((i, index) => (
                  <li className="description-items-title" key={index}>
                    {i.toUpperCase()}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="collection-menu-icons">
            {size && (
              <div className="collection-item-circle">
                <span className="collection-menu-item-title">{size}</span>
                <span style={{ fontSize: "0.5rem", margin: "-9px" }}>cm</span>
              </div>
            )}
            {year && (
              <div className="collection-item-date">
                <Icon name="calendar alternate outline" />
                <span className="collection-menu-item-title">{year}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  favourites: selectFavouriteItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  clearItemFromFavourites: (id) => dispatch(clearItemFromFavourites(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);
