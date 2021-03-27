import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useStorage } from "../../../hooks/useStorage";
import FormUpdate from "../form-update/form-update.component";
import ImageUpdate from "../images-update/Image-update.component";
import { imageUrlUpdateStart } from "../../../redux/update/update.actions";

import "./bici-item.styles.scss";

function BiciItem({ currentBicycle, edit, toggleEdit }) {
  const [show, setShow] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [deleteArr, setDeleteArr] = useState([]);
  const [toRemove, setToRemove] = useState(false);

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

  //get the diff to delete the i in storage

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
    if (item && allImages) {
      const imageSource = item.url;
      const allUrls = allImages.map(({ preview }) => preview);
      const diff = imageSource.filter((x) => !allUrls.includes(x));
      setDeleteArr(diff);
      if (diff.length) {
        setToRemove(true);
      } else {
        setToRemove(false);
      }
    }
  }, [item, allImages]);

  useEffect(() => {
    const imageArr = [...oldArr, ...url];
    if (isUrlUpdating && !imageFiles.length) {
      console.log("1 at biciItem");
      dispatch(imageUrlUpdateStart({ id, url: imageArr }));
    } else if (isUrlUpdating && url.length) {
      console.log("2 at biciItem");
      dispatch(imageUrlUpdateStart({ id, url: imageArr }));
    }
  }, [isUrlUpdating, url, imageFiles]);

  const closeEdit = () => {
    setShow((i) => !i);
  };
  const populateImages = (images) => {
    setAllImages([...allImages, ...images]);
  };

  const removeFile = (idx) => {
    const values = allImages.filter((item) => item.id !== idx);
    setAllImages(values);
  };

  const setImageOrder = (order) => {
    setAllImages(order);
  };
  return (
    <>
      {item && (
        <div className="upload-item">
          {show && (
            <ImageUpdate
              allImages={allImages}
              populateImages={populateImages}
              removeFile={removeFile}
              url={deleteArr}
              imgKey={imgKey}
              toRemove={toRemove}
              closeEdit={closeEdit}
              setImageOrder={setImageOrder}
            />
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
              <h3 style={{ fontWeight: "normal", margin: 0, padding: "10px" }}>
                Update bicycle
              </h3>
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
