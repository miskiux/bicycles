import React, { useState, useEffect, useCallback } from 'react';
 
import CollectionItem from '../collection-item/collection-item.component'
import { SpinnerContainer, SpinnerOverlay } from '../with-spinner/with-spinner.styles'

import { connect } from "react-redux";

import BiciItem from './bici-item.component'

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectBicycles } from '../../redux/shop/shop.selectors';

import { deleteBicycleStart } from '../../redux/shop/shop.actions'
import { hasBicycleDeleted } from '../../redux/shop/shop.actions'

import { useSelector } from "react-redux";

import { Button } from 'semantic-ui-react';

import './bici-info.styles.css';

//induce a refresh on delete_success

//adding spinner

//redirect

const BiciInfo = ({currentUser, bicycles, deleteBicycleStart, hasBicycleDeleted}) => {

const [biciInfo, setBiciInfo] = useState([]);
const [proceed, setProceed] = useState(false);
const [listingId, setListingId] = useState("")
const [, updateComponent] = useState();

const deleteStatus = useSelector(state => state.shop.isDeleting)
const hasDeleted = useSelector(state => state.shop.hasDeleted)

//receiving bicycles based on userID
useEffect(() => {
	console.log(currentUser.id)
	let userBicycles = bicycles.filter(bicycle => bicycle.userId === currentUser.id)
	setBiciInfo(userBicycles)

}, [currentUser])

const reload = () => {
	window.location.reload(false)
}

useEffect(() => {
	if (hasDeleted === true) {
		setTimeout(() => console.log('Hello, World!'), 1000)
		hasBicycleDeleted();
		reload();
	}
}, [hasDeleted])

const handleId = (id) => {
	setListingId(id)
}



	return (
		<div>
			
					<div className="bicycle-page">
			 {
				biciInfo.map(({id, key, ...otherCollectionProps}) =>
					<div key={id} className='bici-info'>
		 				<BiciItem key={id} {...otherCollectionProps}/>
		 				{
		 					proceed === false || listingId !== id ?
		 					<div className='bici-deletion'>
		 						<Button className='bici-remove' 
		 						onClick={() => { 
		 							setProceed(!proceed);
		 							handleId(id)
		 						}} > Remove </Button>
		 					</div>
		 						: deleteStatus ?
		 							<SpinnerOverlay>
										<SpinnerContainer />
									</SpinnerOverlay>
								:
		 						<div className='bici-deletion'>
		 							<span> you sure, son ?</span>
		 								<div className='bici-deletion-selection'>
				 							<Button className='bici-remove' onClick={() => deleteBicycleStart({id, key})} > Yes </Button>
				 							<Button className='bici-remove' onClick={() => setProceed(!proceed)} > No </Button>
		 								</div>
		 						</div> 
		 				}
					</div>
			)}
			</div> 			
		</div>
		)
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  bicycles: selectBicycles(state)
});

const mapDispatchToProps = dispatch => ({
	deleteBicycleStart: (payload) => dispatch(deleteBicycleStart(payload)),
	hasBicycleDeleted: () => dispatch(hasBicycleDeleted())
})

export default connect(mapStateToProps, mapDispatchToProps)(BiciInfo);

