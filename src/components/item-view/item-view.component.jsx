import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import { useParams } from "react-router-dom";

import Item from "../item/item.component";

import { selectAll } from "../../redux/shop/shop.selectors";

const ItemView = ({ bicycles }) => {
  const [item, setItem] = useState([]);

  const { bicycleId } = useParams();

  useEffect(() => {
    let itemview = bicycles.filter((bicycle) => bicycle.id === bicycleId);
    setItem(itemview);
  }, [bicycleId, bicycles]);

  return (
    <>
      {item.map(({ id, ...otherProps }) => (
        <Item key={id} {...otherProps} />
      ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  bicycles: selectAll(state),
});

export default connect(mapStateToProps, null)(ItemView);
