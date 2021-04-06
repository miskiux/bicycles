import React, { useState } from "react";
import { connect } from "react-redux";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ClearIcon from "@material-ui/icons/Clear";
import { toggleCarousel } from "../../../redux/shop/shop.actions";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./carousel.styles.scss";

//distinguishing vertical pics
// numbering of pics

const ViewCarousel = ({ item, handleCarousel, toggleCarousel }) => {
  const { url } = item;

  let imgStyles = {
    width: 100 + "%",
    height: 100 + "vh",
  };

  const [x, setX] = useState(0);

  const goLeft = () => {
    x === 0 ? setX(-100 * (url.length - 1)) : setX(x + 100);
  };

  const goRight = () => {
    x === -100 * (url.length - 1) ? setX(0) : setX(x - 100);
  };

  return (
    <>
      <ClearIcon
        className="clear-icon"
        onClick={() => {
          handleCarousel();
          toggleCarousel();
        }}
      />
      <div className="slider">
        {url.map((image, index) => {
          return (
            <div
              key={index}
              className="slide"
              style={{ transform: `translateX(${x}%)` }}
            >
              <img src={image} alt="Alt text" className="imgStyles" />
            </div>
          );
        })}
        <button id="goLeft" onClick={goLeft}>
          <ChevronLeftIcon style={{ fontSize: 40 }} />
        </button>
        <button id="goRight" onClick={goRight}>
          <ChevronRightIcon style={{ fontSize: 40 }} />
        </button>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCarousel: () => dispatch(toggleCarousel()),
});

export default connect(null, mapDispatchToProps)(ViewCarousel);
