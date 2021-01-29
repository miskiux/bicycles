import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UnauthenticatedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
      	if (user === null) {
      		return <Component {...rest} {...props} />
      	} else {
      		return <Redirect to={'/'} />
      	}
      } 
    } />
  )
}

export default UnauthenticatedRoute;