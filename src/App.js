import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component'

const Vintage = () => (
	<div>
		<h1> Vintage BIKES BABY </h1>
	</div>
	);

function App() {
  return (
    <div>
    	<Switch>
      		<Route exact path='/' component={HomePage} />
      		<Route path= '/vintage' component={Vintage} />
      	</Switch>
    </div>
  );
}

export default App;
