const INITIAL_STATE = {
	sections: [{
				title: 'vintage',
				color: '#c7b198',
				id: 1,
				linkUrl: 'vintage'
			},
			{
				title: 'off-road',
				color: '#7d5e2a',
				id: 2,
				linkUrl: 'off-road'
			},
			{
				title: 'accessories',
				color: '#FFAB0F',
				id: 3,
				linkUrl: 'accessories'
			},
			{
				title: 'city bicycle',
				imageUrl: 'https://images.unsplash.com/photo-1595163784636-e712c519a758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
				size: 'large',
				id: 4,
				linkUrl: 'city bicycle'
			},
			{
				title: 'road bicycle',
				imageUrl: 'https://images.unsplash.com/photo-1593308212116-ac7c545d3ba3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
				size: 'large',
				id: 5,
				linkUrl: 'roadbicycle'
			}
		] 
	}

	const directoryReducer = (state = INITIAL_STATE, action) => {
		switch(action.type) {
			default:
				return state;
		}
	}

export default directoryReducer;



