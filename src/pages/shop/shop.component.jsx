import React from 'react';

import { Route, Link } from "react-router-dom";

import { createStructuredSelector } from 'reselect';
import { selectIsBicyclesFetching, selectIsBicyclesLoaded } from '../../redux/shop/shop.selectors'

import { connect } from 'react-redux';
import { fetchBicyclesStartAsync } from '../../redux/shop/shop.actions'


import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CategoryPage from '../category/category.component';
import Filter from '../../components/filter/filter.component';

 
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import './shop.styles.scss';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CategoryPageWithSpinner = WithSpinner(CategoryPage);

class ShopPage extends React.Component {
	

componentDidMount() {
	const { fetchBicyclesStartAsync } = this.props;
	fetchBicyclesStartAsync();
}


// props - match
	render(){
		const { match, isFetching, isBicyclesLoaded } = this.props
	return (
	<div>
		<div className="listbox">
			<div className="list-wrapper">
				<ul>
					<li>
						<Link to='/shop'>all</Link>
					</li>
					<li>
						<Link to={`${match.path}/city bicycle`}>city bicycle</Link>
					</li>
					<li>
						<Link to={`${match.path}/road`}>road bicycle</Link>
					</li>
					<li>
						<Link to={`${match.path}/vintage`}>vintage</Link>
					</li>
					<li>
						<Link to={`${match.path}/off-road`}>off-road</Link>
					</li>
				</ul>
			</div>
			</div>
		<div className="data-filter-content">
			<Filter />
		</div>
		<div className='shop-page'>
			<Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isFetching} {...props} />} />
			<Route path={`${match.path}/:categoryId`} 
			render={(props) => <CategoryPageWithSpinner isLoading={!isBicyclesLoaded} {...props} />} />
			</div>
		</div>
		)
	}
}

const mapStateToProps = createStructuredSelector ({
	isFetching: selectIsBicyclesFetching,
	isBicyclesLoaded: selectIsBicyclesLoaded
})

const mapDispatchToProps = dispatch => ({
	fetchBicyclesStartAsync: () => dispatch(fetchBicyclesStartAsync())
})


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

