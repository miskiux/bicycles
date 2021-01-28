import React, {useState, useEffect} from 'react';
import axios from "axios";

import { connect } from "react-redux";

import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import {selectLocationBicycles} from '../../../redux/shop/shop.selectors'
import { filterByLocation } from '../../../redux/shop/shop.actions'; 


const useStyles = makeStyles({
  root: {
    width: 250,
  },
});
const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function LocationItem({reduxBicycles, filterByLocation}) {

const [bicycleDistance, setDistance] = useState([])
const [userLocation, setUserLocation] = useState({
	lat1: null,
	lon1: null,
})
const [value, setValue] = useState(20);
const [range, setRange] = useState(false);

const classes = useStyles();

//filter it by distance(creatng action)

//dispatching, creating id list that completes the test
//filter

const { lat1, lon1 } = userLocation

const calculateDistance = (lat2, lon2, lat1, lon1) => {
			  let arr = []
			  let p = 0.017453292519943295;
			  let c = Math.cos;
			  let a = 0.5 - c((lat2 - lat1) * p)/2 + 
			          c(lat1 * p) * c(lat2 * p) * 
          			  (1 - c((lon2 - lon1) * p))/2;
  			   return 12742 * Math.asin(Math.sqrt(a));
	}

//calculation
useEffect(() => {
	if(lat1 !== null && lon1 !== null) {
		let myArr = []
		reduxBicycles.forEach((value) => {
		 	let lat2 = value.coordinates[0]
		 	let lon2 = value.coordinates[1]
			const fx = calculateDistance(lat2, lon2, lat1, lon1);
			myArr.push({distance: fx})
		})
		const obj = myArr.map((item, i) => Object.assign({}, item, reduxBicycles[i]))
		const filteredObj = obj.filter(item => item.distance <= value)
		setDistance(filteredObj)
		const locationIdList = filteredObj.map(item => item.id)
		filterByLocation(locationIdList)
	}
}, [userLocation])

//user location
const findLocation = () => {
	navigator.geolocation.getCurrentPosition(position => {
     let uloc = {
         lat: position.coords.latitude,
         long: position.coords.longitude
      	};
      	setUserLocation({...userLocation, lat1: uloc.lat, lon1: uloc.long})
		})
}

const valuetext = (value) => {
  return `${value}`;
}

const handleChange = (event, newValue) => {
	setValue(newValue);
}

	return (
		<div>
			<div className={classes.root}>
		        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" max={1000} onChange={handleChange} defaultValue={20} />
		    </div>
		    	<div className="confirm-selection">
					<button
						onClick={() => {
						findLocation();
					}}
					>Confirm Selection</button>
				</div>
		 </div>
		)
}

const mapStatetoProps = (state) => ({
	reduxBicycles: selectLocationBicycles(state)
})

const mapDispatchToProps = dispatch => ({
	filterByLocation: (locationIdList) => dispatch(filterByLocation(locationIdList)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(LocationItem);
