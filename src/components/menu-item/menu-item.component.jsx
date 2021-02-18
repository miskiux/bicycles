import React from 'react';
import './menu-item.styles.scss'
import { withRouter } from 'react-router-dom'
 
const MenuItem = ({title, color, size, imageUrl, history, linkUrl, match}) => (
	<div 
	className={`${size} menu-item`} 
	onClick={() => history.push({pathname:`${match.url}${linkUrl}`, state: {active: 5}})} /* match.url into linkUrl */>
		<div 
			className='background-image' style={{
			background:`${color}`, 						/* to dynamically make styles for components*/
			backgroundImage: `url(${imageUrl})` 
		}} 
			/>
				<div className='content'>
					<h1 className='title'>{title}</h1>
				</div>
			</div>
	)

export default withRouter(MenuItem);