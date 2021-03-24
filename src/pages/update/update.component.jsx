import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectAll } from "../../redux/shop/shop.selectors";

import BiciInfo from "../../components/bici-info/bici-component/bici-info.component";

function UpdatePage() {
  const { state } = useLocation();
  return <BiciInfo data={state} />;
}

export default UpdatePage;
