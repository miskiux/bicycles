import React from "react";
import { useHistory } from "react-router-dom";
import imageUrl from "../../assets/background.jpg";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./directory.styles.scss";

import { connect } from "react-redux";

import { selectDirectorySection } from "../../redux/directory/directory.selectors";

const Directory = ({ sections }) => {
  const history = useHistory();
  return (
    <div className="directory-menu">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="portal">
        <div className="table-head">Category</div>
        {sections.map(({ title, id, linkUrl }) => (
          <div
            key={id}
            className="table-item"
            onClick={() => history.push(`/${linkUrl}`)}
          >
            <span className="table-title">{title}</span>
            <ArrowForwardIosIcon fontSize="small" />
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sections: selectDirectorySection(state),
});

export default connect(mapStateToProps)(Directory);
