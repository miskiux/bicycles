import React from "react";
import styles from "./loadableV2.module.scss";
import { useSpring, animated } from "react-spring";

export function LoadableV2({ isLoading, onFinish }) {
  const blinkAnimation = useSpring({
    loop: !isLoading && true,
    to: [isLoading ? { opacity: 1 } : { opacity: 0 }, { opacity: 1 }],
    from: { opacity: 1 },
    config: { duration: 350 },
  });

  const widthAnimation = useSpring({
    from: { width: "30px" },
    to: { width: isLoading ? "250px" : "30px" },
    config: { duration: 150 },
    onRest: () =>
      setTimeout(() => {
        onFinish();
      }, 450),
  });

  return (
    <animated.div
      className={styles.loadable}
      style={{
        ...widthAnimation,
        ...blinkAnimation,
      }}
    />
  );
}
