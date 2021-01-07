import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, {useState, useEffect, useRef, useCallback} from 'react';

import ReactMapGL from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";

import './contact-information.css'


//get current location on Click

//toggle contribution triggering the form upload

const mapStyle = {
    width: '70%',
    height: 600
}

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.REACT_APP_API_KEY}); 

const ContactInformation = (props) => {

	const [viewport, setViewport] = useState({
    latitude: -1.9444,
    longitude: 30.0616,
    zoom: 7.8,
    bearing: 0,
    pitch: 0,
  });

	const [address, setAddress] = useState([])

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

  const reverseCoordinates = () => {
  	geocodingClient.reverseGeocode({
  	query: [viewport.longitude, viewport.latitude]
})
  .send()
  .then(response => {
    const match = response.body;
    console.log(match);
  });
  }
   
	return (
		<div>
		{
			props.currentStep == 2 ?
			<div>
			{console.log(viewport)}
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
				          reverseGeocode={true}
				          localGeocoder={reverseCoordinates}    
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

