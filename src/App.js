import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      unsubscribeFromAuth: null
    }
  }


componentDidMount() {
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth); //made sure we passed back the userRef(firebase:38) object
      userRef.onSnapshot(snapShot => { // to check if our database has updated at that reference with any new data. If not, it still sends a snapshot object representing the data that is currently store in database. 
        this.setState({                //You can listen to a document with the onSnapshot() method. Checking if snapshot(data) has changed
          currentUser: {
            id: snapShot.id,
            ...snapShot.data()  //We can get the actual properties on the object by calling the .data() method
          }
        }, () => console.log(this.state))
      })
    }
    else {
      this.setState({currentUser:userAuth})
    }
  })
}

componentWillUnmount() {  //to close the subscription
this.state.unsubscribeFromAuth = null;

}

componentDidMount() {
  this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
    this.setState({currentUser: user})
  })
}

componentWillUnmount() {
  this.unsubscribeFromAuth();
}

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path= '/shop' component={ShopPage} />
            <Route path= '/signin' component={SignInAndSignUp} />
          </Switch> 
      </div>
  );
  }
}

export default App;
