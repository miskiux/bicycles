import React, { useState, useEffect } from 'react';

import CollectionItem from '../collection-item/collection-item.component'
import { SpinnerContainer, SpinnerOverlay } from '../with-spinner/with-spinner.styles'

import { connect } from "react-redux";

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectBicycles } from '../../redux/shop/shop.selectors';

import { deleteBicycleStart } from '../../redux/shop/shop.actions'

import { useSelector } from "react-redux";

import { Button } from 'semantic-ui-react';

import './bici-info.styles.css';

//induce a refresh on delete_success

const BiciInfo = ({currentUser, bicycles, deleteBicycleStart}) => {

const [biciInfo, setBiciInfo] = useState([]);
const [proceed, setProceed] = useState(false);

const deleteStatus = useSelector(state => state.shop.isDeleting)

//receiving bicycles based on userID
useEffect(() => {
	console.log(currentUser.id)
	let userBicycles = bicycles.filter(bicycle => bicycle.userId === currentUser.id)
	setBiciInfo(userBicycles)

}, [currentUser])




	return (
		<div>
			{
				deleteStatus ?
				<SpinnerOverlay>
					<SpinnerContainer />
				</SpinnerOverlay>
				:
					<div className="bicycle-page">
			 {
				biciInfo.map(({id, key, ...otherCollectionProps}) =>
					<div className='bici-info'>
		 				<CollectionItem key={id} {...otherCollectionProps}/>
		 				{
		 					proceed === false ?
		 						<Button className='bici-remove' onClick={() => setProceed(!proceed)} > Remove </Button>
		 						:
		 						<div>
		 							<h2> you sure, son ?</h2>
		 							<Button className='bici-remove' onClick={() => deleteBicycleStart({id, key})} > Yes </Button>
		 							<Button className='bici-remove' onClick={() => setProceed(!proceed)} > No </Button>
		 						</div> 
		 				}
					</div>
			)}
			</div> 
			}
				
				
		</div>
		)
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  bicycles: selectBicycles(state)
});

const mapDispatchToProps = dispatch => ({
	deleteBicycleStart: (payload) => dispatch(deleteBicycleStart(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(BiciInfo);

