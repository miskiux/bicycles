import { useState, useEffect } from "react";

import { storage } from "../firebase/firebase.utils";

import { useSelector, useDispatch } from "react-redux";

import { imageUploadSuccess } from "../redux/sell/sell.actions";
import { imagesUpdatingSuccess } from "../redux/update/update.actions";

export const useStorage = (image, imgKey) => {
  const [url, setUrl] = useState([]);

  const isLoading = useSelector((state) => state.sell.imagesLoading);
  const isUpdating = useSelector((state) => state.update.isImageUpdating);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading || isUpdating) {
      console.log(image);
      const urlarray = [];
      Promise.all(
        image.map((image) => {
          return new Promise((resolve, reject) => {
            const uploadTask = storage
              .ref(`/images/${imgKey}/${image.name}`)
              .put(image);
            //getting the image url
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
              },
              (error) => {
                console.log(error);
              },
              () => {
                storage
                  .ref(`/images/${imgKey}`)
                  .child(image.name)
                  .getDownloadURL()
                  .then((imgUrl) => {
                    imgUrl.split(",");
                    urlarray.push(imgUrl);
                    setUrl(urlarray);
                    resolve(urlarray);
                  });
              }
            );
          });
        })
      ).then(() => {
        if (isLoading) {
          dispatch(imageUploadSuccess());
        } else {
          dispatch(imagesUpdatingSuccess());
        }
      });
    }
  }, [isLoading, isUpdating]);
  return { url };
};
