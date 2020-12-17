import React from 'react'
import { Switch, Route, withRouter, useLocation } from "react-router-dom";

import ItemView from '../../components/item-view/item-view.component'

//mutliple params needed for category

const ItemPage = ({match}) => {

 console.log(match.params)
	return(

		<div>	        
				<Route 	 
					path={`${match.url}`} 
					component={ItemView}
					/>
					
		</div>
		)
}

export default ItemPage