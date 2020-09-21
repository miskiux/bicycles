import React from 'react'
import './menu-item.styles.scss'

const MenuItem = ({title, color, size, imageUrl}) => (
	<div className={`${size} menu-item`}>
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

export default MenuItem;