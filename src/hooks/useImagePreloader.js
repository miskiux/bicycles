import { useEffect } from "react";

import { useDispatch } from "react-redux";

export function useImagePreloader(loading, images, action) {
  const dispatch = useDispatch();

  useEffect(() => {
    !loading && imagePreloader();
  }, [loading, JSON.stringify(images)]);

  const imagePreloader = () => {
    let loadedUrls = [];

    return Promise.all(
      images.map((image) => {
        let preloader = document.createElement("img");
        preloader.src = image;

        return new Promise((resolve, reject) => {
          preloader.addEventListener("load", (event) => {
            loadedUrls.push(event.path[0].currentSrc);
            preloader = null;
            resolve(event);
          });
        });
      })
    ).then(() => dispatch(action(loadedUrls)));
  };
}
