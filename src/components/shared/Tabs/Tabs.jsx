import React from "react";
import styles from "./Tabs.module.scss";
import { useSpring, animated } from "react-spring";

export function Tabs(props) {
  const animationProps = useSpring({
    from: { left: "3px" },
    to: { left: props.selected ? `${props.selected * 120 + 6}px` : "3px" },
    config: { mass: 0.7, tension: 190 },
  });

  return (
    <div className={styles.wrapper}>
      {props.tabs.map((tab, i) => (
        <div
          key={i}
          className={styles.tab}
          onClick={() => props.handleChange(i)}
        >
          {tab}
        </div>
      ))}
      <animated.div style={animationProps} className={styles.indicator} />
    </div>
  );
}
