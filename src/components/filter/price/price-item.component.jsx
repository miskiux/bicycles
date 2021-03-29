import React, { useState, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";
import * as QueryString from "query-string";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import "./price-item.styles.css";

//buggina slider

const PrettoSlider = withStyles({
  root: {
    color: "rgb(51,51,51)",
    height: 4,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -10,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

const PriceItem = ({ updateQuery }) => {
  const [value, setValue] = useState([0, 30000]);

  const { search } = useLocation();
  const history = useHistory();

  const useStyles = makeStyles({
    root: {
      width: 100 + "%",
      display: "flex",
      margin: 0 + "auto",
    },
  });
  const classes = useStyles();

  const valuetext = (value) => {
    return `${value}`;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="price-filter">
      <div className="price-menu">
        <div className="price-labels">
          <label>From</label>
          <label>To</label>
        </div>
        <div className={classes.root}>
          <PrettoSlider
            value={value}
            min={0}
            step={50}
            max={10000}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </div>
      </div>
      <button
        className="confirm"
        onClick={() => updateQuery(search, "price_range", value)}
      >
        {" "}
        confirm{" "}
      </button>
    </div>
  );
};

export default PriceItem;
