import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import axios from "axios";

import { toggleCarousel } from "../../redux/shop/shop.actions";

import ReactHover, { Trigger, Hover } from "react-hover";

import ViewCarousel from "./carousel/carousel.component";
import { Marker, StaticMap } from "react-map-gl";

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
        <Container className="item-wrapper" fluid>
          <Row noGutters={true} xs={12} className="itemview-image-row">
            <ReactHover options={optionsCursorTrueWithMargin}>
              <Trigger type="trigger">
                <div
                  className="asset-image"
                  style={{
                    backgroundImage: `url(${url[0]})`,
                  }}
                  onClick={() => {
                    toggleCarousel();
                    setOpen(!open);
                  }}
                ></div>
                <div className="item-name">
                  <h3 className="item-title">{manufacturer}</h3>
                  <h3 className="item-title">{model}</h3>
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
          </Row>
          <div className="white-break">
            <Row className="item-info-container">
              {size && (
                <Col xs={2} className="header-info">
                  <h6 className="item-info-title">Size</h6>
                  <div className="size-info">
                    <span>{size}</span>
                    <span style={{ fontSize: "0.75rem" }}>cm</span>
                  </div>
                </Col>
              )}
              {year && (
                <Col xs={2} className="header-info">
                  <h6 className="item-info-title">Year</h6>
                  <span>{year}</span>
                </Col>
              )}
              {condition && (
                <Col xs={2} className="header-info">
                  <h6 className="item-info-title">New/Used</h6>
                  <span>{condition}</span>
                </Col>
              )}
              {gender && (
                <Col xs={2} className="header-info">
                  <h6 className="item-info-title">Gender</h6>
                  <span>{gender}</span>
                </Col>
              )}
              {subCategory ? (
                <Col xs={2} className="header-info">
                  <h6 className="item-info-title">Type</h6>
                  <span>{subCategory}</span>
                </Col>
              ) : (
                <Col xs={2} className="header-info">
                  <h6 className="item-info-title">Type</h6>
                  <span>{bicycleType}</span>
                </Col>
              )}
              <Col xs={2} className="header-info">
                <h3 className="item-price">€{price}</h3>
              </Col>
            </Row>
          </div>
          <Row className="bicycle-client-container">
            <Col xs={6}>
              {info && (
                <div className="client-info">
                  <p>{info}</p>
                </div>
              )}
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
              <div className="client-contacts-wrapper">
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
                <div className="client-addition-info-container">
                  <div className="client-additional-info">
                    <h3 className="contact-title">Address</h3>
                    <span className="contact-value">{address}</span>
                  </div>
                  {phone && (
                    <div className="client-additional-info">
                      <h3 className="contact-title">Phone</h3>
                      <span className="contact-value">{phone}</span>
                    </div>
                  )}
                  <div className="client-additional-info">
                    <h3 className="contact-title">Email</h3>
                    <span className="contact-value">{email}</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
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
