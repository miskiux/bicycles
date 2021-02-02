import React, { useState } from 'react';

import { connect } from "react-redux";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import {filterByPrice} from '../../../redux/shop/shop.actions'
import './price-item.styles.css'
 
const PrettoSlider = withStyles({
  root: {
    color: 'rgb(51,51,51)',
    height: 4,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -10,
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
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

const PriceItem = ({ filterByPrice }) => {

const [value, setValue] = useState([0, 30000]);
const [range, setRange] = useState(false);
	
		const useStyles = makeStyles({
		  root: {
		    width: 80 + '%',
		    display: 'flex',
		    justifyContent: 'center'
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
			<div className='price-menu'>
				<div className='price-labels'>
					 <label>From</label>
					 <label>To</label>
				 </div>
				<div className={classes.root}>
			      <PrettoSlider
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

