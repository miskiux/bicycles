import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, {useState, useEffect, useRef, useCallback} from 'react';

import ReactMapGL from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";

import './contact-information.css'


//()get current location on Click - https://blog.logrocket.com/how-to-use-mapbox-gl/

//toggle contribution triggering the form upload

const mapStyle = {
    width: '70%',
    height: 600
}

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.REACT_APP_API_KEY}); 

const ContactInformation = (props) => {

	const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 2,
    bearing: 0,
    pitch: 0,
  });

	const [address, setAddress] = useState('')

	const mapRef = useRef();
	
  	const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      //reversing the coordinates
      geocodingClient.reverseGeocode({
  	  query: [newViewport.longitude, newViewport.latitude]
	})
	  .send()
	  .then(response => {
	    const match = response.body;
	    props.uploadAddress(match.features[1].place_name);
	  });

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

