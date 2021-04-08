import React, { useState, useEffect, useRef, useCallback } from "react";

import axios from "axios";
import RoomSharpIcon from "@material-ui/icons/RoomSharp";
import ReactMapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import "./contact-information.scss";

const mapStyle = {
  width: "100%",
  height: 533,
  zIndex: 1,
};

function ContactInformation({
  locationCallback,
  viewport,
  callback,
  errors,
  coordinates,
  address,
  showMarker,
  setMarker,
}) {
  const [location, setLocation] = useState("");

  const mapRef = useRef();

  useEffect(() => {
    if (location) {
      console.log(mapRef.current);
      callback("address", location);
    }
  }, [location]);

  const handleViewportChange = useCallback(
    (newViewport) => locationCallback(newViewport),
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
        console.log(error);
      }

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  return (
    <div className="map-container">
      <ReactMapGL
        ref={mapRef}
        scrollZoom={false}
        attributionControl={false}
        {...viewport}
        {...mapStyle}
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
      >
        {showMarker && (
          <Marker longitude={viewport.longitude} latitude={viewport.latitude}>
            <RoomSharpIcon style={{ color: "#FF8C00" }} fontSize="large" />
          </Marker>
        )}
        <Geocoder
          mapRef={mapRef}
          inputValue={address}
          marker={false}
          onResult={setMarker}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
          position="top-left"
        />
        {errors.address && (
          <span className="location-error">
            {Object.values(errors.address)}
          </span>
        )}
      </ReactMapGL>
    </div>
  );
}

export default ContactInformation;
