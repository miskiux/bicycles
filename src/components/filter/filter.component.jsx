import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'

import { useHistory, useLocation } from 'react-router-dom';

import { selectFilterList } from '../../redux/shop/shop.selectors'

import * as QueryString from "query-string"

import PriceItem from './price/price-item.component'
import ManufacturerCheckBox from './manufacturer/manufacturer-filter.component'
import LocationItem from './location/location-item.component';

import { Dropdown, Button, Icon } from 'semantic-ui-react';

import './filter.styles.css';

// filter : dispatch setHideFilter => filter
// mapStateToProps : destructure

// refactor updateQueryString

const Filter = ({data}) => {

// const fromBlogRoll = location.state && location.state.fromBlogRoll

//   return fromBlogRoll ? (
//     <button onClick={() => history.goBack()}>Back to Blog Roll</button>
//   ) : (
//     <button onClick={() => history.push('/home')}>Home</button>
//   )
// }
const [visibleManufacturer, setVisibleManufacturer] = useState(true)
 
const {price_range, manufacturer, locations} = data

console.log(locations)

const history = useHistory()
const {search} = useLocation()

const price = price_range ? price_range.split(',') : ''
const manu = manufacturer ? manufacturer.split(',') : ''
const loc = locations ? locations : ''

const updateQueryStringParameter = (uri, key, val) => {
  let result = ''
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    result = uri.replace(re, '$1' + key + "=" + val + '$2');
  }
  else {
    result = uri + separator + key + "=" + val;
  }

  //let urlState = Object.assign({}, urlState, {[key]:val})

    history.push({
            pathname: '/shop',
            search:`${result}`,
          })
}

const removeQueryString = (uri, key, val) => {
	const queryValue = QueryString.parse(uri)
	const {manufacturer, price_range, location} = queryValue
	let modifiedObj = {...queryValue}

		if (key === 'manufacturer') {
			let manArr = manufacturer.split(',')
			console.log(manArr)
			let newItems = manArr.filter((i) => !i.includes(val))
			modifiedObj = {...queryValue, [key]: newItems}
				if(manArr.length === 1) {
					delete modifiedObj[key]
				}
			}
		if (key === 'price_range') {
			delete modifiedObj[key]
		}
		if (key === 'locations') {
			delete modifiedObj[key]
		}
    	const queryString = QueryString.stringify(modifiedObj)

  		history.push({
			  	pathname: '/shop',
		  		search:`${queryString}`,
			})
}


	return (
		<div>
			<div className="filter-container">
				<div className="filter-options">
					<Dropdown className='filter-selection' placeholder='Price' 
					selectOnBlur={false} closeOnBlur={false}>
					  <Dropdown.Menu>
					  	<Dropdown.Item onClick={e => e.stopPropagation()}>
						  	<div className='filter-option'>
						  		<PriceItem updateQuery={updateQueryStringParameter}/>
						  	</div>
						 </Dropdown.Item>
						 </Dropdown.Menu>
					</Dropdown>
					<Dropdown className='filter-selection' placeholder='Manufacturer' 
					selectOnBlur={false} closeOnBlur={false}>
					  <Dropdown.Menu >
					  	<Dropdown.Item onClick={e => e.stopPropagation()}>
						  	<div className='filter-option'>
						  		<ManufacturerCheckBox updateQuery={updateQueryStringParameter} />
						  	</div>
						 </Dropdown.Item>
						 </Dropdown.Menu>
					</Dropdown>
					<Dropdown className='filter-selection' placeholder='Location' 
					selectOnBlur={false} closeOnBlur={false}>
					  <Dropdown.Menu>
					  	<Dropdown.Item
					  		onClick={e => e.stopPropagation()}>
						  	<div className='filter-option'>
						  		<LocationItem updateQuery={updateQueryStringParameter} />
						  	</div>
						 </Dropdown.Item>
						 </Dropdown.Menu>
					</Dropdown>
					</div>
				</div>
				{
					price || manu || loc ?
						<div class="ui animated button" tabIndex="0">
					  <div class="visible content">
					  	<span>{'Reset All'}</span>
					  </div>
					  	<div class="hidden content">
					    	<i class="close icon" onClick={() => {
					    		history.push('/shop')
					    	}}></i>
					 	 </div>
					</div>
					: ''
				}
				{
					price ? 
					<div class="ui animated button" tabIndex="0">
					  <div class="visible content">
					  	<span>{`${price[0]} - ${price[1]}`}</span>
					  </div>
					  	<div class="hidden content">
					    	<i class="close icon" onClick={() => {
					    		removeQueryString(search, 'price_range', price)
					    	}}></i>
					 	 </div>
					</div>
					: ''
				}
				{ manu ?
					<div>
					{
						manu.map((item, index) => (
							<div key={index} class="ui animated button" tabIndex="0">
							  <div class="visible content">
							  	<span>{item}</span>
							  </div>
							 <div class="hidden content">
				    			<i class="close icon" onClick={() => {
				    			removeQueryString(search, 'manufacturer', manu[index])
				    			}}></i>
								 </div>
							 </div>
							))
						}
					</div>
					: ''
				}
				{
					loc ? 
					<div class="ui animated button" tabIndex="0">
					  <div class="visible content">
					  	<span>{`Bicycles: ${loc}`}</span>
					  </div>
					  	<div class="hidden content">
					    	<i class="close icon" onClick={() => {
					    		removeQueryString(search, 'locations', loc)
					    	}}></i>
					 	 </div>
					</div>
					: ''
				}

			</div>
		)
}

const mapStateToProps = (state) => ({
	filterList: selectFilterList(state)
})

export default connect(mapStateToProps)(Filter);

