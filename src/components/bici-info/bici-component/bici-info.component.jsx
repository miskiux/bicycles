import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import { Link} from "react-router-dom";

import { SpinnerContainer, SpinnerOverlay } from '../../with-spinner/with-spinner.styles'

import BiciItem from '../bici-item/bici-item.component'

import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { selectAll } from '../../../redux/shop/shop.selectors';

import { toggleModal } from '../../../redux/side-nav/side-nav.actions'
import { deleteBicycleStart } from '../../../redux/shop/shop.actions'
import { hasBicycleDeleted } from '../../../redux/shop/shop.actions'

import { useSelector } from "react-redux";

import { Button, Icon } from 'semantic-ui-react';

import './bici-info.styles.scss';

// Go Sign In => sidenav toggle

//adding spinner

//redirect

const BiciInfo = ({currentUser, bicycles, deleteBicycleStart, hasBicycleDeleted, toggleModal}) => {

const [userBicycles, setUserBicycles] = useState([])
const [biciInfo, setBiciInfo] = useState({});
const [proceed, setProceed] = useState(false);
const [listingId, setListingId] = useState("")
const [current, setCurrent] = useState(0);
//hover
const [hoverBiciInfo, setHoverBiciInfo] = useState({})
const [inHover, setHover] = useState(false);
//
const [edit, setEdit] = useState(false)

const deleteStatus = useSelector(state => state.shop.isDeleting)
const hasDeleted = useSelector(state => state.shop.hasDeleted)

//receiving bicycles based on userID
useEffect(() => {
	if(currentUser) {
		let userBicycles = bicycles.filter(bicycle => bicycle.userId === currentUser.id)
			setUserBicycles(userBicycles)	
	}

}, [currentUser, bicycles])

//getting current
useEffect(() => {
	if(userBicycles) {
		userBicycles.map((item, index) => {
			if(index == current) {
				setBiciInfo(item)
			}
		})
	}
}, [userBicycles, current])
 
useEffect(() => {
	if (hasDeleted === true) {
		setTimeout(() => console.log('Hello, World!'), 1000)
		hasBicycleDeleted();
		reload();
	}
}, [hasDeleted])

const reload = () => {
	window.location.reload(false)
}

const handleId = (id) => {
	setListingId(id)
}

//navigation
const next = () => {
	setCurrent(current + 1)
}

const previous = () => {
	setCurrent(current - 1)
}


//comparng current with userBicycles indices => onMouseOver
const getNextBicycle = () => {
	let next = userBicycles[current+1]
	setHoverBiciInfo(next)
}

const getPreviousBicycle = () => {
	let next = userBicycles[current-1]
	setHoverBiciInfo(next)
}

const nextButton = () => {
 	if(userBicycles.length > current) {
    return ( 
      <Icon name='angle right' size={'large'} onClick={next} onMouseEnter={() => 
      	getNextBicycle()} />
      )
	}
	return null
 }

const previousButton = () => {
 	if(current !== 0) {
    return (
      <Icon name='angle left' size={'large'} onClick={previous} onMouseEnter={() => 
      	getPreviousBicycle()} >
      </Icon>   
      )
	}
	return null
 }

 const toggleEdit = () => {
 	setEdit(!edit)
 }  


//shaking // when back dissapears, it leaves the previous text
	return (
		<div className="bicycle-page">
		{
			currentUser && Object.entries(biciInfo).length !== 0 ?
					<div className="bici-info">
		 				 <BiciItem biciInfo={biciInfo} edit={edit} toggleEdit={toggleEdit}/>
					
						{
		 					proceed === false || listingId !== biciInfo.id ?
		 					<div className='bici-deletion'>
		 						<Button className='bici-remove' 
		 						onClick={() => {
		 							setProceed(!proceed);
		 							handleId(biciInfo.id)
		 						}} > remove </Button>
		 					</div>
		 						: deleteStatus ?
		 							<SpinnerOverlay>
										<SpinnerContainer />
									</SpinnerOverlay>
								:
		 						<div className='bici-deletion'>
		 							<span> you sure, son ?</span>
		 								<div className='bici-deletion-selection'>
				 							<Button className='bici-remove' onClick={() => deleteBicycleStart(biciInfo.id, biciInfo.key)} > Yes </Button>
				 							<Button className='bici-remove' onClick={() => setProceed(!proceed)} > No </Button>
		 								</div>
		 						</div>	 
		 				}
		 	</div>
			:
				<div className='go-sign'>
					<h3 className='go-sign-text'>You have not signed in</h3>
					<Link onClick={() => toggleModal(false)} to={'/signin'}> Go sign in </Link>
				</div>
				}
				<div className='navigation' >
					<div onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)}>
		 				{previousButton()}
		 				</div>
		 				<div>
		 				{
					      	Object.entries(hoverBiciInfo).length !== 0 && inHover ?
					      	<span className='navigation-title'>{`${hoverBiciInfo.item.manufacturer} ${hoverBiciInfo.item.model}`}</span>
					      	
					      	: ""
					    }
					      </div>
					      <div className='right-click' onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)}>
		 				{nextButton()}
		 					</div>
		 		</div>		 	
		</div>
		)
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  bicycles: selectAll(state),

});

const mapDispatchToProps = dispatch => ({
	deleteBicycleStart: (payload) => dispatch(deleteBicycleStart(payload)),
	hasBicycleDeleted: () => dispatch(hasBicycleDeleted()),
	toggleModal: (payload) => dispatch(toggleModal(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(BiciInfo);

