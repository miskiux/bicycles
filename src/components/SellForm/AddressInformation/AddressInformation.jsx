import React, { useRef, useCallback, useState } from "react";

//import { GetGeoLocationCommand } from "src/domain/SellForm/Command/GetGeoLocationCommand";
import { useDispatch, useSelector } from "react-redux";
import RoomSharpIcon from "@material-ui/icons/RoomSharp";
import { setMarker } from "src/redux/SellStore/SellFormStore/SellForm.actions";
import SellFormTypes from "src/redux/SellStore/SellFormStore/SellForm.types";
import { handleInputChange } from "src/redux/SellStore/SellFormStore/SellForm.actions";
import ReactMapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { LoadableV2 } from "src/components/Shared/loadableV2/loadableV2.component";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import "./AddressInformation.scss";

const mapStyle = {
  width: "100%",
  height: 533,
  zIndex: 1,
};

function ContactInformation({ data }) {
  const GeoLocationMap = {
    [SellFormTypes.ADDRESS]: "address",
    [SellFormTypes.COORDINATES]: "coordinates",
  };

  const [initialLoad, setInitialLoad] = useState(true);
  const [set, onSet] = useState(false);

  const markerShowing = useSelector((state) => state.sellForm.marker);

  const dispatch = useDispatch();

  const mapRef = useRef(false);

  const handleViewportChange = useCallback(
    (newViewport) =>
      dispatch(
        handleInputChange({
          target: {
            name: GeoLocationMap[SellFormTypes.COORDINATES],
            value: {
              latitude: newViewport.latitude,
              longitude: newViewport.longitude,
              zoom: newViewport.zoom,
            },
          },
        })
      ),
    []
  );

  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    try {
      const { longitude, latitude } = newViewport;

      //const locationAddress = GetGeoLocationCommand(longitude, latitude);

      // dispatch(
      //   handleInputChange({
      //     target: {
      //       name: GeoLocationMap[SellFormTypes.ADDRESS],
      //       value: locationAddress.address,
      //     },
      //   })
      // );
      dispatch(setMarker());
    } catch (error) {
      console.log(error);
    }

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  return (
    <div className="map-container">
      <LoadableV2 isLoading={!initialLoad} onFinish={() => onSet(true)} />
      <ReactMapGL
        {...data.coordinates}
        {...mapStyle}
        ref={mapRef}
        onLoad={() =>
          setTimeout(() => {
            setInitialLoad(false);
          }, 1400)
        }
        style={{ display: set ? "flex" : "none" }}
        scrollZoom={false}
        attributionControl={false}
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
      >
        {!!data.coordinates && markerShowing && (
          <Marker
            longitude={data.coordinates.longitude}
            latitude={data.coordinates.latitude}
          >
            <RoomSharpIcon style={{ color: "#FF8C00" }} fontSize="large" />
          </Marker>
        )}
        <Geocoder
          mapRef={mapRef}
          inputValue={data.address}
          marker={false}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
          position="top-left"
        />
        {/* {errors.address && (
          <span className="location-error">
            {Object.values(errors.address)}
          </span>
        )} */}
      </ReactMapGL>
    </div>
  );
}

export default ContactInformation;
