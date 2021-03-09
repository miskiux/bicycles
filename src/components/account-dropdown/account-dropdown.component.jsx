import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import FavouriteDropdown from '../favourites-dropdown/favourites-dropdown.component';
import BiciInfo from '../bici-info/bici-component/bici-info.component';

import { toggleModal } from '../../redux/side-nav/side-nav.actions'

import { Icon, Menu, Sidebar, Modal } from 'semantic-ui-react'

import './account-dropdown.styles.scss'


//sidenavbar style changes at /

function AccountDropdown() {

	const [toggle, setToggle] = useState(0)

	const NavOpen = useSelector(state => state.sidenav.navbar)
	const ModalOpen = useSelector(state => state.sidenav.modal)

	const dispatch = useDispatch()

	return (
		<div className='account-dropdown'>
		    <Sidebar
		      as={Menu}
		      animation='overlay'
		      icon='labeled'
		      direction={'right'}
		      vertical
		      visible={NavOpen}
		      width='thin'
		    >
		      <Menu.Item className='menu-item' onClick={(e) => {
		      	e.preventDefault()
		      	setToggle(0);
		      	e.stopPropagation()
		      	dispatch(toggleModal(true))
		      }} as='a'>
		        <Icon name='like' />
		        Favourites
		      </Menu.Item>
		      <Menu.Item className='menu-item' onClick={(e) => {
		      	e.preventDefault()
		      	setToggle(1);
		      	e.stopPropagation()
		      	dispatch(toggleModal(true))
		      }} as='a'>
		        <Icon name='list' />
		        Listing
		      	</Menu.Item>
		    	</Sidebar>

			    	<Modal
			    		dimmer={'inverted'} 
			    		open={ModalOpen}
        				onClose={() => dispatch(toggleModal(false))}>
			    		<Modal.Content className='account-display' onClick={(e) => e.stopPropagation()}>
			    			{
						toggle === 1 ?
						<BiciInfo />
						: 
						<FavouriteDropdown />
							}
			    		</Modal.Content>
			    	</Modal>
					</div>
		)
}

export default AccountDropdown;