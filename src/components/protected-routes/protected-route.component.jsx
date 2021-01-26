import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
      	if (user !== null) {
      		return <Component {...rest} {...props} />
      	} else {
      		return <Redirect to={'/signin'} />
      	}
      } 
    } />
  )
}

export default ProtectedRoute;
