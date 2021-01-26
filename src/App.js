import React, {useEffect, lazy, Suspense} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ErrorBoundary from './components/error-boundary/error-boundary.component'

import "./App.css";

import Header from "./components/header/header.component.jsx";

import { checkUserSession } from "./redux/user/user.actions";

import { deleteBicycleSuccess } from './redux/shop/shop.actions'

import { selectCurrentUser } from './redux/user/user.selectors';
import { SpinnerContainer, SpinnerOverlay } from './components/with-spinner/with-spinner.styles'

//lazy - downloading chunks at the route level
const HomePage = lazy(() => import("./pages/homepage/homepage.component"))
const ShopPage = lazy(() => import("./pages/shop/shop.component.jsx"))
const SellPage = lazy(() => import("./pages/sell/sellpage.component.jsx"))
const SignInAndSignUp = lazy(() => import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"))
const ItemView = lazy(() => import("./components/item-view/item-view.component.jsx"))

//redirecting users

//check projects react.rocks

function App({ currentUser, checkUserSession }) {

  useEffect(() => {
    checkUserSession();

  }, [])

    return (
      <div>
        <Header />
          <Switch>
          <ErrorBoundary>
            <Suspense fallback={
              <SpinnerOverlay>
                <SpinnerContainer />
              </SpinnerOverlay>
              }>
              <Route exact path="/" component={HomePage} />
              <Route path="/sell" render={() => 
                currentUser ? 
                (
                <SellPage />)
              : (
                <Redirect to='/signin'/> 
                )
              } />
              <Route path="/shop" component={ShopPage} />
              <Route exact path="/signin" render={() => 
                currentUser ? 
                (<Redirect to='/' />)
                 : (
                  <SignInAndSignUp /> 
                  )
                }
               />
                <Route exact path='/item/:bicycleId' component={ItemView} />
             </Suspense> 
           </ErrorBoundary>
        </Switch>
      </div>
    );
  }


const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
