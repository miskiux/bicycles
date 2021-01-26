import React, {useEffect, lazy, Suspense} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

import ErrorBoundary from './components/error-boundary/error-boundary.component'

import "./App.css";

import Header from "./components/header/header.component.jsx";
import ProtectedRoute from './components/protected-routes/protected-route.component'

import { checkUserSession } from "./redux/user/user.actions";
import { deleteBicycleSuccess } from './redux/shop/shop.actions'

import { selectCurrentUser } from './redux/user/user.selectors';
import { SpinnerContainer, SpinnerOverlay } from './components/with-spinner/with-spinner.styles'


const HomePage = lazy(() => import("./pages/homepage/homepage.component"))
const ShopPage = lazy(() => import("./pages/shop/shop.component.jsx"))
const SellPage = lazy(() => import("./pages/sell/sellpage.component.jsx"))
const SignInAndSignUp = lazy(() => import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"))
const ItemView = lazy(() => import("./components/item-view/item-view.component.jsx"))


function App({ checkUserSession }) {

  const user = useSelector(state => state.user.currentUser)

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
              <ProtectedRoute path="/sell" user={user} component={SellPage} />
              <Route path="/shop" component={ShopPage} />
              <Route exact path="/signin" component={SignInAndSignUp} />
              <Route exact path='/item/:bicycleId' component={ItemView} />
             </Suspense> 
           </ErrorBoundary>
        </Switch>
      </div>
    );
  }

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  
})

export default connect(null, mapDispatchToProps)(App);
