import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, {useState, useEffect, useRef, useCallback} from 'react';

import ReactMapGL from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";

import './contact-information.css'


//get current location on Click
// search input to close
const mapStyle = {
    width: '70%',
    height: 600
} 

const ContactInformation = (props) => {

	const [viewport, setViewport] = useState({
    latitude: -1.9444,
    longitude: 30.0616,
    zoom: 7.8,
    bearing: 0,
    pitch: 0,
  });

	const mapRef = useRef();
	
  	const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  
 
	return (
		<div>
		{
			props.currentStep == 2 ?
			<div>
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
				      	  className="react-geocoder"
				          mapRef={mapRef}
				          onViewportChange={handleGeocoderViewportChange}
				     
				          mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
				          position="top-left"
				        />
				    </ReactMapGL>
				</div>
			</div>
			: ""
		}
			
		</div>
	)
}

export default ContactInformation;

