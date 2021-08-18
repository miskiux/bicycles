import React, { useEffect, lazy, Suspense, useRef } from "react";
import ReactDOM from "react-dom";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import { GlobalStyle } from "./global.styles";

import Header from "./components/header/header.component.jsx";
import ProtectedRoute from "./components/protected-routes/protected-route.component";
import UpdatePage from "./pages/update/update.component";

import { checkUserSession } from "./redux/user/user.actions";
import "semantic-ui-css/semantic.min.css";
import {
  SpinnerContainer,
  SpinnerOverlay,
} from "./components/with-spinner/with-spinner.styles";
import { fetchBicyclesStart } from "./redux/shop/shop.actions";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component.jsx"));
const SellPage = lazy(() => import("./pages/sell/sellpage.component.jsx"));
const SignInAndSignUp = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const ItemView = lazy(() =>
  import("./components/item-view/item-view.component.jsx")
);

function App() {
  const canvasRef = useRef();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(checkUserSession());
    dispatch(fetchBicyclesStart());
  }, []);

  const CanvasComponent = () =>
    ReactDOM.createPortal(
      <canvas
        id="progressive"
        style={{ display: "none" }}
        ref={canvasRef}
        width="10"
        height="10"
      ></canvas>,
      document.body
    );

  return (
    <>
      <GlobalStyle />
      <CanvasComponent />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense
            fallback={
              <SpinnerOverlay>
                <SpinnerContainer />
              </SpinnerOverlay>
            }
          >
            <Route exact path="/" component={HomePage} />
            <ProtectedRoute path="/sell" user={user} component={SellPage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/signin" component={SignInAndSignUp} />
            <Route path="/update" component={UpdatePage} />
            <Route exact path="/item/:bicycleId" component={ItemView} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </>
  );
}

export default App;
