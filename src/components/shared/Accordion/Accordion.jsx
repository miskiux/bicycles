import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "src/hooks/useMeasure";
import styles from "./Accordion.module.scss";

export function Accordion(props) {
  const defaultHeight = "0px";

  const [contentHeight, setContentHeight] = useState(defaultHeight);

  const [bind, { height }] = useMeasure();

  const expand = useSpring({
    height: props.open ? `${contentHeight}px` : defaultHeight,
  });

  useEffect(() => {
    setContentHeight(height);

    window.addEventListener("resize", setContentHeight(height));

    return window.removeEventListener("resize", setContentHeight(height));
  }, [height]);

  return (
    <div className={styles.wrapper}>
      <animated.div className={styles.accordion} style={expand}>
        <div {...bind} className={styles.content}>
          <ul>
            {props.list.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      </animated.div>
    </div>
  );
}
