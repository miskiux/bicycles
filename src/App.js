import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import SellPage from "./pages/sell/sellpage.component.jsx";
import Header from "./components/header/header.component.jsx";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends React.Component {
  unsubscribeFromAuth = null;

  //made sure we passed back the userRef(firebase:38) object
  // to check if our database has updated at that reference with any new data. If not, it still sends a snapshot object representing the data that is currently store in database.
  //You can listen to a document with the onSnapshot() method. Checking if snapshot(data) has changed
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,  // this id to merge with all this data (...snapShot.data();)
            ...snapShot.data() //We can get the actual properties of the object created in firebase by calling the .data() method
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    //to close the subscription
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/sell" render={() => 
          this.props.currentUser ? 
          (<SellPage />)
          : (
            <Redirect to='/signin'/> 
            )
          } />
          <Route exact path="/signin" render={() => 
            this.props.currentUser ? 
            (<Redirect to='/' />)
             : (
              <SignInAndSignUp /> 
              )
           }/>
        </Switch>
      </div>
    );
  }
}
//redirecting after sign in. destructuring user reducer
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

//app just sets the currentuser value, but does not do anything with it
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)), //dispatching an action object
});

//if mapStateToProps is not needed thus null as first argument
export default connect(mapStateToProps, mapDispatchToProps)(App);
