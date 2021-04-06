import React, { useState, useEffect, useCallback } from "react";

import { connect } from "react-redux";
import axios from "axios";

import { toggleCarousel } from "../../redux/shop/shop.actions";

import ReactHover, { Trigger, Hover } from "react-hover";

import ViewCarousel from "./carousel/carousel.component";
import ReactMapGL, { Marker, StaticMap } from "react-map-gl";

import { Container, Row, Col } from "react-bootstrap";

import RoomSharpIcon from "@material-ui/icons/RoomSharp";
import classNames from "classnames";
import "./item.styles.scss";

const mapStyle = {
  width: "100%",
  height: 350,
};

const optionsCursorTrueWithMargin = {
  followCursor: true,
  shiftX: 20,
  shiftY: 0,
};

const Item = ({
  item,
  toggleCarousel,
  subCategory,
  phone,
  email,
  bicycleType,
}) => {
  //cursor
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(true);

  // location
  const [viewport, setViewport] = useState({
    latitude: 54.526,
    longitude: 15.2551,
    zoom: 8,
    bearing: 0,
    pitch: 0,
  });

  const { latitude, longitude } = viewport;

  const {
    manufacturer,
    model,
    condition,
    description,
    gender,
    info,
    price,
    size,
    year,
    address,
    url,
  } = item;

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  //
  useEffect(() => {
    if (address) {
      try {
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.REACT_APP_API_KEY}`
          )
          .then((res) => {
            let entry = res.data.features[0].center;
            let longitude = entry[0];
            let latitude = entry[1];
            setViewport({
              ...viewport,
              latitude: latitude,
              longitude: longitude,
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseenter", onMouseEnter);
    document.removeEventListener("mouseleave", onMouseLeave);
  };

  const onMouseLeave = () => {
    setHidden(true);
  };

  const onMouseEnter = () => {
    setHidden(false);
  };

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const cursorClasses = classNames("cursor", {
    "cursor--hidden": hidden,
  });

  const handleCarousel = () => {
    setOpen(!open);
  };

  return (
    <>
      {open ? (
        <div className="item-wrapper">
          <ReactHover options={optionsCursorTrueWithMargin}>
            <Trigger type="trigger">
              <div
                onClick={() => {
                  toggleCarousel();
                  setOpen(!open);
                }}
                className="asset-image"
                style={{
                  backgroundImage: `url(${url[0]})`,
                }}
              >
                <div className="item-name">
                  <h3 className="item-title">{manufacturer}</h3>
                  <h3 className="item-title">{model}</h3>
                </div>
              </div>
            </Trigger>
            <Hover type="hover">
              <div
                className={cursorClasses}
                style={{
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                }}
              >
                <span className="image-count">1 / {item.url.length}</span>
              </div>
            </Hover>
          </ReactHover>
          <Container className="item-container" fluid>
            <Row className="item-info-container">
              {size && (
                <Col className="header-info">
                  <h6 className="item-info-title">Size</h6>
                  <div className="size-info">
                    <span>{size}</span>
                    <span style={{ fontSize: "0.75rem" }}>cm</span>
                  </div>
                </Col>
              )}
              {year && (
                <Col className="header-info">
                  <h6 className="item-info-title">Year</h6>
                  <span>{year}</span>
                </Col>
              )}
              {condition && (
                <Col className="header-info">
                  <h6 className="item-info-title">New/Used</h6>
                  <span>{condition}</span>
                </Col>
              )}
              {gender && (
                <Col className="header-info">
                  <h6 className="item-info-title">Gender</h6>
                  <span>{gender}</span>
                </Col>
              )}
              {subCategory ? (
                <Col className="header-info">
                  <h6 className="item-info-title">Type</h6>
                  <span>{subCategory}</span>
                </Col>
              ) : (
                <Col className="header-info">
                  <h6 className="item-info-title">Type</h6>
                  <span>{bicycleType}</span>
                </Col>
              )}
              <Col xs lg="2" className="header-info">
                <h3 className="item-price">€{price}</h3>
              </Col>
            </Row>
          </Container>
          <div className="client-info">
            <p>{info}</p>
          </div>
          <Container className="client-wrapper" fluid>
            <Row>
              <Col xs={6}>
                <div className="item-specifications-wrapper">
                  {description.map(({ item, value, id }) => (
                    <div key={id} className="item-specification">
                      <span className="specification-label">{item}:</span>
                      <span className="specification-value">{value}</span>
                    </div>
                  ))}
                </div>
              </Col>
              <Col xs={6} className="client-contacts">
                <div>
                  <StaticMap
                    mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
                    {...mapStyle}
                    {...viewport}
                  >
                    <Marker latitude={latitude} longitude={longitude}>
                      <div>
                        <RoomSharpIcon
                          style={{ color: "#FF8C00" }}
                          fontSize="large"
                        />
                      </div>
                    </Marker>
                  </StaticMap>
                  <div>
                    <div className="client-additional-info">
                      <h3>Address</h3>
                      <span>{address}</span>
                    </div>
                    <div className="client-additional-info">
                      <h3>Phone</h3>
                      <span>{phone}</span>
                    </div>
                    <div className="client-additional-info">
                      <h3>Email</h3>
                      <span>{email}</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <ViewCarousel item={item} handleCarousel={handleCarousel} />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCarousel: () => dispatch(toggleCarousel()),
});

export default connect(null, mapDispatchToProps)(Item);
