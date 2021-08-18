import React, { useState } from "react";
import styles from "./image.module.scss";
import { useProgressiveImage } from "../../../hooks/useProgressiveImage";

import StyleUtils from "../../../utils/StyleUtil";

export function Image({ image, type }) {

  const [index, setIndex] = useState(0);

  const { sourceLoaded, didLoad } = useProgressiveImage(image.url[index]);

  return (
    <div
      className={StyleUtils.flatten([
        styles.placeholder,
        type === "s" && styles.sizeS,
      ])}
    >
      <img
        alt="thumb"
        src={image.preview[index].preview}
        className={StyleUtils.flatten([
          styles.image,
          styles.thumb,
          type === "s" && styles.sizeS,
        ])}
        style={{ visibility: didLoad ? "hidden" : "visible" }}
      />
      <div
        style={{ backgroundImage: `url(${sourceLoaded})` }}
        className={StyleUtils.flatten([
          styles.collectionImage,
          didLoad ? styles.loaded : styles.loading,
          type === "s" && styles.sizeS,
        ])}
      />
    </div>
  );
}
