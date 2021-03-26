import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  SpinnerContainer,
  SpinnerOverlay,
} from "../../with-spinner/with-spinner.styles";

import BiciItem from "../bici-item/bici-item.component";

import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { selectAll } from "../../../redux/shop/shop.selectors";
import { toggleModal } from "../../../redux/side-nav/side-nav.actions";
import { deleteBicycleStart } from "../../../redux/shop/shop.actions";
import { hasBicycleDeleted } from "../../../redux/shop/shop.actions";

import { useSelector } from "react-redux";

import { Button, Icon } from "semantic-ui-react";

import "./bici-overview.styles.scss";

const BiciInfo = ({
  currentBicycle,
  deleteBicycleStart,
  hasBicycleDeleted,
  toggleModal,
}) => {
  const [biciInfo, setBiciInfo] = useState({});
  const [proceed, setProceed] = useState(false);
  const [listingId, setListingId] = useState("");
  const [current, setCurrent] = useState(0);
  //hover
  const [hoverBiciInfo, setHoverBiciInfo] = useState({});
  const [inHover, setHover] = useState(false);
  //
  const [edit, setEdit] = useState(false);

  const [allImages, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deleteStatus = useSelector((state) => state.shop.isDeleting);
  const hasDeleted = useSelector((state) => state.shop.hasDeleted);

  useEffect(() => {
    if (hasDeleted === true) {
      setTimeout(() => console.log("Hello, World!"), 1000);
      hasBicycleDeleted();
    }
  }, [hasDeleted]);

  const handleId = (id) => {
    setListingId(id);
  };

  //navigation
  const next = () => {
    setCurrent(current + 1);
  };

  const previous = () => {
    setCurrent(current - 1);
  };

  //comparng current with userBicycles indices => onMouseOver
  const getNextBicycle = () => {
    // let next = userBicycles[current + 1];
    // setHoverBiciInfo(next);
  };

  const getPreviousBicycle = () => {
    // let next = userBicycles[current - 1];
    // setHoverBiciInfo(next);
  };

  const nextButton = () => {
    // if (userBicycles.length > current) {
    //   return (
    //     <Icon
    //       name="angle right"
    //       size={"large"}
    //       onClick={next}
    //       onMouseEnter={() => getNextBicycle()}
    //     />
    //   );
    // }
    // return null;
  };

  const previousButton = () => {
    if (current !== 0) {
      return (
        <Icon
          name="angle left"
          size={"large"}
          onClick={previous}
          onMouseEnter={() => getPreviousBicycle()}
        ></Icon>
      );
    }
    return null;
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  //shaking // when back dissapears, it leaves the previous text
  return (
    <div className="bicycle-page">
      <BiciItem
        currentBicycle={currentBicycle}
        edit={edit}
        toggleEdit={toggleEdit}
      />
      {/* {proceed === false || listingId !== biciInfo.id ? (
          <div className="bici-deletion">
            <Button
              className="bici-remove"
              onClick={() => {
                setProceed(!proceed);
                handleId(biciInfo.id);
              }}
            >
              {" "}
              remove{" "}
            </Button>
          </div>
        ) : deleteStatus ? (
          <SpinnerOverlay>
            <SpinnerContainer />
          </SpinnerOverlay>
        ) : (
          <div className="bici-deletion">
            <span> you sure, son ?</span>
            <div className="bici-deletion-selection">
              <Button
                className="bici-remove"
                onClick={() => deleteBicycleStart(biciInfo.id, biciInfo.imgKey)}
              >
                {" "}
                Yes{" "}
              </Button>
              <Button
                className="bici-remove"
                onClick={() => setProceed(!proceed)}
              >
                {" "}
                No{" "}
              </Button>
            </div>
          </div>
        )} */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  bicycles: selectAll(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteBicycleStart: (payload) => dispatch(deleteBicycleStart(payload)),
  hasBicycleDeleted: () => dispatch(hasBicycleDeleted()),
  toggleModal: (payload) => dispatch(toggleModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BiciInfo);
