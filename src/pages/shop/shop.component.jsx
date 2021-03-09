import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Link, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CategoryPageContainer from "../category/category.container";
import { linkSelector } from "../../redux/shop/shop.selectors";
import { fetchBicyclesStart } from "../../redux/shop/shop.actions";
import Filter from "../../components/filter/filter.component";
import {
  SpinnerContainer,
  SpinnerOverlay,
} from "../../components/with-spinner/with-spinner.styles";

import "./shop.styles.scss";

// links.state => uneccessary

function ShopPage({ fetchBicyclesStart, match, activeLink }) {
  const [links, setLinks] = useState([
    {
      id: 1,
      name: "all",
      to: {
        pathname: "/shop",
        state: { active: 1 },
      },
    },
    {
      id: 2,
      name: "city bicycle",
      to: {
        pathname: `${match.path}/city bicycle`,
        state: { active: "city bicycle" },
      },
    },
    {
      id: 3,
      name: "road bicycle",
      to: {
        pathname: `${match.path}/road bicycle`,
        state: { active: "road bicycle" },
      },
    },
    {
      id: 4,
      name: "vintage",
      to: {
        pathname: `${match.path}/vintage`,
        state: { active: "vintage" },
      },
    },
    {
      id: 5,
      name: "off-road",
      to: {
        pathname: `${match.path}/off-road`,
        state: { active: "off-road" },
      },
    },
  ]);

  const [queryParams, setQueryParams] = useState({});
  const location = useLocation();

  useEffect(() => {
    fetchBicyclesStart();
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

  return (
    <div className="shop-page-container">
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
      <div className="data-filter-content">
        <Filter data={queryParams} />
      </div>
      <div className="shop-page">
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
            component={CategoryPageContainer}
          />
        </Suspense>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchBicyclesStart: () => dispatch(fetchBicyclesStart()),
});

const mapStateToProps = (state) => ({
  activeLink: linkSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
