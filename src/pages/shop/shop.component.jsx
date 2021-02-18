import React, {useState, useEffect, lazy, Suspense} from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch, useLocation, withRouter } from "react-router-dom";
import * as QueryString from "query-string"

import { linkSelector } from '../../redux/shop/shop.selectors'
import { selectIsBicyclesFetching } from '../../redux/shop/shop.selectors'
import { fetchBicyclesStart } from '../../redux/shop/shop.actions'
import Filter from '../../components/filter/filter.component';
import { SpinnerContainer, SpinnerOverlay } from '../../components/with-spinner/with-spinner.styles'

import './shop.styles.scss';

const CollectionsOverviewContainer = lazy(() => {
	return new Promise(resolve => setTimeout(resolve, 0)).then(
		() => import("../../components/collections-overview/collections-overview.container"))
	});
const CategoryPageContainer = lazy(() => import("../category/category.container"))

//category fixed, go fix shop

function ShopPage({fetchBicyclesStart, match, activeLink}) {

	const [links, setLinks] = useState([
      {
        id: 1,
        name: "all",
        to: {
        	pathname:'/shop',
        	state: {active: 1}
    },
      },
      {
        id: 2,
        name: "city bicycle",
        to: {
        	pathname:`${match.path}/city bicycle`,
        	state: {active: "city bicycle"}
    },
      },
      {
        id: 3,
        name: "road bicycle",
        to: {
        	pathname:`${match.path}/road bicycle`,
        	state: {active: "road bicycle"}
    },
      },
      {
        id: 4,
        name: "vintage",
        to: {
        	pathname:`${match.path}/vintage`,
        	state: {active: "vintage"}
    },
      },
      {
        id: 5,
        name: "off-road",
        to: {
        	pathname:`${match.path}/off-road`,
        	state: {active: "off-road"}
    },
      }
  	])

  	const [activeId, setActiveId] = useState(1)
  	const [queryParams, setQueryParams] = useState({})
  	const location = useLocation();

	console.log(location)  	
	useEffect(() => {
		if (location.state) {
			setActiveId(location.state.active)
		}
	}, [location.pathname])

	useEffect(() => {
		fetchBicyclesStart();
	}, [])

	useEffect(() => {
		if(location.search) {
			const values = QueryString.parse(location.search)
			setQueryParams(values)
		 }
		 if(!location.search) {
		 	setQueryParams({})
		 }
	}, [location.search])


	return (
	<div className='shop-page-container'>
	{console.log(activeLink)}
		<div className="list-container">
			{
				links.map(link => {
					return (
						<div key={link.id} className="list-wrapper">
							<ul className='category-wrapper'>
								<li className='category-list'>
			                  		 <Link
					                  className={`${link.name === activeLink ? "active_item" : ""} category-option`} 
					                  to={link.to}>{link.name}</Link>
		                		 </li>
							</ul>
						</div>
						)
				})
			}
		 </div>
			<div className="data-filter-content">
				<Filter data={queryParams} />
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
		              render={() => <CollectionsOverviewContainer filterData={queryParams} />}
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

const mapStateToProps = state => ({
	activeLink: linkSelector(state)
})


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

