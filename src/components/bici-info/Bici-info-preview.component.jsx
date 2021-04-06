import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { selectAll } from "../../redux/shop/shop.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCurrent } from "../../redux/update/update.actions";
import "./Bici-info-preview.styles.scss";
import { toggleAccount } from "../../redux/side-nav/side-nav.actions";

function BiciPreview({ bicycles, user, toggleAccount }) {
  const [userBicycles, setUserBicycles] = useState([]);

  useEffect(() => {
    if (user) {
      let userBicycles = bicycles.filter(
        (bicycle) => bicycle.userId === user.id
      );
      setUserBicycles(userBicycles);
    }
  }, [user, bicycles]);

  const history = useHistory();
  const dispatch = useDispatch();

  const redirectToUpdate = (id) => {
    history.push({
      pathname: "/update",
    });
    dispatch(selectCurrent(id));
    toggleAccount();
  };

  return (
    <div className="bici-info-preview-list">
      <div className="bici-info-label-container">
        <span>manufacturer</span>
        <span>model</span>
        <span>date</span>
      </div>

      <div className="bici-info-overview">
        {userBicycles.map(({ item, id, createdAt }) => (
          <div
            key={id}
            className="bici-info-item"
            onClick={() => redirectToUpdate(id)}
          >
            <span className="bici-info-name">{item.manufacturer}</span>
            <span className="bici-info-name">{item.model}</span>
            <span className="bici-info-date">
              {createdAt.substr(0, createdAt.indexOf("T"))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  bicycles: selectAll(state),
  user: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleAccount: () => dispatch(toggleAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BiciPreview);
