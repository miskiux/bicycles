import React from 'react';

import { Route } from "react-router-dom";

import { connect } from 'react-redux';
import { updateBicycle } from '../../redux/shop/shop.actions'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CategoryPage from '../category/category.component';

import { firestore, getBiciDataForShop } from '../../firebase/firebase.utils';
 
import { selectCollections } from '../../redux/shop/shop.selectors' 

import './shop.styles.scss'

class ShopPage extends React.Component {
	
unsubscribeFromSnapshot = null;

componentDidMount() {
	const { updateBicycle } = this.props;
	const bicycleRef = firestore.collection("bicycle");
	this.unsubscribeFromSnapshot = bicycleRef.onSnapshot(async snapshot => {
		const bicycleMap = getBiciDataForShop(snapshot);
		
		const bicycleArr = [];
		bicycleMap.forEach((res) => {
			const {item, routeName} = res	
			bicycleArr.push({
				id: res.id,
				item,
				routeName
			})
		})
		const groupBicycle = bicycleArr.reduce((r, a) => {
			r[a.routeName] = r[a.routeName] || [];
			r[a.routeName].push(a);
			return r;
		}, Object.create(null));
		updateBicycle(groupBicycle)
	})
}

componentWillUnmount() {
    //to close the subscription
    this.unsubscribeFromSnapshot();
  }

	render(){
		const { match } = this.props
	return (
		<div className='shop-page'>
			<Route exact path={`${match.path}`} component={CollectionsOverview} />
			<Route path={`${match.path}/:categoryId`} component={CategoryPage} />
			</div>
			)
		}
	}
const mapDispatchToProps = dispatch => ({
	updateBicycle: groupBicycle => dispatch(updateBicycle(groupBicycle))
})

const mapStateToProps = (state) => ({
	bicycles: selectCollections(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

