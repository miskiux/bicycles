import React from 'react';

import './bici-item.styles.css'

function BiciItem({item}) {
	console.log(item)
	const { manufacturer, model, url} = item

	return(
			<div className='bici-item'>
				<div
					className='bici-image'
					style={{
						backgroundImage: `url(${url[0]})`
					}}
				></div>
					<div className='bici-detail'>
						<h3 className='bici-name'>{manufacturer}</h3>
						<h3 className='bici-name'>{model}</h3>
					</div>
		</div>
		)
}

export default BiciItem;