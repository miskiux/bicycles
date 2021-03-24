import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { selectAll } from "../../redux/shop/shop.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import "./Bici-info-preview.styles.scss";

function BiciPreview({ bicycles, user }) {
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

  const redirectToUpdate = (id) => {
    history.push({
      pathname: "/update",
      state: { userBicycles: userBicycles, id: id },
    });
  };

  return (
    <div className="bici-info-preview-list">
      <div className="preview-list-labels">
        <span>manufacturer</span>
        <span>model</span>
        <span>date</span>
      </div>

      {userBicycles.map(({ item, id, createdAt }) => (
        <div
          key={id}
          className="bici-info-title"
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
  );
}

const mapStateToProps = (state) => ({
  bicycles: selectAll(state),
  user: selectCurrentUser(state),
});

export default connect(mapStateToProps)(BiciPreview);
