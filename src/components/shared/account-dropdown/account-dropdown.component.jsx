import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FavouriteDropdown from "../../favourites-dropdown/favourites-dropdown.component";
import BiciPreview from "../../bici-info/Bici-info-preview.component";
import { toggleAccount } from "../../../redux/side-nav/side-nav.actions";
import { signOutStart } from "../../../redux/User/user.actions";
import { Accordion, Icon } from "semantic-ui-react";
import "./account-dropdown.styles.scss";

//sidenavbar style changes at /

function AccountDropdown() {
  const [activeIndex, setActiveIndex] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const signOut = () => {
    dispatch(signOutStart());
    dispatch(toggleAccount());
    history.push("/");
  };

  return (
    <div className="account-dropdown">
      <Accordion className="accordion-wrapper">
        <Accordion.Title
          className="accordion-title"
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name="like" />
          Favourites
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <FavouriteDropdown />
        </Accordion.Content>

        <Accordion.Title
          className="accordion-title"
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          <Icon name="list" />
          Bicycle List
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <BiciPreview />
        </Accordion.Content>
        <Accordion.Title
          className="accordion-title-last"
          active={activeIndex === 2}
          index={2}
          onClick={signOut}
        >
          Sign Out
        </Accordion.Title>
      </Accordion>
    </div>
  );
}

export default AccountDropdown;
