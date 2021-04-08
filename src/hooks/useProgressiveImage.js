import { useState, useEffect } from "react";
export const useProgressiveImage = (src) => {
  const [sourceLoaded, setSourceLoaded] = useState(null);
  const [didLoad, setLoad] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setSourceLoaded(src);
      setLoad(true);
    };
  }, [src]);

  return { sourceLoaded, didLoad };
};
