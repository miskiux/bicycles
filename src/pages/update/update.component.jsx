import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBicycles } from "../../redux/update/update.actions";
import { useLocation } from "react-router-dom";
import { getBlobStart } from "../../redux/update/update.actions";
import BiciInfo from "../../components/bici-info/bici-overview/bici-overview.component";

///later to filter out by state id which bicycle to show first
function UpdatePage() {
  const [currentBicycle, setCurrentBicycle] = useState([]);
  const { state } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    let current = state.userBicycles.filter(({ id }) => id === state.id);
    setCurrentBicycle(current[0]);
  }, []);

  return <BiciInfo currentBicycle={currentBicycle} />;
}

export default UpdatePage;
