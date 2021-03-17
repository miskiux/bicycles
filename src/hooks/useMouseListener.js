import { useState, useEffect, useCallback } from "react";

export function useMouseListener(shouldTrack = true) {
  const [clip, setClip] = useState("");
  const clipIds = ["bottom", "frame", "handler", "saddle", "wheel"];

  const onMouseEnter = (label) => {
    setClip(label);
  };
  const onMouseLeave = useCallback(() => {
    setClip("");
  }, []);

  const addMouseListener = useCallback(() => {
    if (shouldTrack) {
      clipIds.map((item) => {
        document
          .getElementById(item)
          .addEventListener("mouseenter", () => onMouseEnter(item));
        document
          .getElementById(item)
          .addEventListener("mouseleave", onMouseLeave);
      });
    }
  }, []);

  const removeMouseListener = useCallback(() => {
    clipIds.map((item) => {
      document
        .getElementById(item)
        .removeEventListener("mouseenter", () => onMouseEnter(item));
      document
        .getElementById(item)
        .removeEventListener("mouseleave", onMouseLeave);
    });
  }, []);

  useEffect(() => {
    if (!shouldTrack) return;
    addMouseListener();

    return () => {
      removeMouseListener();
    };
  }, [shouldTrack, addMouseListener, removeMouseListener]);
  return { clip };
}
