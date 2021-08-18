import React from "react";
import { useSelector } from "react-redux";
import Directory from "../../components/directory/directory.component";
import ItemsPreview from "../../components/items-preview/items-preview";
import "./homepage.styles.scss";

const Homepage = () => {
  const bicycles = useSelector((state) => state.shop.bicycles);

  return (
    <div className="homepage">
      <Directory />
      <ItemsPreview bicycles={bicycles} />
      <iframe
        title="iframe"
        id="iframe"
        frameborder="0"
        allow-downloads
        style={{ width: "100%", minHeight: "620px", height: "100%" }}
        src="https://develop-ssp.alaiko.com/samedomain/return-labels"
      ></iframe>
      <span className="homepage-bottom">@bici</span>
    </div>
  );
};

export default Homepage;
