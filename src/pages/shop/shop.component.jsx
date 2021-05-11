import React, { useState, useEffect, Suspense, useRef } from "react";
import { connect } from "react-redux";
import { Route, Link, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CategoryPageContainer from "../category/category.container";
import {
  linkSelector,
  selectIsBicyclesFetching,
} from "../../redux/shop/shop.selectors";
import { fetchBicyclesStart } from "../../redux/shop/shop.actions";
import Filter from "../../components/filter/filter.component";
import UseAnimations from "react-useanimations";
import {
  SpinnerContainer,
  SpinnerOverlay,
} from "../../components/with-spinner/with-spinner.styles";
import menu2 from "react-useanimations/lib/menu2";
import { Transition } from "react-transition-group";
import FilterModal from "../../components/filter/filter-modal.component";
import { useMediaQuery } from "../../hooks/useMediaQuery";

import "./shop.styles.scss";

//link action launching multiple times
function ShopPage({ fetchBicyclesStart, match, activeLink, isFetching }) {
  const links = [
    {
      id: 1,
      name: "all",
      to: {
        pathname: "/shop",
      },
    },
    {
      id: 2,
      name: "city bicycle",
      to: {
        pathname: `${match.path}/city bicycle`,
      },
    },
    {
      id: 3,
      name: "road bicycle",
      to: {
        pathname: `${match.path}/road bicycle`,
      },
    },
    {
      id: 4,
      name: "vintage",
      to: {
        pathname: `${match.path}/vintage`,
      },
    },
    {
      id: 5,
      name: "off-road",
      to: {
        pathname: `${match.path}/off-road`,
      },
    },
  ];

  const [filterOpen, setFilterOpen] = useState(true);
  const [queryParams, setQueryParams] = useState({});
  const [breakPoint, setBreakPoint] = useState(false);
  const location = useLocation();
  const isBreakPoint = useMediaQuery(915);
  const canvasRef = useRef();

  useEffect(() => {
    fetchBicyclesStart();
  }, []);

  useEffect(() => {
    setBreakPoint(true);
  }, [isBreakPoint]);

  useEffect(() => {
    if (isBreakPoint) {
      setBreakPoint(false);
    }
  }, []);

  useEffect(() => {
    if (location.search) {
      const values = QueryString.parse(location.search);
      setQueryParams(values);
    }
    if (!location.search) {
      setQueryParams({});
    }
  }, [location.search]);

  const toggleFilter = () => {
    setFilterOpen((i) => !i);
  };

  const duration = 550;

  const widthStyle = {
    transition: isFetching ? null : `width ${duration}ms ease-in-out`,
  };

  const defaultStyle = {
    transition: isFetching ? null : `transform ${duration}ms ease-in-out`,
  };

  const shopPageTransitionStyles = {
    entering: {
      width: "83.33333%",
      flex: "0 0 83.33333%",
    },
    entered: {
      transform: "none",
      width: "100%",
      flex: "0 0 100%",
    },
    exiting: {
      transform: "none",
      width: "100%",
      flex: "0 0 100%",
    },
    exited: {
      width: "83.33333%",
      flex: "0 0 83.33333%",
    },
  };

  const shopTransitionStyles = {
    entering: {
      transform: "translate3d(20%, 0%, 1rem)",
    },
    entered: {
      transform: "none",
    },
    exiting: {
      transform: "none",
    },
    exited: {
      transform: "translate3d(20%, 0%, 1rem)",
    },
  };

  const renderShopPage = () => {
    return (
      <Transition
        in={!filterOpen || isBreakPoint}
        timeout={duration}
        enter={filterOpen ? false : true}
      >
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...shopTransitionStyles[state],
            }}
            className="shop-page"
          >
            <Suspense
              fallback={
                <SpinnerOverlay>
                  <SpinnerContainer />
                </SpinnerOverlay>
              }
            >
              <Route
                exact
                path={`${match.path}`}
                render={(props) => (
                  <CollectionsOverviewContainer
                    filterData={queryParams}
                    {...props}
                  />
                )}
              />
              <Route
                path={`${match.path}/:categoryId`}
                render={(props) => (
                  <CategoryPageContainer filterData={queryParams} {...props} />
                )}
              />
            </Suspense>
          </div>
        )}
      </Transition>
    );
  };

  const sideduration = 550;

  const sidebarStyle = {
    transition: `transform ${sideduration}ms`,
  };

  const SideMenuTransitionStyles = {
    entering: {
      transform: "translate3d(0%, 0%, 0)",
    },
    entered: {
      transform: "translate3d(-136%, 0, 0)",
    },
    exiting: {
      transform: "translate3d(-136%, 0, 0)",
    },
    exited: {
      transform: "translate3d(0%, 0%, 0)",
    },
  };

  return (
    <div className="shop-page-wrapper">
      <canvas
        id="progressive"
        style={{ display: "none" }}
        ref={canvasRef}
        width="10"
        height="10"
      ></canvas>
      {breakPoint && (
        <Transition in={isBreakPoint || !filterOpen} timeout={sideduration}>
          {(state) => (
            <div
              className="side-menu-wrapper"
              style={{
                ...sidebarStyle,
                ...SideMenuTransitionStyles[state],
              }}
            >
              <div className="side-menu-container">
                <Filter
                  data={queryParams}
                  filterOpen={filterOpen}
                  toggleFilter={toggleFilter}
                  isBreakPoint={isBreakPoint}
                />
              </div>
            </div>
          )}
        </Transition>
      )}
      <Transition
        in={!filterOpen || isBreakPoint}
        timeout={duration}
        enter={filterOpen ? false : true}
      >
        {(state) => (
          <div
            style={{
              ...widthStyle,
              ...shopPageTransitionStyles[state],
            }}
            className="shop-page-container"
          >
            <div>
              {!isBreakPoint && (
                <UseAnimations
                  reverse={filterOpen || isBreakPoint}
                  onClick={toggleFilter}
                  animation={menu2}
                  size={56}
                  speed={1.4}
                  render={(eventProps, animationProps) => (
                    <button
                      style={{
                        padding: "20px",
                        position: "absolute",
                        top: "-10px",
                        left: "-20px",
                        background: "none",
                        border: "none",
                        outline: "none",
                      }}
                      type="button"
                      {...eventProps}
                    >
                      <div {...animationProps} />
                    </button>
                  )}
                />
              )}
              <div className="list-container">
                {links.map((link) => {
                  return (
                    <div key={link.id} className="list-wrapper">
                      <ul className="category-wrapper">
                        <li className="category-list">
                          <Link
                            className={`${
                              link.name === activeLink ? "active_item" : ""
                            } category-option`}
                            to={link.to}
                          >
                            {link.name}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
              {isBreakPoint && (
                <FilterModal
                  data={queryParams}
                  filterOpen={filterOpen}
                  toggleFilter={toggleFilter}
                />
              )}
            </div>
            {renderShopPage()}
          </div>
        )}
      </Transition>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchBicyclesStart: () => dispatch(fetchBicyclesStart()),
});

const mapStateToProps = (state) => ({
  activeLink: linkSelector(state),
  isFetching: selectIsBicyclesFetching(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
