import React, {useState} from 'react';

import { connect } from "react-redux";

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import { filterByCountry } from '../../../redux/shop/shop.actions'; 

import { filterByRegion } from '../../../redux/shop/shop.actions';

const LocationItem = ({filterByCountry, filterByRegion }) => {

	const [country, setCountry] = useState("");
	const [region, setRegion] = useState("");

	const selectCountry = (value) => {
		setCountry(value)
	}

	const selectRegion = (value) => {
		setRegion(value)
	}

	return (
		<div>
			<div>
			<CountryDropdown 
			value={country}
			onChange={(value) => selectCountry(value)} 
					/>
			<RegionDropdown
			country={country} 
			value={region}
			onChange={(value) => selectRegion(value)}
			/>
			</div>
			<button onClick={() => {
				filterByCountry(country)
				filterByRegion(region)
			}}

				> Confirm Selection </button>
		</div>

		)
}

const mapDispatchToProps = dispatch => ({
	filterByCountry: (country) => dispatch(filterByCountry(country)),
	filterByRegion: (region) => dispatch(filterByRegion(region))
})

export default connect(null, mapDispatchToProps)(LocationItem);