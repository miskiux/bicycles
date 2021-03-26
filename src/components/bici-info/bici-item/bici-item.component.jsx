import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useStorage } from "../../../hooks/useStorage";
import FormUpdate from "../form-update/form-update.component";
import ImageUpdate from "../images-update/Image-update.component";
import { imageUrlUpdateStart } from "../../../redux/update/update.actions";

import "./bici-item.styles.scss";

// add id, preview
// useStorage
// overwrite imgKey and url

// how to upload newOnes: 1.get the imgKey => useStorage =>
//set new url (containing old ones)

// how to keep oldOnes:

// how to delete oldOnes:
//retrieve images and check whether two arrays match, then filter

// how to store a combination of old and new:

// 1.Adding new files = onSubmit => useStorage only files| update url, update storage
// 2. Deleting an existing image

// removing old ones

function BiciItem({ currentBicycle, edit, toggleEdit }) {
  const [show, setShow] = useState(false);
  const [allImages, setAllImages] = useState([]);

  const dispatch = useDispatch();

  const isUrlUpdating = useSelector((state) => state.update.isUrlUpdating);

  const { item, createdAt, imgKey, id } = currentBicycle;

  const imageFiles = allImages && allImages.filter((i) => i instanceof File);
  const fileIds = imageFiles && imageFiles.map(({ id }) => id);

  const oldArr =
    fileIds &&
    allImages
      .filter(({ id }) => !fileIds.includes(id))
      .map(({ preview }) => preview);

  const { url } = useStorage(imageFiles, imgKey);

  const uploadImages = (images) => {
    setAllImages([...allImages, ...images]);
  };

  useEffect(() => {
    if (item) {
      const attachId = item.url.map((img) =>
        Object.assign(
          {},
          {
            id: uuidv4(),
            preview: img,
          }
        )
      );
      setAllImages(attachId);
    }
  }, [item]);

  useEffect(() => {
    if (url && isUrlUpdating) {
      const imageArr = [...oldArr, ...url];
      console.log(imageArr);
      dispatch(imageUrlUpdateStart({ id, url: imageArr }));
    }
  }, [url, isUrlUpdating]);

  return (
    <>
      {item && (
        <div className="upload-item">
          {show && (
            <ImageUpdate allImages={allImages} uploadImages={uploadImages} />
          )}
          <div className="upload-item-image">
            <div className="upload-date">
              <span>Posted on </span>
              <span style={{ fontSize: "10px" }}>
                {createdAt.substr(0, createdAt.indexOf("T"))}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img
                alt="upload-edit"
                className="main-upload-image"
                src={item.url[0]}
              />
              <span
                style={{ textAlign: "center", padding: "10px" }}
                className="edit-images"
                onClick={() => setShow(true)}
              >
                Edit
              </span>
            </div>
          </div>
          <div className="update-bicycle-form-container">
            <div className="update-bicycle-title">
              <h3>Update bicycle</h3>
              {edit ? (
                <div className="update-options">
                  <span className="bici-update-text" onClick={toggleEdit}>
                    {" "}
                    CANCEL{" "}
                  </span>
                  <button
                    type="submit"
                    form="hook-form"
                    className="bici-update-text"
                  >
                    {" "}
                    SAVE{" "}
                  </button>
                </div>
              ) : (
                <span className="bici-update-text" onClick={toggleEdit}>
                  {" "}
                  CHANGE{" "}
                </span>
              )}
            </div>
            <FormUpdate
              inputData={currentBicycle}
              edit={edit}
              toggleEdit={toggleEdit}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default BiciItem;
