import React, {useState, useEffect, lazy, Suspense} from 'react';

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

	const [links, setLinks] = useState([
      {
        id: 1,
        name: "all",
        to: "/shop",
      },
      {
        id: 2,
        name: "city bicycle",
        to: `${match.path}/city bicycle`,
      },
      {
        id: 3,
        name: "road bicycle",
        to: `${match.path}/road bicycle`,
      },
      {
        id: 4,
        name: "vintage",
        to: `${match.path}/vintage`,
      },
      {
        id: 5,
        name: "off-road",
        to: `${match.path}/off-road`,
      }
  	])

  	const [activeLink, setActiveLink] = useState(null)
	
	useEffect(() => {
		fetchBicyclesStart();
	}, [])

	const handleClick = id => {
    setActiveLink(id)
  };

	return (
	<div>
		<div className="list-container">
			{
				links.map(link => {
					return (
						<div key={link.id} className="list-wrapper">
							<ul className='category-wrapper'>
								<li
				                  onClick={() => handleClick(link.id)}
				                  className={`${link.id === activeLink ? "active_item" : ""} category-option`}>
		                  			<Link to={link.to}>{link.name}</Link>
		                		 </li>
							</ul>
						</div>
						)
				})
			}
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

