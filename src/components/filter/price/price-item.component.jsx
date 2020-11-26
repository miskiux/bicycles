import React, { useState } from 'react';

import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import {filterByPrice} from '../../../redux/shop/shop.actions'

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
		<div className="slider-content">
				<div className="slider-area">
						<div className="from-to-label"></div>
							<div className={classes.root}>
						      <Typography id="range-slider" gutterBottom>
						        choose price range
						      </Typography>
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
						    <div>
						    {
						    	range ?
						    	<div>
						    	<div className='remove-button'>&#10005;</div>
						    	<p>From {value[0]}</p>
						    	<p>To {value[1]}</p>
						    	</div>
						    : ( null
						    	)
						    }
						    </div>
						<div className="confirm-selection">
							<button
							onClick={() => {
									filterByPrice(value);
									setRange(range => range + 1);}}
							>Confirm Selection</button>
						</div>
				</div>
		</div>
		)
}

const mapDispatchToProps = dispatch => ({
	filterByPrice: (value) => dispatch(filterByPrice(value))
})

export default connect(null, mapDispatchToProps)(PriceItem);

