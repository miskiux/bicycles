import React from "react";
import styles from "./ItemsPreview.module.scss";
import { Image } from "src/components/Shared/Image/Image";
import { InputLabel } from "src/components/Shared/input-label/input-label.component";

export default function ItemsPreview({ bicycles }) {
  return (
    <div className={styles.container}>
      <h2>Bicycle posts</h2>
      <div className={styles.preview}>
        {bicycles.map(({ id, item }) => (
          <div className={styles.wrapper} key={id}>
            <Image image={{ url: item.url, preview: item.preview }} type="s" />
            <InputLabel
              label={
                <div className={styles.previewLabel}>
                  <span>{`${item.manufacturer} ${item.model}`}</span>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
