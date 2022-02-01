import React, { useState } from "react";

import styles from "./HorizontalTabs.module.scss";
import { Icon } from "semantic-ui-react";
import StyleUtils from "src/utils/StyleUtils";

export default function HorizontalTabs(props) {
  const [activeIndex, setActiveIndex] = useState(1);

  const { tabs, icon, onClick, active } = props;

  const handleClick = (id) => () => {
    if (active) {
      setActiveIndex(id);
    }

    onClick && onClick(id);
  };

  return (
    <div className={styles.tabContainer}>
      {tabs.map(({ title, id, iconName }) => (
        <div key={id} className={styles.tab} onClick={handleClick(id)}>
          <div
            className={StyleUtils.flatten([
              styles.box,
              activeIndex === id && styles.active,
            ])}
          >
            {id}
          </div>
          <div>
            {iconName && <Icon name={iconName} size="large" />}
            <span>{title}</span>
          </div>
          {icon}
        </div>
      ))}
    </div>
  );
}
