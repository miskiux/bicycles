import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import Favourites from '../favourites/favourites.component';
import FavouriteDropdown from '../favourites-dropdown/favourites-dropdown.component';

import { connect } from "react-redux";

import "../../assets/bici.png";
import "./header.styles.scss";

const Header = ({ currentUser, hidden }) => (
  <div class="header">
    <Link className="logo-container" to="/">
      <img className="logo" alt="logo" src={require("../../assets/bici.png")} />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        shop
      </Link>
      <Link className="option" to="/sell">
        sell
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          sign out
        </div>
      ) : (
        <Link className="option" to="/signin">
          sign in
        </Link>
      )}
      <Favourites className="option" />
    </div>
    {
      hidden ? null :
        <FavouriteDropdown />
      }
  </div>
);

// parameter (state) is root reducer = (state) =>
//user(root-reducer).currentUser(userReducer)
const mapStateToProps = ({user: { currentUser }, favourites:{hidden}}) => ({
  currentUser,
  hidden
});

export default connect(mapStateToProps)(Header);
