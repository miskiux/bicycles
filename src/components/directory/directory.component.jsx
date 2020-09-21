import React from 'react'
import MenuItem from '../menu-item/menu-item.component'
import './directory.styles.scss'

class Directory extends React.Component {
	constructor() {
		super();

		this.state = {
			sections: [{
				title: 'vintage',
				color: '#c7b198',
				id: 1
			},
			{
				title: 'off-road',
				color: '#048243',
				id: 2
			},
			{
				title: 'accessories',
				color: '#FFAB0F',
				id: 3
			},
			{
				title: 'city bicycle',
				imageUrl: 'https://images.unsplash.com/photo-1595163784636-e712c519a758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
				size: 'large',
				id: 4
			},
			{
				title: 'road bicycle',
				imageUrl: 'https://images.unsplash.com/photo-1593308212116-ac7c545d3ba3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
				size: 'large',
				id: 5
			}
		] 
	}
}

	render() {
		return (
			<div className='directory-menu'>
				{
					this.state.sections.map(({title, color, id, size, imageUrl}) => (
						<MenuItem key={id} title={title} color={color} size={size} imageUrl={imageUrl} />
						))
				}
			</div>
		);
	}
}

export default Directory;