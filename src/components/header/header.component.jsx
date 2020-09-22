import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/bici.png';

import './header.styles.scss';

const Header = () => (
	<div class='header'>
		<Link className='logo-container' to='/'>
			<img className='logo' src={require('../../assets/bici.png')} />
		</Link>
		<div className='options'>
			<Link className='option' to='/shop'>
				shop
			</Link>
			<Link className='option' to='/shop'>
				sell bicycle
			</Link>
		</div>
	</div>
)

export default Header;