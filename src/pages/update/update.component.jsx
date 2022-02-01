import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { selectAll } from "../../redux/Shop/Shop.selectors";
import { selectCurrentUser } from "../../redux/User/user.selectors";
import BiciInfo from "../../components/bici-info/bici-overview/bici-overview.component";

function UpdatePage({ bicycles, user }) {
  const [userBicycles, setUserBicycles] = useState([]);

  useEffect(() => {
    if (user) {
      let userBicycles = bicycles.filter(
        (bicycle) => bicycle.userId === user.id
      );
      setUserBicycles(userBicycles);
    }
  }, [user, bicycles]);
  return <BiciInfo userBicycles={userBicycles} />;
}

const mapStateToProps = (state) => ({
  bicycles: selectAll(state),
  user: selectCurrentUser(state),
});

export default connect(mapStateToProps)(UpdatePage);
