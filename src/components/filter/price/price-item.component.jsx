import React, { useState } from 'react';

import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import {filterByPrice} from '../../../redux/shop/shop.actions'
import './price-item.styles.css'

//send a confirm prop

const PriceItem = ({ filterByPrice }) => {

const [value, setValue] = useState([0, 30000]);
const [range, setRange] = useState(false);
	
		const useStyles = makeStyles({
		  root: {
		    width: 150,
		  },
		});

		function valuetext(value) {
		  return `${value}`;
		}

		  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
// if range false => 
	return (
		<div className='price-filter'>
			<div className={classes.root}>
		      <Slider
		        value={value}
		        min={0}
				step={50}
		        max={10000}
		        onChange={handleChange}
		        valueLabelDisplay="auto"
		        aria-labelledby="range-slider"
		        getAriaValueText={valuetext}
		      	/>
			</div>
					<button className='confirm' onClick={() => {
						filterByPrice(value);
						setRange(range => range + 1);}}> confirm </button>
					
		 </div>
		)
}

const mapDispatchToProps = dispatch => ({
	filterByPrice: (value) => dispatch(filterByPrice(value))
})

export default connect(null, mapDispatchToProps)(PriceItem);

