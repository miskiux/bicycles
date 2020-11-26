import React from 'react';

import { Route, Link } from "react-router-dom";

import { connect } from 'react-redux';
import { updateBicycle } from '../../redux/shop/shop.actions'


import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CategoryPage from '../category/category.component';
import Filter from '../../components/filter/filter.component';

import { firestore, getBiciDataForShop } from '../../firebase/firebase.utils';
 
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import './shop.styles.scss';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CategoryPageWithSpinner = WithSpinner(CategoryPage);

class ShopPage extends React.Component {
	state = {
		loading: true
	}

unsubscribeFromSnapshot = null;

componentDidMount() {
	const { updateBicycle } = this.props;
	const bicycleRef = firestore.collection("bicycle");
		
		bicycleRef.get()
		.then(snapshot => {
			const bicycleMap = getBiciDataForShop(snapshot)
		updateBicycle(bicycleMap);
		this.setState({loading: false});
		})
}


// props - match
	render(){
		const { match } = this.props
		const { loading } = this.state
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
			<Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
			<Route path={`${match.path}/:categoryId`} 
			render={(props) => <CategoryPageWithSpinner isLoading={loading} {...props} />} />
			</div>
		</div>
		)
		}
	}
const mapDispatchToProps = dispatch => ({
	updateBicycle: bicycleMap => dispatch(updateBicycle(bicycleMap)),
})


export default connect(null, mapDispatchToProps)(ShopPage);

