import React from "react";
import Directory from "../../components/directory/directory.component";
import "./homepage.styles.scss";

const Homepage = () => (
  <div className="homepage">
    <Directory />
    <span className="homepage-bottom">@bici</span>
  </div>
);

export default Homepage;
