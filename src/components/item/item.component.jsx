import React, { useState, useEffect, useCallback } from "react";

import { connect } from "react-redux";
import axios from "axios";

import { toggleCarousel } from "../../redux/shop/shop.actions";

import ReactHover, { Trigger, Hover } from "react-hover";

import ViewCarousel from "./carousel/carousel.component";
import ReactMapGL, { Marker } from "react-map-gl";

import { Container, Row, Col } from "react-bootstrap";

import RoomSharpIcon from "@material-ui/icons/RoomSharp";
import "./item.styles.css";

import "./styles.scss";
import classNames from "classnames";

//UL
// 3 on each ul
// figuring out how to wrap larger text

//marker losing its sight on zoom

//overflow

const mapStyle = {
  width: "100%",
  height: 350,
};

const optionsCursorTrueWithMargin = {
  followCursor: true,
  shiftX: 20,
  shiftY: 0,
};

const Item = ({ item, toggleCarousel, subCategory, phone, email }) => {
  //cursor
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [hidden, setHidden] = useState(false);
  const [isSpec, setIsSpec] = useState(false);
  const [open, setOpen] = useState(true);

  // location
  const [viewport, setViewport] = useState({
    latitude: 54.526,
    longitude: 15.2551,
    zoom: 11,
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
    options,
    price,
    size,
    year,
    address,
    url,
  } = item;

  //carousel

  //cursor
  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  //make sure sell form is giving place_name

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

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

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

  //carousel pop handler for child
  const handleCarousel = () => {
    setOpen(!open);
  };

  //dispalying specifications based on option index
  const showSpecification = () => {
    setIsSpec(true);
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
              ></div>
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
          <Container className="item-container">
            <Row className="item-info-container">
              <Col>
                <div className="item-info">
                  <h6 className="item-info-title">Size</h6>
                  <span>{size}</span>
                  <span>cm</span>
                </div>
                <div className="item-info">
                  <h6 className="item-info-title">Year</h6>
                  <span>{year}</span>
                </div>

                <div className="item-info">
                  <h6 className="item-info-title">Condition</h6>
                  <span>{condition}</span>
                </div>

                <div className="item-info">
                  <h6 className="item-info-title">Gender</h6>
                  <span>{gender}</span>
                </div>

                <div className="item-info">
                  <h6 className="item-info-title">Type</h6>
                  <span>{subCategory}</span>
                </div>
              </Col>
              <Col xs lg="2">
                <div className="item-price">
                  <h3>€{price}</h3>
                </div>
              </Col>
            </Row>
          </Container>
          <div className="item-name">
            <h2 className="item-manufacturer">{manufacturer}</h2>
            <h3 style={{ letterSpacing: "15px" }}>{model}</h3>
          </div>

          <div className="item-specifications">
            <ul>
              {options.map((option, i) => (
                <div className="item-options">
                  <li key={i} onMouseOver={showSpecification}>
                    {option}
                  </li>
                  {isSpec ? (
                    <div className="item-description">
                      <span>{description[i]}</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </ul>
          </div>
          <Container className="client-wrapper">
            <Row>
              <Col xs={6}>
                <div className="client-info">
                  <p>{info}</p>
                </div>
              </Col>
              <Col xs={6} className="client-contacts">
                <div>
                  <ReactMapGL
                    {...viewport}
                    {...mapStyle}
                    onViewportChange={handleViewportChange}
                    mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
                  >
                    <Marker
                      latitude={latitude}
                      longitude={longitude}
                      offsetLeft={-20}
                      offsetTop={-10}
                    >
                      <div>
                        <RoomSharpIcon
                          style={{ color: "#FF8C00" }}
                          fontSize="large"
                        />
                      </div>
                    </Marker>
                  </ReactMapGL>
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
