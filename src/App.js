import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import SellPage from "./pages/sell/sellpage.component.jsx";
import Header from "./components/header/header.component.jsx";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import ItemView from "./components/item-view/item-view.component.jsx";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { selectCurrentUser } from './redux/user/user.selectors';

function App({currentUser}) {

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/sell" render={() => 
          currentUser ? 
          (
            <SellPage />)
          : (
            <Redirect to='/signin'/> 
            )
          } />
          <Route exact path="/signin" render={() => 
            currentUser ? 
            (<Redirect to='/' />)
             : (
              <SignInAndSignUp /> 
              )
           }
           />
           <Route
              path="/item/:itemId"
              component={ItemView}
              />
        </Switch>
      </div>
    );
  }


const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

export default connect(mapStateToProps)(App);
