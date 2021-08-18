import React from "react";
import { Card } from "../shared/card/card.component";
import styles from "./items-preview.module.scss";
import { Image } from "../shared/image/image.component";
import { InputLabel } from "../shared/input-label/input-label.component";

export default function ItemsPreview({ bicycles }) {
  return (
    <Card header="Bicycle posts">
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
    </Card>
  );
}
