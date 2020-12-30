import React, {useEffect} from 'react';

import { Route, Link, Switch } from "react-router-dom";

import { selectIsBicyclesFetching } from '../../redux/shop/shop.selectors'

import { connect } from 'react-redux';
import { fetchBicyclesStart } from '../../redux/shop/shop.actions'

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CategoryPageContainer from '../category/category.container';
import Filter from '../../components/filter/filter.component';

import ItemView from "../../components/item-view/item-view.component.jsx";

 
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import './shop.styles.scss';

function ShopPage({fetchBicyclesStart, match}) {
	
	useEffect(() => {
		fetchBicyclesStart();
	}, [])

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
			<Route 
			  exact
              path={`${match.path}`}
              component={CollectionsOverviewContainer}
            />
			<Route 
              path={`${match.path}/:categoryId`}
              component={CategoryPageContainer}
            />
			</div>
		</div>
		)
}


const mapDispatchToProps = dispatch => ({
	fetchBicyclesStart: () => dispatch(fetchBicyclesStart())
})


export default connect(null, mapDispatchToProps)(ShopPage);

