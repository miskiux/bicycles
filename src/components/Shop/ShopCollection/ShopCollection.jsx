import React from "react";
import styles from "./ShopCollection.module.scss";
import { useSelector } from "react-redux";
import { ShopItem } from "../ShopItem/ShopItem";
import {
  SpinnerContainer,
  SpinnerOverlay,
} from "src/components/with-spinner/with-spinner.styles";
import { Hidable } from "src/components/Shared/Hidable/Hidable";

export function ShopCollection() {
  const imagesLoading = useSelector((state) => state.shop.imageLoading);
  const loading = useSelector((state) => state.shop.loading);
  const loadedUrls = useSelector((state) => state.shop.loadedUrls);
  const collectionList = useSelector((state) => state.shop.aggregatedList);

  return (
    <div className={styles.grid}>
      {collectionList.map(({ id, item }) => (
        <Hidable key={id} isVisible={loadedUrls.includes(item.url[0])}>
          <ShopItem id={id} item={item} />
        </Hidable>
      ))}
      {loading ||
        (imagesLoading && (
          <SpinnerOverlay>
            <SpinnerContainer />
          </SpinnerOverlay>
        ))}
    </div>
  );
}
