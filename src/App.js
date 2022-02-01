import React, { useEffect, lazy, Suspense, useRef } from "react";
import { collection } from "src/redux/actions/shop/collection";
import ReactDOM from "react-dom";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { routes } from "src/routes";
import ErrorBoundary from "src/components/error-boundary/error-boundary.component";
import UpdatePage from "src/pages/update/update.component";
import { ModalPortal } from "./components/Modal/ModalPortal/ModalPortal";
import { Modal } from "./redux/ModalStore/Modal.types";
import { checkUserSession } from "./redux/User/user.actions";
import HeaderContainer from "src/containers/HeaderContainer";
import "semantic-ui-css/semantic.min.css";
import {
  SpinnerContainer,
  SpinnerOverlay,
} from "./components/with-spinner/with-spinner.styles";
import SellContainer from "src/containers/SellContainer/SellContainer";
const HomePage = lazy(() => import("./pages/Homepage/Homepage"));
const ShopPage = lazy(() => import("./pages/ShopPage/ShopPage"));

const SignInAndSignUp = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const ItemView = lazy(() =>
  import("./components/item-view/item-view.component.jsx")
);

export default function App() {
  return (
    <>
      {/* <ModalPortal modal={Modal.SellFormModal}>
        <SellContainer />
      </ModalPortal> */}
      <HeaderContainer />
      <Switch>
        <ErrorBoundary>
          <Suspense
            fallback={
              <SpinnerOverlay>
                <SpinnerContainer />
              </SpinnerOverlay>
            }
          >
            <Route path={routes.shop} component={ShopPage} />
            {/* <Route exact path="/" component={HomePage} />
           
            <Route path="/signin" component={SignInAndSignUp} />
            <Route path="/update" component={UpdatePage} />

            <Route exact path="/bicycle/:bicycleId" component={ItemView} /> */}
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </>
  );
}
