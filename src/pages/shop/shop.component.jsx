import React from 'react';

import { Route } from "react-router-dom";

import { connect } from 'react-redux';
import { updateBicycle } from '../../redux/shop/shop.actions'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

import { firestore, getBiciDataForShop } from '../../firebase/firebase.utils';
 
class ShopPage extends React.Component {
	constructor() {
		super();
		this.state = {
			bicycleArr: []
	}
}
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
				key: res.id,
				item,
				routeName
			})
		})
		updateBicycle(bicycleArr);
	})
}

componentWillUnmount() {
    //to close the subscription
    this.unsubscribeFromSnapshot();
  }

	render(){
		console.log(this.state.bicycleArr)
		const { match } = this.props
	return (
		<div className='shop-page'>
			<Route exact path={`${match.path}`} component={CollectionsOverview} />
			</div>
			)
		}
	}
const mapDispatchToProps = dispatch => ({
	updateBicycle: bicycleArr => dispatch(updateBicycle(bicycleArr))
})

export default connect(null, mapDispatchToProps)(ShopPage);

