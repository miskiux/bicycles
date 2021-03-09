import React from "react";

import { Link, Route } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";

import Favourites from '../favourites/favourites.component';
import AccountDropdown from '../account-dropdown/account-dropdown.component';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { toggleSideNav } from '../../redux/side-nav/side-nav.actions'
import { selectToggleCarousel } from '../../redux/shop/shop.selectors';

import { signOutStart } from '../../redux/user/user.actions';
import { connect } from "react-redux";

import "../../assets/bici.png";
import "./header.styles.scss";

const Header = ({ currentUser, hidden, toggleCarousel, signOutStart, toggleSideNav }) => (
  <div>
    { toggleCarousel ?
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
      {
        currentUser ? 
        (
        <div className="option" onClick={signOutStart}>
          sign out
        </div>
      ) : (
        <Link className="option" to="/signin">
          sign in
        </Link>
      )}
      <Favourites className="option" />
    </div>
      <div onClick={toggleSideNav}>
          <AccountDropdown />
        </div>
    </div>
    : null
}
  
  </div>
);

// for multiple selectors createStructureSelector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  toggleCarousel: selectToggleCarousel
})

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart()),
  toggleSideNav: () => dispatch(toggleSideNav())
})
  


export default connect(mapStateToProps, mapDispatchToProps)(Header);
