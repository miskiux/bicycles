import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import { Dimmer } from "semantic-ui-react";
import BiciItem from "../bici-item/bici-item.component";
import {
  CustomSpinnerOverlay,
  SpinnerContainer,
} from "../../with-spinner/with-spinner.styles";

import { selectCurrentUser } from "../../../redux/user/user.selectors";
import {
  selectAll,
  selectRedirect,
  selectIsBicyclesFetching,
} from "../../../redux/shop/shop.selectors";
import { toggleModal } from "../../../redux/side-nav/side-nav.actions";
import { getRedirectDefault } from "../../../redux/shop/shop.actions";
import { selectCurrent } from "../../../redux/update/update.actions";
import { selectCurrentBicycle } from "../../../redux/update/update.selectors";
import "./bici-overview.styles.scss";

//does not stay after refresh
const BiciInfo = ({
  userBicycles,
  currentId,
  toggleModal,
  selectCurrent,
  redirect,
  getRedirectDefault,
  isFetching,
}) => {
  const [currentBicycle, setCurrentBicycle] = useState({});

  //hover
  const [hoverBiciInfo, setHoverBiciInfo] = useState({});
  const [inHover, setHover] = useState(false);
  //
  const [edit, setEdit] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (userBicycles) {
      userBicycles.map((item, index) => {
        if (item.id === currentId) {
          setCurrentBicycle(item);
        }
      });
    }
  }, [userBicycles, currentId]);

  useEffect(() => {
    if (userBicycles.length >= 1) {
      const idList = userBicycles.map(({ id }) => id);
      const existingId = userBicycles.some(({ id }) => id.includes(currentId));
      if (!existingId) {
        selectCurrent(idList[0]);
        getRedirectDefault();
      }
    } else if (userBicycles.length === 0 && redirect) {
      getRedirectDefault();
      history.push("/shop");
    }
  }, [userBicycles, currentId, redirect]);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className="bicycle-page-container">
      <Dimmer active={isFetching} page>
        <CustomSpinnerOverlay index={"front"}>
          <SpinnerContainer size={"small"} />
        </CustomSpinnerOverlay>
      </Dimmer>
      <div className="bicycle-page">
        <BiciItem
          currentBicycle={currentBicycle}
          userBicycles={userBicycles}
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
                  onClick={() => {
                    selectCurrent(id);
                    setEdit(false);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  bicycles: selectAll(state),
  currentId: selectCurrentBicycle(state),
  redirect: selectRedirect(state),
  isFetching: selectIsBicyclesFetching(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleModal: (payload) => dispatch(toggleModal(payload)),
  selectCurrent: (id) => dispatch(selectCurrent(id)),
  getRedirectDefault: () => dispatch(getRedirectDefault()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BiciInfo);
