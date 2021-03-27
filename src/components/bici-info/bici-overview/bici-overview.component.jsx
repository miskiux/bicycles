import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import {
  SpinnerContainer,
  SpinnerOverlay,
} from "../../with-spinner/with-spinner.styles";

import BiciItem from "../bici-item/bici-item.component";

import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { selectAll, selectBicycles } from "../../../redux/shop/shop.selectors";
import { toggleModal } from "../../../redux/side-nav/side-nav.actions";
import { deleteBicycleStart } from "../../../redux/shop/shop.actions";
import { hasBicycleDeleted } from "../../../redux/shop/shop.actions";
import { selectCurrent } from "../../../redux/update/update.actions";
import { selectCurrentBicycle } from "../../../redux/update/update.selectors";

import "./bici-overview.styles.scss";

//does not stay after refresh
const BiciInfo = ({
  userBicycles,
  currentId,
  deleteBicycleStart,
  hasBicycleDeleted,
  toggleModal,
  selectCurrent,
}) => {
  const [currentBicycle, setCurrentBicycle] = useState({});
  const [proceed, setProceed] = useState(false);
  const [listingId, setListingId] = useState("");
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
    if (userBicycles) {
      userBicycles.map((item, index) => {
        if (item.id === currentId) {
          console.log(item);
          setCurrentBicycle(item);
        }
      });
    }
  }, [userBicycles, currentId]);

  useEffect(() => {
    if (hasDeleted === true) {
      setTimeout(() => console.log("Hello, World!"), 1000);
      hasBicycleDeleted();
    }
  }, [hasDeleted]);

  const handleId = (id) => {
    setListingId(id);
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
      <div className="bicycle-page-selection">
        {userBicycles.map(({ id }) => (
          <div key={id} style={{ display: "inline-block" }}>
            {currentId === id ? (
              <FiberManualRecordIcon fontSize="small" />
            ) : (
              <FiberManualRecordOutlinedIcon
                fontSize="small"
                onClick={() => selectCurrent(id)}
              />
            )}
          </div>
        ))}
      </div>

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
  currentId: selectCurrentBicycle(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteBicycleStart: (payload) => dispatch(deleteBicycleStart(payload)),
  hasBicycleDeleted: () => dispatch(hasBicycleDeleted()),
  toggleModal: (payload) => dispatch(toggleModal(payload)),
  selectCurrent: (id) => dispatch(selectCurrent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BiciInfo);
