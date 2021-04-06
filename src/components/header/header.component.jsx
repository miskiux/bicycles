import React from "react";

import { Link } from "react-router-dom";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AccountDropdown from "../account-dropdown/account-dropdown.component";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectAccount } from "../../redux/side-nav/side-nav.selectors";
import { toggleAccount } from "../../redux/side-nav/side-nav.actions";
import { selectToggleCarousel } from "../../redux/shop/shop.selectors";

import { signOutStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

import "../../assets/bici.png";
import "./header.styles.scss";

const Header = ({
  currentUser,
  hidden,
  toggleCarousel,
  signOutStart,
  toggleAccount,
  selectAccount,
}) => {
  return (
    <>
      {toggleCarousel ? (
        <div class="header">
          <Link className="logo-container" to="/">
            <img
              className="logo"
              alt="logo"
              src={require("../../assets/bici.png")}
            />
          </Link>
          <div className="options">
            <Link className="option" to="/shop">
              shop
            </Link>
            <Link className="option" to="/sell">
              sell
            </Link>
            {!currentUser ? (
              <Link className="option" to="/signin">
                sign in
              </Link>
            ) : (
              <div className="account-option" onClick={toggleAccount}>
                <FiberManualRecordIcon
                  className="user-account-logo"
                  fontSize="large"
                />
                <span className="account-option-title">{`${currentUser.displayName}`}</span>
              </div>
            )}
          </div>
          {selectAccount && <AccountDropdown />}
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  toggleCarousel: selectToggleCarousel,
  selectAccount: selectAccount,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  toggleAccount: () => dispatch(toggleAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
