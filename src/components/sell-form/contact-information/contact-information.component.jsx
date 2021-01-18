import React, { useState, useEffect, useRef, useCallback } from "react";

import axios from "axios";

import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./contact-information.css";

//toggle contribution triggering the form upload

//input value is not keeping state

const mapStyle = {
  width: "70%",
  height: 600,
};

function ContactInformation (props) {

  const [viewport, setViewport] = useState({
    latitude: 54.526,
    longitude: 15.2551,
    zoom: 2,
    bearing: 0,
    pitch: 0,
  });

  const [location, setLocation] = useState("");


  useEffect(() => {
    if(location) {
      props.uploadAddress(location)
    }
  }, [location]);

  const mapRef = useRef();

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      try {
        axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${newViewport.longitude},${newViewport.latitude}.json?types=place&access_token=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => {
          console.log(response);
          let locationAddress = response.data.features[0].place_name;
          setLocation(locationAddress);
        });
      } catch (error) {
        console.log(error)
      }

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  return (
    <div>
      {props.currentStep == 2 ? (
        <div>
          {console.log(location)}
          <h2 className="bici-location">bicycle location</h2>
          <div className="map">
            <ReactMapGL
              ref={mapRef}
              {...viewport}
              {...mapStyle}
              onViewportChange={handleViewportChange}
              mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
            >
              <Geocoder
                mapRef={mapRef}
                reverseGeocode={true}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
                position="top-left"
              />
            </ReactMapGL>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ContactInformation;
