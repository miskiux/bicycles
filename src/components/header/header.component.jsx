import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import '../../assets/bici.png';

import './header.styles.scss';

const Header = ({ currentUser }) => (
	<div class='header'>
		<Link className='logo-container' to='/'>
			<img className='logo' src={require('../../assets/bici.png')} />
		</Link>
		<div className='options'>
			<Link className='option' to='/shop'>
				shop
			</Link>
			<Link className='option' to='/shop'>
				sell
			</Link>
			{
				currentUser ?
				<div className='option' onClick={() => auth.signOut()}>sign out</div>
				:
				<Link className='option' to='/signin'>sign in</Link>
			}
		</div>
	</div>
)

export default Header;