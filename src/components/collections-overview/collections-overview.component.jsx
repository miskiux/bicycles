import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../collection-item/collection-item.component'  

import { selectBicycles } from '../../redux/shop/shop.selectors' 

import { withRouter } from 'react-router-dom';

import './collections-overview.styles.scss'

//displaying items as a list ? of 5 ?
const CollectionsOverview = ({ bicycles, match, history }) => {
	return (
			<div className='collections-overview'>
			{console.log(bicycles)} 
				<h1 className='title'></h1>
				<div className='preview'>
		{
			bicycles.map(({id, ...otherCollectionProps}) =>
 				<CollectionItem key={id} {...otherCollectionProps}/>
			)}
		</div>
		<span className="seeAll"
		//onClick={() => history.push(`${match.url}/${routeName}`)}
		>See All</span>
	</div>
			
		)
}

const mapStateToProps = (state) => ({
	bicycles: selectBicycles(state)
})

export default withRouter(connect(mapStateToProps)(CollectionsOverview))



