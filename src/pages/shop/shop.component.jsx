import React, {useEffect, lazy, Suspense} from 'react';

import { Route, Link, Switch } from "react-router-dom";

import { selectIsBicyclesFetching } from '../../redux/shop/shop.selectors'

import { connect } from 'react-redux';
import { fetchBicyclesStart } from '../../redux/shop/shop.actions'

import Filter from '../../components/filter/filter.component';

import { SpinnerContainer, SpinnerOverlay } from '../../components/with-spinner/with-spinner.styles'

import './shop.styles.scss';

const CollectionsOverviewContainer = lazy(() => import("../../components/collections-overview/collections-overview.container"))
const CategoryPageContainer = lazy(() => import("../category/category.container"))

//suspense preload the child of component

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
							<Link to={`${match.path}/road bicycle`}>road bicycle</Link>
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
							<Suspense fallback={
				              <SpinnerOverlay>
				                <SpinnerContainer />
				              </SpinnerOverlay>
				              }>
							<Route 
							  exact
				              path={`${match.path}`}
				              component={CollectionsOverviewContainer}
				            />
							<Route 
				              path={`${match.path}/:categoryId`}
				              component={CategoryPageContainer}
				            />
				            </Suspense>
						</div>
				</div>

		)
}


const mapDispatchToProps = dispatch => ({
	fetchBicyclesStart: () => dispatch(fetchBicyclesStart())
})


export default connect(null, mapDispatchToProps)(ShopPage);

