import React, { useState } from "react";
import FavouriteDropdown from "../favourites-dropdown/favourites-dropdown.component";
import BiciPreview from "../bici-info/Bici-info-preview.component";
import { toggleModal } from "../../redux/side-nav/side-nav.actions";
import { Dropdown } from "semantic-ui-react";
import { Accordion, Icon } from "semantic-ui-react";
import "./account-dropdown.styles.scss";

//sidenavbar style changes at /

function AccountDropdown() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
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
          onClick={handleClick}
        >
          Sign Out
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            Three common ways for a prospective owner to acquire a dog is from
            pet shops, private owners, or shelters.
          </p>
          <p>
            A pet shop may be the most convenient way to buy a dog. Buying a dog
            from a private owner allows you to assess the pedigree and
            upbringing of your dog before choosing to take it home. Lastly,
            finding your dog from a shelter, helps give a good home to a dog who
            may not find one so readily.
          </p>
        </Accordion.Content>
      </Accordion>
    </div>
  );
}

export default AccountDropdown;
