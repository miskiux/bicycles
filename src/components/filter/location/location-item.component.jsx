import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { connect } from "react-redux";

import Slider from "@material-ui/core/Slider";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { selectLocationBicycles } from "../../../redux/shop/shop.selectors";
import { filterByLocation } from "../../../redux/shop/shop.actions";
import "./location-item.styles.css";

const useStyles = makeStyles({
  root: {
    width: 12 + "vw",
  },
});
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

// if url has a keyword then filter by loaction
// ?location=locations.length

function LocationItem({
  reduxBicycles,
  filterByLocation,
  updateQuery,
  onModalClose,
}) {
  const [userLocation, setUserLocation] = useState({
    lat1: null,
    lon1: null,
  });
  const [value, setValue] = useState(20);
  const [unavailable, setUnavailable] = useState(false);
  const [length, setLength] = useState(0);

  const { lat1, lon1 } = userLocation;

  const { search } = useLocation();

  const classes = useStyles();

  const calculateDistance = (lat2, lon2, lat1, lon1) => {
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    return 12742 * Math.asin(Math.sqrt(a));
  };

  //calculation
  useEffect(() => {
    if (lat1 !== null && lon1 !== null) {
      let myArr = [];
      reduxBicycles.forEach((value) => {
        let lat2 = value.coordinates[0];
        let lon2 = value.coordinates[1];

        const fx = calculateDistance(lat2, lon2, lat1, lon1);
        myArr.push({ distance: fx });
        console.log(fx);
      });
      const obj = myArr.map((item, i) =>
        Object.assign({}, item, reduxBicycles[i])
      );
      const filteredObj = obj.filter((item) => item.distance <= value);

      const locationIdList = filteredObj.map((item) => item.id);
      filterByLocation(locationIdList);

      updateQuery(search, "locations", locationIdList.length);
    }
  }, [lat1, lon1, reduxBicycles, length]);

  //user location
  const findLocation = () => {
    if (navigator.geolocation) {
      console.log("exist ?");
      navigator.geolocation.getCurrentPosition((position) => {
        let uloc = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        console.log(uloc);
        setUserLocation({ lat1: uloc.lat, lon1: uloc.long });
        setUnavailable(false);
      });
    } else {
      console.log("i run ?");
      setUnavailable(true);
    }
  };

  const valuetext = (value) => {
    return `${value}`;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const confirmSubmit = () => {
    if (onModalClose) {
      onModalClose();
    }
    findLocation();
    setLength(length + 1);
  };

  return (
    <div className="location-filter">
      <div className="location-label">
        <label>Range</label>
        <label className="measurement-label">(km)</label>
      </div>
      <div className={classes.root}>
        <PrettoSlider
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          max={1000}
          onChange={handleChange}
          defaultValue={20}
        />
      </div>
      {unavailable && (
        <span style={{ fontSize: "0.75rem" }}>Cannot access your location</span>
      )}
      <button className="confirm" onClick={confirmSubmit}>
        confirm
      </button>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  reduxBicycles: selectLocationBicycles(state),
});

const mapDispatchToProps = (dispatch) => ({
  filterByLocation: (locationIdList) =>
    dispatch(filterByLocation(locationIdList)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(LocationItem);
